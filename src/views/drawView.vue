<template>
    <div id="container">
        <h1>Draw: Ludde</h1>
        <div>
        {{ timerCount }}
    </div>
        <canvas id="myCanvas" width="560" height="360" @mousemove="draw" @mousedown="beginDrawing"
            @mouseup="stopDrawing" @mouseleave="stopDrawing"/>
        <button v-on:click="drawCoords()">RITA</button>
        <button v-on:click="clearCanvas()">CLEAR</button>
        <div id="drawSettingsField">
            <div id="sizeDots">
                <div id="xsmallDot" v-on:click="setColor('white')" ></div>
                <div id="smallDot" v-on:click="setColor('black')" ></div>
                <div id="mediumDot" v-on:click="setColor('rgb(87, 138, 182)')" ></div>
                <div id="largeDot" v-on:click="setColor('rgb(199, 239, 138)')" ></div>
                <div id="xlargeDot" v-on:click="setColor('rgb(183, 6, 6)')" ></div>
                <div id="xxlargeDot" v-on:click="setColor('rgb(255, 251, 132)')" ></div>
                <div id="xxxlargeDot" v-on:click="setColor('rgb(109, 68, 29)')" ></div>
                <div class="slidecontainer">
                    <input type="range" min="1" max="50" v-model="lineSize" class="slider" v-on:mouseleave="setSize(lineSize)">
                </div>
            </div>

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
            timerCount: 60
        }
    },
    watch: {

timerCount: {
    handler(value) {
        if (value > 0) {
            setTimeout(() => {
                this.timerCount--;
            }, 1000);
        }
        else if (value == 0){
            router.push('/scoreBoard')
        }
    },
    immediate: true // Gör så timer startar vid created
}},
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
        emitFunc(x1, y1, x2, y2){
            let Coords = [x1, y1, x2, y2]
            this.CoordsList.push(Coords)
            socket.emit("drawCoords",Coords);
        },
        setSize(size){
            this.lineSize = size;
            socket.emit("drawSize", this.lineSize)
        },
        setColor(color){
            this.color = color
            socket.emit("drawColor", this.color);
        },
        clearCanvas(){
            let canv = document.getElementById("myCanvas");
            this.canvas.clearRect(0, 0, canv.width, canv.height);
            socket.emit("sendClearDrawing");
        }
        },
        mounted() {
            var c = document.getElementById("myCanvas");
            this.canvas = c.getContext('2d');
        },
    }
</script>
  
<style scoped>


#container {
  background-color: #C4E0B2;
  min-height: 100vh;  
  min-width: 350px;
  height: fit-content;

}

#myCanvas {
    border: 1px solid grey;
    background-color: white;
}

#xsmallDot{
    background-color: white;
}

#smallDot{
    background-color: black;
}
#mediumDot{
    background-color: rgb(87, 138, 182);
}
#largeDot{
    
    background-color: rgb(199, 239, 138);
}

#xlargeDot{
    
    background-color: rgb(183, 6, 6);
}

#xxlargeDot{
    
    background-color: rgb(255, 251, 132);
}

#xxxlargeDot{
    
    background-color: rgb(109, 68, 29);
}

#sizeDots{
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
    display: flex;
}

#sizeDots div{
    margin: 0.5em;
    align-self: center;
}

#xsmallDot, #smallDot, #mediumDot, #largeDot, #xlargeDot, #xxlargeDot, #xxxlargeDot {
    border-radius: 30px;
    width: 25px;
    height: 25px;
}

#xsmallDot:hover, #smallDot:hover, #mediumDot:hover, #largeDot, #xlargeDot,  #xxlargeDo:hover, #xxxlargeDo:hover{
    cursor: pointer;
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