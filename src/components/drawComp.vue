<template>
    <header>
        <div></div>
        {{ uiLabels.draw }}

        {{ word }}
    </header>
    <div id="timer">
        {{ uiLabels.timeLeft }} {{ timer }}
    </div>
    <div id="drawArea">
        <canvas id="myCanvas" width="360" height="460" @mousemove="draw" @mousedown="beginDrawing"
            @mouseup="stopDrawing" @mouseleave="stopDrawing"> </canvas>
        
            <div id="buttons1" class="drawSettingsField">
                <div class="icon"><img src="../../public/img/eraser.png" alt="eraser" v-on:click="setEraser('white')">
                </div>

                <div class="icon" ref="pen" @mouseover="penHover = true, pickPenSize()"
                    @mouseleave="penHover = false, pickPenSize()">
                    <img src="../../public/img/pen.svg" alt="pen">
                </div>

                <div id="penSize" @mouseover="penHover = true, pickPenSize()"
                    @mouseleave="penHover = false, pickPenSize()">
                    <input orient="vertical" type="range" min="1" max="50" v-model="lineSize" class="slider"
                        v-on:mouseleave="setSize(lineSize)">
                </div>
            </div>

            <div id="buttons2" class="drawSettingsField">
                <div class="icon"><img src="../../public/img/garbage.svg" alt="garbage" v-on:click="clearCanvas()">
                </div>

                <div class="icon" ref="palette" @mouseover="hover = true, pickColor()"
                    @mouseleave="hover = false, pickColor()">
                    <img ref="paletteImg" src="../../public/img/palette.svg" alt="eraser">
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
            </div> 


    </div>
</template>

  
<script>

//import router from '@/router';
export default {
    name: "drawComp",
    props: ['timer', 'word', 'uiLabels', 'gameSocket', 'gameID'],
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
            previousColor: "black"
        };
    },
    methods: {
        drawCoords: function () {
            for (let index = 0; index < this.CoordsList.length; index++) {
                this.drawLine(this.CoordsList[index][0], this.CoordsList[index][1], this.CoordsList[index][2], this.CoordsList[index][3])
            }
        },
        drawLine(x1, y1, x2, y2) {
            let ctx = this.canvas;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.lineSize;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.closePath();
        },
        beginDrawing(e) {
            this.x = e.offsetX;
            this.y = e.offsetY;
            this.isDrawing = true;
        },
        stopDrawing(e) {
            if (this.isDrawing === true) {
                this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
                this.emitFunc(this.x, this.y, e.offsetX, e.offsetY);
                this.x = 0;
                this.y = 0;
                this.isDrawing = false;
            }
        },
        draw(e) {
            //this.cursor(e.clientX, e.clientY);
            if (this.isDrawing === true) {
                this.emitFunc(this.x, this.y, e.offsetX, e.offsetY);
                this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
                this.x = e.offsetX;
                this.y = e.offsetY;

            }
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
            let palette = this.$refs.paletteImg;
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
            this.color = this.previousColor;
            this.gameSocket.emit("drawColor", this.color);
            if (this.penHover) {
                penDiv.style.transform = "scaleY(1)";
            } else {
                setTimeout(() => {
                    if (!this.penHover) {
                        penDiv.style.transform = "scaleY(0)";
                    }
                },
                    100)
            }
        },

        pickColor() {
            let div = document.getElementById('sizeDots');
            if (this.hover) {
                console.log("Hejsan");
                div.style.transform = "scaleY(1)";
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
        }
    },
    mounted() {
        var c = document.getElementById("myCanvas");
        this.canvas = c.getContext('2d');
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

#buttons1 {
    order: 0;
}

#buttons2 {
    order: 2;
}

#myCanvas {
    border: 2px solid black;
    background-color: white;
    order: 1;
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
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.26s ease;
    width: 285px;
    margin-left: -119px;
    margin-bottom: 2.5em;
}

#penSize div {
    margin: 0.5em;
    align-self: center;
}

#sizeDots {
    background-color: rgba(0, 0, 0, 0.473);
    border-radius: 10px;
    flex-direction: column-reverse;
    display: flex;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.26s ease;
}

#sizeDots div {
    margin: 0.5em;
    align-self: center;
}



#xsmallDot,
#smallDot,
#mediumDot,
#largeDot,
#xlargeDot,
#xxlargeDot,
#xxxlargeDot {
    border-radius: 30px;
    width: 25px;
    height: 25px;
}

#xsmallDot:hover,
#smallDot:hover,
#mediumDot:hover,
#largeDot:hover,
#xlargeDot:hover,
#xxlargeDo:hover,
#xxxlargeDo:hover {
    cursor: pointer;
}

#drawArea {
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
    display: flex;
    flex-direction: row;
}

.drawSettingsField {
    margin: 1em;
    width: 50px;
    display: flex;
    flex-direction: column-reverse;
    gap: 15px;

}

#removeDiv {
    margin-bottom: 12px;
}

#removeDiv img {
    margin-left: auto;
    margin-right: auto;
    width: 40px;
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
}

.icon img {
    margin-left: auto;
    margin-right: auto;
    width: 40px;
    background-color: #000000;
    border-radius: 100%;
    border: solid black;
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
    height: 18%;
    border-radius: 5px;
    background: #ffffff;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    transform: rotate(270deg);
    margin-bottom: 30%;
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
@media only screen and (max-width: 675px) {
    header {
        font-size: 2em;
    }

}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (max-width: 549px) {

 #myCanvas {
    position: absolute;
    z-index: 1;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    order: 0;
} 

#buttons1{
    position: absolute;
    z-index: 2;
    left: 0;
    order: 1;
    margin-top: auto;
    margin-bottom: auto;
    top: 260px;
}

#buttons2{
    position: absolute;
    right: 0;
    z-index: 2;
    order: 1;
    margin-top: auto;
    margin-bottom: auto;
    top: 125px;
}


#drawArea .drawSettingsField {
    margin-top: auto;
    margin-bottom: auto;
    order: 1;
    
}

#drawArea {
    display: flex;
    flex-direction: column;
}

.slider {
    background: #6b6b6b;
}


/* 
    #drawArea {
        margin-left: auto;
        margin-right: auto;
        width: fit-content;
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    #myCanvas {
        order: 0;
    }

    .drawSettingsField{
        display: inline-block;
        flex-direction: row;
    } */
/* 
    #buttons1 {
        order: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    #buttons2 {
        order: 0;
        display: flex;
        flex-direction: row;
    } */


}

@media only screen and (max-width: 996px) {}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {}
</style>
