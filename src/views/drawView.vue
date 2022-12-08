<!-- <template>
    <div id="container">
        <header>
            <div>{{this.data.wordList}}</div>
        </header>
        <canvas v-on:mousedown="draw" ref="canvas" id="drawArea"></canvas>
    </div>
</template>
  
<script>
//import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
const socket = io();

//import { Socket } from 'engine.io-client';

export default {
    name: 'drawView',
    components: {
        //ResponsiveNav
        //WordComponent
    },
    data: function () {
        return {
            data: {}
        }
    },
    created: function () {
        socket.emit('joinedPoll')
        socket.on("pollJoined", (data) => {this.data = data
        console.log('DrawView:' + this.data)})
    },
    methods: {

        draw: function(){
            let canvas = this.$refs.canvas;
            //const ctx = canvas.getContext("2d")

            // lets create a rectangle for testing purposes
            canvas.addEventListener("mousemove", (e) => {
            console.log("Mouse X: " + e.clientX)
            console.log("Mouse Y: " + e.clientY)
})
        }
    }
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
    height: fit-content;

}

header {
    font-weight: 600;
    font-size: 5em;
    color: white;
    width: 100%;
}

header div {
    height: 0.5em;
}

#drawArea{
    width: 70vw;
    height: 70vh;
    background-color: white;
    margin-left: auto;
    margin-right: auto;
}


</style>
   -->
   
<template>
    <div id="app">
        <span>{{ x }}, {{ y }}</span>
        <h1>Draw: Ludde</h1>
        <canvas id="myCanvas" width="560" height="360" @mousemove="draw" @mousedown="beginDrawing"
            @mouseup="stopDrawing" />
    </div>
</template>

<script>
export default {
    name: 'drawView',
    data: function () {
        return {
            canvas: null,
            x: 0,
            y: 0,
            isDrawing: false
        }
    },
    methods: {
        showCoordinates(e) {
            this.x = e.offsetX;
            this.y = e.offsetY;
        },
        drawLine(x1, y1, x2, y2) {
            let ctx = this.canvas;
            ctx.beginPath();
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
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
                this.x = e.offsetX;
                this.y = e.offsetY;
            }
        }
        },
        mounted() {
            var c = document.getElementById("myCanvas");
            this.canvas = c.getContext('2d');
        },
    }
</script>
  
<style>
#myCanvas {
    border: 1px solid grey;
}
</style>