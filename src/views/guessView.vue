 <template>
 <div v-on:click="sendEmoji" id="container">
    <div id="app">
        <h1>Guess. {{word}}</h1>
        <div>
            {{ timerCount }}
        </div>
        <canvas id="myCanvas" width="560" height="360" />
        <div>
        <input type="text" placeholder="Gissa!" v-model="guess">
        <button @click="playersGuess"> Guess </button>
        </div>
        {{guess}}
    </div>
</div>
</template>

<script>
import router from '@/router';
import io from 'socket.io-client';
const socket = io();
export default {
    name: 'GuessView',
    data: function () {
        return {
            canvas: null,
            x: 0,
            y: 0,
            isDrawing: false,
            CoordsList: [],
            CoordsList2: null,
            lineSize: 10,
            color: "black",
            guess: '',
            Guessed: false,
            word: '',
            cheatCode: '0100990001',
            guessCode: '',
            timerCount: 60,
            timerWhenGuessCorrect: 0,
            timerWhenGuessWrong: 0,
            success: null,
            fail: null
        }
    },
    created: function (){
        socket.emit('getWord')
        socket.on("theWord", (data)=>{
                this.word = data.word
                console.log(this.word)
            })
    },
    methods: {
        drawCoordss() {
                for (let index = 0; index < this.CoordsList.length; index++) {
                    this.drawLine(this.CoordsList[index][0], this.CoordsList[index][1], this.CoordsList[index][2], this.CoordsList[index][3])
                }
            },
        sendEmoji: function(e){
            if (this.Guessed == true){
            console.log('click')
            console.log(e.clientX)
            console.log(e.clientY)
            var emoji = document.createElement("div");
            emoji.innerText = "😀";
            emoji.style.position = 'absolute';
            emoji.style.left = e.clientX+'px';
            emoji.style.top = e.clientY+'px';
            emoji.style.userSelect = 'none';
            document.body.appendChild(emoji);
            }
            },
        playersGuess: function () {
            console.log(this.word)
            console.log(this.guess)
            if (this.word.toLowerCase() == this.guess.toLowerCase()){
                this.success = document.createElement("div");
                this.success.innerText = "Success";
                this.success.style.position = 'absolute';
                this.success.style.left = '10vw';
                this.success.style.top = '10vh';
                this.success.style.fontSize = '50vh';
                this.success.style.color = '#5b893f';
                this.success.style.userSelect = 'none';
                document.body.appendChild(this.success)
                this.Guessed = true
                console.log(this.timerCount)
                socket.emit("playerScore", this.timerCount)
                this.timerWhenGuessCorrect = this.timerCount
            }
            if (!(this.word.toLowerCase() == this.guess.toLowerCase())){
                this.fail = document.createElement("div");
                this.fail.innerText = "Wrong";
                this.fail.style.position = 'absolute';
                this.fail.style.left = '10vw';
                this.fail.style.top = '10vh';
                this.fail.style.fontSize = '50vh';
                this.fail.style.color = 'red';
                this.fail.style.userSelect = 'none';
                document.body.appendChild(this.fail)
                this.timerWhenGuessWrong = this.timerCount
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
        emitFunc(x1, y1, x2, y2){
            let Coords = [x1, y1, x2, y2]
            this.CoordsList.push(Coords)
            socket.emit("drawCoords",Coords);
        },
        drawCoords () {
            //let ctx = this.canvas;
            console.log("TJENA")
            socket.emit("retreiveCoords")
        }
        },
        watch: {
        timerCount: {
            handler(value) {
                if (value > 0) {
                    setTimeout(() => {
                        this.timerCount--;
                    }, 1000);
                if (this.timerCount == this.timerWhenGuessCorrect-3 || this.timerCount == 1){
                this.success.remove()
                }
                if (this.timerCount == this.timerWhenGuessWrong-1 || this.timerCount == 1){
                this.fail.remove()
                }
                }
                else if (value == 0) {
                    router.push('/scoreBoard')
                }
            },
            immediate: true // Gör så timer startar vid created
        }
    },
        mounted() {
            var c = document.getElementById("myCanvas");
            this.canvas = c.getContext('2d');
            socket.on("GetCoords", data => {
                this.CoordsList2 = data
                console.log(this.CoordsList2)
                for (let index = 0; index < this.CoordsList2.length; index++) {
                    console.log(this.CoordsList2)
                    this.drawLine(this.CoordsList2[index][0], this.CoordsList2[index][1], this.CoordsList2[index][2], this.CoordsList2[index][3])
                }
            })
            socket.on("getColor", Color =>{
                this.color = Color
            })
            socket.on("getSize", Size =>{
                this.lineSize = Size
            })
            socket.on("GetTheCoords", Coords => {
                this.drawLine(Coords[0], Coords[1], Coords[2], Coords[3])
            })
            socket.on("getClearDrawing", function(){
                let canv = document.getElementById("myCanvas");
                let ctx = canv.getContext('2d');
                console.log("TJENA")
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, canv.width, canv.height);
            })
            window.addEventListener("keypress", (e)=> {
            this.guessCode += String.fromCharCode(e.keyCode);
            if (this.cheatCode == this.guessCode){
                    this.word = 'Du har fuskat'
                  }
            for (let index = 0; index < this.guessCode.length; index++) {
                  if (this.cheatCode[index] !== this.guessCode[index]){
                    this.guessCode = ''
                  }
            }
            });
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

#language img {
    width: 100px;
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

#gameBtnArea {
    margin-top: 4em;
}

#gameBtnArea button {
    color: white;
    margin: 2em;
    background-color: #32C7D1;
    font-weight: 600;
    width: 400px;
    border-radius: 0.5em;
    font-size: 2em;
    padding: 1em;
}

#gameBtnArea button:hover {
    background-color: black;
}

#startButton {
  color: white;
  border-radius: 1em;
  margin-top: 1em;
  width: 10em;
  background-color: #32C7D1;
  font-size: 1.5em;
  font-weight: 600;
  padding: 0.5em;
}


#playerInfo{
    font-weight: 600;
    font-size: 3em;
    color: black;
    
    width: 100%;
}

#userInfo{
    margin-top: 1em;

}

#gameInfo{
    font-weight: 600;
    font-size: 3em;
    color: white;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 4em;
}

#gameId{
    font-weight: 600;
    font-size: 3em;
    color: white;
    width: 100%;
}
</style>
  
<style>
#container {
    background-color: #C4E0B2;
}

#myCanvas {
    border: 1px solid grey;
    background-color: white;
}
</style>
