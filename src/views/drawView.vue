<template>
    <div id="container">
        <h1>Draw: {{ word }}</h1>
        <div>
            {{ timerCount }}
        </div>
        <div id="drawArea">
            <div id="drawSettingsField">
                <div class="icon"><img src="../../public/img/garbage.svg" alt="garbage" v-on:click="clearCanvas()"></div>
                <div class="icon"><img src="../../public/img/eraser.png" alt="eraser"></div>
                <div class="icon"><img src="../../public/img/pen.svg" alt="eraser"></div>
                <div class="icon" ref="palette" @mouseover="hover = true, pickColor()" @mouseleave="hover=false, pickColor()"><img ref="paletteImg" src="../../public/img/palette.svg" alt="eraser"></div>
            </div>
            <canvas id="myCanvas" width="360" height="460" @mousemove="draw" @mousedown="beginDrawing"
                @mouseup="stopDrawing" @mouseleave="stopDrawing" />

        </div>
        <div id="sizeDots" @mouseover="hover = true, pickColor()" @mouseleave="hover=false, pickColor()">
            <div id="xsmallDot" v-on:click="setColor('white')"></div>
            <div id="smallDot" v-on:click="setColor('black')"></div>
            <div id="mediumDot" v-on:click="setColor('rgb(87, 138, 182)')"></div>
            <div id="largeDot" v-on:click="setColor('rgb(199, 239, 138)')"></div>
            <div id="xlargeDot" v-on:click="setColor('rgb(183, 6, 6)')"></div>
            <div id="xxlargeDot" v-on:click="setColor('rgb(255, 251, 132)')"></div>
            <div id="xxxlargeDot" v-on:click="setColor('rgb(109, 68, 29)')"></div>
        </div>
        <div id="slidecontainer">
            <input type="range" min="1" max="50" v-model="lineSize" class="slider" v-on:mouseleave="setSize(lineSize)">
        </div>

    </div>
</template>

<script>
import router from '@/router';
import io from 'socket.io-client';
const socket = io();
export default {
    name: 'drawView',
    data: function () {
        return {
            canvas: null,
            x: 0,
            y: 0,
            isDrawing: false,
            CoordsList: [],
            lineSize: 10,
            color: "black",
            timerCount: 60,
            word: '',
            hover: false
        }
    },
    created: function () {
        socket.emit('getWord')
        socket.on("theWord", (data) => {
            this.word = data.word
            console.log(this.word)
        })
    },
    watch: {
        timerCount: {
            handler(value) {
                if (value > 0) {
                    setTimeout(() => {
                        this.timerCount--;
                    }, 100000);
                }
                else if (value == 0) {
                    router.push('/scoreBoard')
                }
            },
            immediate: true // Gör så timer startar vid created
        }
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
                this.x = 0;
                this.y = 0;
                this.isDrawing = false;
            }
        },
        draw(e) {
            if (this.isDrawing === true) {
                this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
                this.emitFunc(this.x, this.y, e.offsetX, e.offsetY);
                this.x = e.offsetX;
                this.y = e.offsetY;
            }
        },
        emitFunc(x1, y1, x2, y2) {
            let Coords = [x1, y1, x2, y2]
            this.CoordsList.push(Coords)
            socket.emit("drawCoords", Coords);
        },
        setSize(size) {
            this.lineSize = size;
            socket.emit("drawSize", this.lineSize)
        },
        setColor(color) {
            let palette = this.$refs.paletteImg;
            palette.style.backgroundColor = color;
            this.color = color
            socket.emit("drawColor", this.color);
        },
        clearCanvas() {
            let canv = document.getElementById("myCanvas");
            this.canvas.clearRect(0, 0, canv.width, canv.height);
            socket.emit("sendClearDrawing");
        },
        pickColor() {
            console.log(this.hover)
            let palette = this.$refs.palette;
            let paletteCoords = palette.getBoundingClientRect();
            let div = document.getElementById('sizeDots');
            if (this.hover) {
                console.log("Hejsan");
                div.style.display = "flex";
                div.style.position = "absolute";
                div.style.top = paletteCoords.top + "px";
                div.style.left = paletteCoords.left - 300 + "px";
            } else {
                    setTimeout(()=>{
                        if(!this.hover){
                            div.style.display = "none";
                        }
                        },
                        2000)
        
                
                
            }
        }
    },
    mounted() {
        var c = document.getElementById("myCanvas");
        this.canvas = c.getContext('2d');
    },
}

</script>
  
<style scoped>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
    display: block;
}

body {
    line-height: 1;
}

ol,
ul {
    list-style: none;
}

blockquote,
q {
    quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
    content: '';
    content: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

#container {
    background-color: #C4E0B2;
    min-height: 100vh;
    min-width: 350px;
    height: fit-content;

}

#myCanvas {
    margin-right: 50px;
    border: 1px solid grey;
    background-color: white;
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

#sizeDots {
    background-color: rgba(0, 0, 0, 0.473);
    border-radius: 10px;
    display: none;
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
#largeDot,
#xlargeDot,
#xxlargeDo:hover,
#xxxlargeDo:hover {
    cursor: pointer;
}

#slidecontainer {
    width: fit-content;
}

#drawArea {
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
    display: flex;
}

#drawSettingsField {
    margin-right: 1em;
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


.icon img{
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
    height: 15px;
    border-radius: 5px;
    background: #ffffff;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
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

.slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #04AA6D;
    cursor: pointer;
}
</style>