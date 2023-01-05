<template>
    <div v-on:click="sendEmoji" id="container">
        <div id="app">
            <header>
                <div></div>
                {{ uiLabels.guessTitle }} </header>
            <header v-if="Guessed">{{ word }}</header>
            <div id="timer"> {{uiLabels.timeLeft}} {{ timer }}</div>
            <canvas id="myCanvas" width="360" height="460"/>
            <div>
                <input type="text" v-model="guess" v-bind:placeholder="uiLabels.guessHere"/>
                <button @click="playersGuess"> {{ uiLabels.guess }} </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'guessComp',
    props: ['timer', 'word', 'socketID', 'uiLabels', 'gameSocket', 'gameID', 'choosenEmoji'],
    data() {
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
            cheatCode: '0100990001',
            guessCode: '',
        }
    },
    methods: {
        drawCoordss() {
            for (let index = 0; index < this.CoordsList.length; index++) {
                this.drawLine(this.CoordsList[index][0], this.CoordsList[index][1], this.CoordsList[index][2], this.CoordsList[index][3])
            }
        },
        sendEmoji: function (e) {
            if (this.Guessed == true) {
                let x = parseInt(e.clientX)
                let y = parseInt(e.clientY)
                console.log('CHOOSENemoji' + this.choosenEmoji)
                this.gameSocket.emit('sendEmoji', this.gameID, this.choosenEmoji, x, y)
            }
        },
        playersGuess: function () {
            console.log("Ordet är: "+this.word)
            console.log("Gissningen är: "+this.guess)
            if (this.word.toLowerCase() == this.guess.toLowerCase()) {
                console.log("RÄTT ORD");
                this.gameSocket.emit("updateScore", this.timer, this.gameID);
                // var success = document.createElement("div");
                // success.innerText = "Success";
                // success.style.position = 'absolute';
                // success.style.left = '10vw';
                // success.style.top = '10vh';
                // success.style.fontSize = '50vh';
                // success.style.color = '#5b893f';
                // success.style.userSelect = 'none';
                // document.body.appendChild(success)
                this.Guessed = true
            }
            if (!(this.word.toLowerCase() == this.guess.toLowerCase())) {
                console.log("FEL ORD")
                // var fail = document.createElement("div");
                // fail.innerText = "Wrong";
                // fail.style.position = 'absolute';
                // fail.style.left = '10vw';
                // fail.style.top = '10vh';
                // fail.style.fontSize = '50vh';
                // fail.style.color = 'red';
                // fail.style.userSelect = 'none';
                // document.body.appendChild(fail)
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
        emitFunc(x1, y1, x2, y2) {
            let Coords = [x1, y1, x2, y2]
            this.CoordsList.push(Coords)
            this.gameSocket.emit("drawCoords", Coords);
        },
        drawCoords() {
            //let ctx = this.canvas;
            console.log("TJENA")
            this.gameSocket.emit("retreiveCoords")
        }
    },
    mounted() {
        var c = document.getElementById("myCanvas");
        this.canvas = c.getContext('2d');
        this.gameSocket.on("GetCoords", data => {
            this.CoordsList2 = data
            console.log(this.CoordsList2)
            for (let index = 0; index < this.CoordsList2.length; index++) {
                console.log(this.CoordsList2)
                this.drawLine(this.CoordsList2[index][0], this.CoordsList2[index][1], this.CoordsList2[index][2], this.CoordsList2[index][3])
            }
        })
        this.gameSocket.on("getColor", Color => {
            this.color = Color
        })
        this.gameSocket.on("getSize", Size => {
            this.lineSize = Size
        })
        this.gameSocket.on("GetTheCoords", Coords => {
            this.drawLine(Coords[0], Coords[1], Coords[2], Coords[3])
        })
        this.gameSocket.on("getClearDrawing", function () {
            let canv = document.getElementById("myCanvas");
            let ctx = canv.getContext('2d');
            console.log("TJENA")
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canv.width, canv.height);
        })
        window.addEventListener("keypress", (e) => {
            this.guessCode += String.fromCharCode(e.keyCode);
            // console.log(String.fromCharCode(e.keyCode));
            // console.log(this.guessCode);
            // console.log(this.cheatCode);
            if (this.cheatCode == this.guessCode) {
                //this.word = 'Du har fuskat'
                console.log("Du har fuskat")
            }
            for (let index = 0; index < this.guessCode.length; index++) {
                if (this.cheatCode[index] !== this.guessCode[index]) {
                    //console.log(this.cheatCode[index] !== this.guessCode[index])
                    this.guessCode = ''
                }
            }
        });
    },
}
</script>
  
<style scoped>

header div {
    height: 0.3em;
}

#timer {
    margin-top: 0.3em;
    margin-bottom: 0.3em;
    font-size: 2em;
    font-weight: 600;
    color: white;
}

#myCanvas {
    border: 2px solid black;
    background-color: white;
}

input {
  padding-left: 0.4em;
  padding-right: 0.2em;
  width: 195px;
  height: 70px;
  border-radius: 0.5em;
  font-size: 2em;
  font-weight: 600;
  margin: 0.1em;
  margin-left: 0.2em;
  margin-top: 0.3em;
}

button{
    background-color: #5b893f;
    margin-right: 0.2em;
}
</style>
