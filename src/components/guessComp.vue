<template>
    <div v-on:click="sendEmoji" id="container">
        <div id="container">
            <header> 
                <div></div>
                <h1 class="title" id="textGuessedCorrect" v-if="Guessed"> {{ uiLabels.rightGuess }} {{ word }} </h1>
                <h1 class="title" id="guessTitle" v-else > {{ uiLabels.guessTitle }} {{ cheat }}</h1>
                 </header>
            
            <div id="timer"> {{uiLabels.timeLeft}} {{ timer }}</div>
            <canvas id="myCanvas" width="360" height="460"> </canvas>
<<<<<<< HEAD
            <div>
                <input type="text" ref="guessBox" v-model="guess" v-bind:placeholder="uiLabels.guessHere"/>
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
            insideButton: false
        }
    },
    methods: {
        sendEmoji: function (e) {
            var guessButtonStartX = this.$refs.guessButton.getBoundingClientRect().x;
            var guessButtonEndX = this.$refs.guessButton.getBoundingClientRect().width + this.$refs.guessButton.getBoundingClientRect().x;
            var guessButtonStartY = this.$refs.guessButton.getBoundingClientRect().y;
            var guessButtonEndY = this.$refs.guessButton.getBoundingClientRect().y + this.$refs.guessButton.getBoundingClientRect().height;
            if ((e.clientX > guessButtonStartX || e.clientX < guessButtonEndX) && (e.clientY < guessButtonStartY || e.clientY > guessButtonEndY)){
                this.insideButton = true;
            } else {
                this.insideButton = false;
            }
            if (this.Guessed == true && this.insideButton) {
                let x = parseInt(e.clientX - 15)
                let y = parseInt(e.clientY + this.topY - 15)
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

.title{
    color: white;
    text-align: center;
}

#textGuessedCorrect {
    color: #5b893f;
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

footer{
    height: 20px;
    background-color: #C4E0B2;
}

@media only screen and (max-width: 600px) {

    header{
        font-size: 3em;
    }
}

@media only screen and (max-width: 450px) {

header{
    font-size: 2.5em;
}
}

</style>
