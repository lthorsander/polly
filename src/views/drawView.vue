<!-- 
<template>
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


</style> -->


<template>
    <div class="container"> 
        <section class="tools-board"> 
            <div class ="row" >
                <label class="title"> Shapes </label>
                <ul class= "options" > 
                    <li class="options">
                        <img src="https://cdn.icon-icons.com/icons2/1416/PNG/96/software-shape-rectangle_98272.png" alt="">
                        <span>Rectangle</span>
                    </li>
                    <li class="options">
                        <img src="https://cdn.icon-icons.com/icons2/1416/PNG/96/software-shape-rectangle_98272.png" alt="">
                        <span>Circle</span>
                    </li>
                    <li class="options">
                        <img src="https://cdn.icon-icons.com/icons2/1416/PNG/96/software-shape-rectangle_98272.png" alt="">
                        <span>Triangle</span>
                    </li>
                    <li class= "option">
                        <input type="checkbox" id="fill-color">
                        <label for="fill-color">Fill color</label>
                     </li>
                </ul>
            </div>

            <div class ="row" >
                <label class="title"> Options </label>
                <ul class= "options" > 
                    <li class="options">
                        <img src="https://cdn.icon-icons.com/icons2/1238/PNG/96/paintbrush_83820.png" alt="">
                        <span>Rectangle</span>
                    </li>
                    <li class="options">
                        <img src="https://cdn.icon-icons.com/icons2/1875/PNG/96/eraser_120031.png" alt="">
                        <span>Circle</span>
                    </li>

                    <li class= "option">
                        <input type="range" id="size-slide">
                     </li>
                </ul>
            </div>
            <div class ="row" >
                <label class="title"> Colors </label>
                <ul class= "options" > 
                    <li class="option"></li>
                    <li class="option"></li>
                    <li class="option"></li>
                    <li class="option"></li>
                    <li class="option"></li>
                </ul>
            </div>

            <div class ="row" >
                <label class="title"> Colors </label>
                <ul class= "options" > 
                    <li class="option"></li>
                    <li class="option"></li>
                    <li class="option"></li>
                    <li class="option"></li>
                    <li class="option"></li>
                </ul>
            </div>

            <div class ="row" >
               <button class="clear-canvas"> Clear Canvas</button>
               <button class="save-img"> Save As Image</button>
 
 
            </div>

        </section>
        <section class="drawing-board"> </section>
    </div>
</template>
  
<script>

</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif ;
}
body{
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100v;

}

</style>
  