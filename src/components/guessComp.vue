<template>
    <div id="container">
        <div id="container">
            <header>
                <div></div>
                <h1 class="title" id="textGuessedCorrect" v-if="Guessed"> {{ uiLabels.rightGuess }} {{ word.toUpperCase() }} </h1>
                <h1 class="title" id="guessTitle" v-else> {{ uiLabels.guessTitle }} {{ cheat }}</h1>
            </header>

            <div id="timer"> {{ uiLabels.timeLeft }} {{ timer }}</div>
            <div id="canvasWrapper">
                <canvas v-on:click="sendEmoji" ref="canvas" id="myCanvas" width="360" height="460"> </canvas>
            </div>
            <div id="buttonDiv">
                <input type="text" ref="guessBox" v-model="guess" v-bind:placeholder="uiLabels.guessHere" />
                <button ref="guessButton" @click="playersGuess"> {{ uiLabels.guess }} </button>
            </div>
        </div>
    </div>
    <footer></footer>
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
            cheat: '',
            topY: 0,
            insideCanvas: false
        }
    },
    methods: {
        sendEmoji: function (e) {
            /*var canvasStartX = this.$refs.canvas.getBoundingClientRect().x;
            var canvasEndX = this.$refs.canvas.getBoundingClientRect().width + this.$refs.canvas.getBoundingClientRect().x;
            var canvasStartY = this.$refs.canvas.getBoundingClientRect().y;
            var canvasEndY = this.$refs.canvas.getBoundingClientRect().y + this.$refs.canvas.getBoundingClientRect().height;
            if ((e.clientX > canvasStartX && e.clientX < canvasEndX) && (e.clientY > canvasStartY && e.clientY < canvasEndY)){
                this.insideCanvas = true;
            } else {
                this.insideCanvas = false;
            }  && this.insideCanvas  */
            if (this.Guessed == true) {
                let x = parseInt(e.offsetX -15)
                let y = parseInt(e.offsetY - 15)
                console.log('CHOOSENemoji' + this.choosenEmoji)
                console.log('CLICK POSITION X: ' + e.clientX)
                console.log('CLICK POSITION Y: ' + e.clientY)
                this.gameSocket.emit('sendEmoji', this.gameID, this.choosenEmoji, x, y)
            }
        },
        playersGuess: function () {
            console.log("Ordet är: " + this.word)
            console.log("Gissningen är: " + this.guess)
            if (this.word.toLowerCase() == this.guess.toLowerCase()) {
                console.log("RÄTT ORD");
                this.gameSocket.emit("updateScore", this.timer, this.gameID);
                this.Guessed = true
                this.$refs.guessBox.style.backgroundColor = "#5b893f";
            }
            if (!(this.word.toLowerCase() == this.guess.toLowerCase())) {
                console.log("FEL ORD")
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
    onScroll: function (event) {
            this.topY = event.target.documentElement.scrollTop;
            console.log("SCROLL Y: " + this.topY);
        },
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
            }, 3000);
        },)
    },
    mounted() {
        window.addEventListener("scroll", this.onScroll);
    
        var c = document.getElementById("myCanvas");
        this.canvas = c.getContext('2d');
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
            if (this.cheatCode == this.guessCode) {
                this.cheat = this.word
                console.log("Du har fuskat")
            }
            for (let index = 0; index < this.guessCode.length; index++) {
                if (this.cheatCode[index] !== this.guessCode[index]) {
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

.title {
    color: white;
    text-align: center;
}

#textGuessedCorrect {
    color: #5b893f;
}

#canvasWrapper{
    margin: auto;
    width: 368px;
    height: 468px;
    overflow: hidden;
    position: relative;
}

#timer {
    margin-top: 0.3em;
    margin-bottom: 0.3em;
    font-size: 2em;
    font-weight: 600;
    color: white;
}

#myCanvas {
    border-width: 4px;
    border-style: solid;
    border-image: linear-gradient(to right, #5B893F, #32C7D1) 1;
    background-color: #FAF9F6;
    border-bottom: none;
}

input {
    padding-left: 0.4em;
    padding-right: 0.2em;
    width: 210px;
    margin-left: 0.2em;
    margin-top: 0.1em;
}

input, button {
    font-size: 1.75em;
    font-weight: 600;
    height: 70px;
    border-radius: 0.5em;
    border: solid black;
}

#buttonDiv {
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
    margin-left: auto;
    margin-right: auto; 
}

button {
    background-color: #5b893f;
    padding-left: 0.4em;
    padding-right: 0.2em;
    width: min-content;
    margin-right: 0.2em;
    margin-top: 0.175em;
}

footer {
    height: 20px;
    background-color: #C4E0B2;
}

@media only screen and (max-width: 600px) {

    header {
        font-size: 3em;
    }
    
}

@media only screen and (max-width: 450px) {

    header {
        font-size: 2.5em;
    }

}
</style>
