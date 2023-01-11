<template>
    <header>
        <div></div>
        {{ uiLabels.draw }}
        {{ word.toUpperCase() }}
    </header>
    <div id="timer">
        {{ uiLabels.timeLeft }} {{ timer }}
    </div>
    <div id="canvasWrapper">
    <canvas id="myCanvas" ref="myCanvas" width="360" height="460" @mousemove="draw" @mouseup="endDraw"
        @mousedown="startDraw" @mouseout="endDraw" @touchstart="startDraw" @touchmove="draw" @touchend="endDraw">
    </canvas>
</div>
    <div id="drawArea">
        <div class="drawSettingsField">
            <div class="icon" ref="pen" @mouseover="penHover = true, pickPenSize()"
                @mouseleave="penHover = false, pickPenSize()">
                <img src="../../public/img/pen.svg" alt="pen">
            </div>

            <div class="icon" ref="palette" @mouseover="hover = true, pickColor()"
                @mouseleave="hover = false, pickColor()">
                <img ref="paletteImg" src="../../public/img/palette.svg" alt="eraser">
            </div>

            <div class="icon"><img src="../../public/img/eraser.png" alt="eraser" v-on:click="setEraser('white')">
            </div>

            <div class="icon"><img src="../../public/img/garbage.svg" alt="garbage" v-on:click="clearCanvas()">
            </div>
        </div>
        <div id="sizeDots" @mouseover="hover = true, pickColor()" @mouseleave="hover = false, pickColor()">
            <div id="xsmallDot" v-on:click="setColor('white')"></div>
            <div id="smallDot" v-on:click="setColor('black')"></div>
            <div id="mediumDot" v-on:click="setColor('rgb(87, 138, 182)')"></div>
            <div id="largeDot" v-on:click="setColor('rgb(199, 239, 138)')"></div>
            <div id="xlargeDot" v-on:click="setColor('rgb(183, 6, 6)')"></div>
            <div id="xxlargeDot" v-on:click="setColor('rgb(255, 251, 132)')"></div>
            <div id="xxxlargeDot" v-on:click="setColor('rgb(109, 68, 29)')"></div>
        </div>
        <div id="penSize" @mouseover="penHover = true, pickPenSize()" @mouseleave="penHover = false, pickPenSize()">
            <input type="range" min="1" max="50" v-model="lineSize" class="slider" v-on:mouseleave="setSize(lineSize)">
        </div>


    </div>
</template>

  
<script>

//import router from '@/router';
export default {
    name: "drawComp",
    props: ['timer', 'word', 'uiLabels', 'gameSocket', 'gameID', 'choosenEmoji'],
    data() {
        return {
            canvas: null,
            x: 0,
            y: 0,
            isDrawing: false,
            CoordsList: [],
            lineSize: 10,
            color: "black",
            timerCount: 60,
            hover: false,
            penHover: false,
            previousColor: "black",
            shadowColorL: '#333',
            shadowBlur: this.lineSize / 4,
            topY: 0
        };
    },
    methods: {
        startDraw: function (event) {
            this.closePenAndColor;
            event.preventDefault();

            let mousePos = this.getDrawCoords(event);
            this.x = mousePos.x;
            this.y = mousePos.y;
            this.isDrawing = true;
        },
        drawLine(x1, y1, x2, y2) {
            this.canvas.lineCap = "round";
            this.canvas.beginPath();
            this.canvas.strokeStyle = this.color;
            this.canvas.lineWidth = this.lineSize;
            this.canvas.moveTo(x1, y1);
            this.canvas.lineTo(x2, y2);
            this.canvas.stroke();
            this.canvas.closePath();
        },
        draw: function (event) {
            event.preventDefault();

            if (this.isDrawing) {
                let mousePos = this.getDrawCoords(event);
                this.drawLine(this.x, this.y, mousePos.x, mousePos.y);
                this.emitFunc(this.x, this.y, mousePos.x, mousePos.y);
                this.x = mousePos.x;
                this.y = mousePos.y;
            }
        },

        endDraw: function (event) {
            event.preventDefault();
            if (this.isDrawing) {
                let clientX = event.clientX || event.changedTouches[event.changedTouches.length - 1].clientX;
                let clientY = event.clientY || event.changedTouches[event.changedTouches.length - 1].clientY;
                let offset = this.$refs.myCanvas.getBoundingClientRect();

                let canvasX = clientX - offset.left;
                let canvasY = clientY - offset.top;

                this.drawLine(this.x, this.y, canvasX, canvasY);
                this.emitFunc(this.x, this.y, canvasX, canvasY);
            }
            this.isDrawing = false;
        },

        getDrawCoords: function (event) {

            let clientX = event.clientX || event.touches[0].clientX;
            let clientY = event.clientY || event.touches[0].clientY;
            let offset = this.$refs.myCanvas.getBoundingClientRect();

            let canvasX = clientX - offset.left;
            let canvasY = clientY - offset.top;

            return { x: canvasX, y: canvasY };
        },


        emitFunc(x1, y1, x2, y2) {
            let Coords = [x1, y1, x2, y2]
            this.CoordsList.push(Coords)
            this.gameSocket.emit("drawCoords", Coords, this.gameID);
        },
        setSize(size) {
            this.lineSize = size;
            this.gameSocket.emit("drawSize", this.lineSize, this.gameID)
        },
        setColor(color) {
            let palette = this.$refs.palette;
            palette.style.backgroundColor = color;
            this.color = color
            this.previousColor = this.color
            this.gameSocket.emit("drawColor", this.color, this.gameID);
        },
        setEraser(color) {
            this.previousColor = this.color;
            console.log(this.previousColor)
            this.color = color;
            this.gameSocket.emit("drawColor", this.color, this.gameID);
        },
        clearCanvas() {

            let canv = document.getElementById("myCanvas");
            this.canvas.clearRect(0, 0, canv.width, canv.height);
            this.gameSocket.emit("sendClearDrawing", this.gameID);
        },

        pickPenSize() {
            let penDiv = document.getElementById('penSize')
            let penCoords = this.$refs.pen.getBoundingClientRect();
            this.color = this.previousColor;
            this.gameSocket.emit("drawColor", this.color);
            if (this.penHover) {
                penDiv.style.transform = "scaleY(1)";
                penDiv.style.left = penCoords.x - 104 + "px";
                penDiv.style.top = penCoords.y - 82 + "px";
            } else {
                setTimeout(() => {
                    if (!this.penHover) {
                        penDiv.style.transform = "scaleY(0)";
                    }
                },
                    100)
            }
        },

        closePenAndColor() {
            let penDiv = document.getElementById('penSize')
            penDiv.style.transform = "scaleY(0)";

            let div = document.getElementById('sizeDots');
            div.style.transform = "scaleY(0)";
        },

        pickColor() {
            let div = document.getElementById('sizeDots');
            let paletteCoords = this.$refs.palette.getBoundingClientRect();
            //let canvasCoords = this.$refs.myCanvas.getBoundingClientRect();
            if (this.hover) {
                console.log("Hejsan");
                div.style.transform = "scaleY(1)";
                div.style.left = paletteCoords.x + "px";
                div.style.top = paletteCoords.y - 184 + "px";
            } else {
                setTimeout(() => {
                    if (!this.hover) {
                        div.style.transform = "scaleY(0)";
                    }
                },
                    100)
            }
        },
        cursor(x, y) {

            let cursor = document.getElementById('drawCursor');

            cursor.style.left = x + "px";
            cursor.style.top = y + "px";
        },
        onScroll: function (event) {
            this.topY = event.target.documentElement.scrollTop;
            console.log("SCROLL Y: " + this.topY);
        }
    },
    mounted() {
        window.addEventListener("scroll", this.onScroll);
        var c = this.$refs.myCanvas;
        this.canvas = c.getContext('2d');
    },
    created (){
        this.gameSocket.on("reciveEmoji", (playerEmoji, x, y) => {
            console.log('PlayerEMOJI ' + playerEmoji)
            var emoji = document.createElement("div");
                emoji.innerText = playerEmoji;
                emoji.style.fontSize = "45px"
                emoji.style.position = 'absolute';
                emoji.style.left = x + 'px';
                emoji.style.top = y + 'px';
                emoji.style.userSelect = 'none';
                document.getElementById("canvasWrapper").appendChild(emoji);
                setTimeout(function() {
                document.getElementById("canvasWrapper").removeChild(emoji);
            }, 2000);
        },)
    },
};
</script>


  
<style scoped>

#drawCursor {
    position: absolute;
    user-select: none;
}

#drawCursor img {
    user-select: none;
    width: 15px;
    height: 15px;
}

#canvasWrapper{
    margin: auto;
    width: 368px;
    height: 468px;
    overflow: hidden;
    position: relative;
}

#myCanvas {
    border-width: 4px;
    border-style: solid;
    border-image: linear-gradient(to right, #5B893F, #32C7D1) 1;
    background-color: white;
    border-bottom: none;
}

#xsmallDot {
    background-color: white;
}

#smallDot {
    background-color: black;
}

#mediumDot {
    background-color: rgb(87, 138, 182);
}

#largeDot {

    background-color: rgb(199, 239, 138);
}

#xlargeDot {

    background-color: rgb(183, 6, 6);
}

#xxlargeDot {

    background-color: rgb(255, 251, 132);
}

#xxxlargeDot {

    background-color: rgb(109, 68, 29);
}

#penSize {
    position: absolute;
    transform: scaleY(0);
    transform-origin: bottom;
    width: 250px;
    height: 42px;
    transition: transform 0.26s ease;
}

#penSize input {
    touch-action: "none";
}

#sizeDots {
    width: 42px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.473);
    border-radius: 10px;
    flex-direction: column-reverse;
    display: flex;
    justify-content: space-around;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.26s ease;
    height: 250px;
}

#sizeDots div {
    align-self: center;
    border-radius: 30px;
    width: 25px;
    height: 25px;
    cursor: pointer;
}


#drawArea {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
}

.drawSettingsField {
    background-image: linear-gradient(to right, #5B893F, #32C7D1);
    background-color: #000000;
    width: 368px;
    display: flex;
    justify-content: space-around;
    height: fit-content;
    margin-bottom: 1em;
    margin-top: -3px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}

#timer {
    margin-top: 0.3em;
    margin-bottom: 0.3em;
    font-size: 2em;
    font-weight: 600;
    color: white;
}

.icon {
    cursor: pointer;
    background-color: #000000;
    width: 40px;
    height: 40px;
    border-radius: 100%;


}

.icon img {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
}

#colorDot {
    margin-left: auto;
    margin-right: auto;
    border-radius: 100%;
    width: 37px;
    height: 37px;
    background-color: black;
    border: 2px white solid;
}

.slider {
    -webkit-appearance: none;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.473);
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    transform: rotate(270deg);
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #000000;
    cursor: pointer;
}

/*.slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #04AA6D;
    cursor: pointer;
}*/

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (max-width: 800px) {
    header {
        font-size: 3em;
    }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (max-width: 600px) {
    header {
        font-size: 2em;
    }
}

@media only screen and (max-width: 996px) {}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {}
</style>
