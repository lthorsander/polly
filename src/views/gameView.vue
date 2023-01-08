<template>
    <meta charset="UTF-8">
    <div id="container">
        <join-comp v-if="joinC" ref="joinPage" :socketID="socketID" :lobbyCON="lobbyCON" :uiLabels="uiLabels"
            :gameSocket="gameSocket" @updateGameID="setGameID" @choosenEmoji="setEmoji"></join-comp>
        <draw-comp v-if="drawC" :timer="timer" :word="word" :uiLabels="uiLabels" :gameSocket="gameSocket"
            :gameID="gameID"></draw-comp>
        <guess-comp v-if="guessC" :timer="timer" :word="word" :socketID="socketID" :uiLabels="uiLabels"
            :gameSocket="gameSocket" :gameID="gameID" :choosenEmoji="choosenEmoji"></guess-comp>
        <score-comp v-if="scoreC" :uiLabels="uiLabels" :gameSocket="gameSocket" :gameID="gameID"
            :gameEnded="gameEnded"></score-comp>
        <lobby-comp v-if="lobbyC" :uiLabels="uiLabels" :gameSocket="gameSocket" :gameID="gameID"></lobby-comp>
        <end-comp v-if="endC" :uiLabels="uiLabels" :gameSocket="gameSocket" :gameID="gameID"></end-comp> 
        <button v-on:click="guessCON">GuessView</button>
        <button v-on:click="drawCON">DrawView</button>
        <button v-on:click="scoreCON">ScoreView</button>
    </div>
</template>
    
<script>
//import ResponsiveNav from '@/components/ResponsiveNav.vue';
import joinComp from '@/components/joinComp.vue';
import drawComp from '@/components/drawComp.vue';
import guessComp from '@/components/guessComp.vue';
import lobbyComp from '@/components/lobbyComp.vue';
import scoreComp from '@/components/scoreComp.vue';
import endComp from '@/components/endComp.vue';

//import router from '@/router';
import io from 'socket.io-client';
const socket = io();

export default {
    name: 'gameView',
    components: {
        joinComp,
        drawComp,
        guessComp,
        lobbyComp,
        scoreComp,
        endComp
    },
    data: function () {
        return {
            gameSocket: socket,
            joinC: true,
            drawC: false,
            guessC: false,
            lobbyC: false,
            scoreC: false,
            resultC: false,
            endC: false,
            socketID: null,
            gameID: null,
            userInfo: { userID: null, id: "", name: "", emoji: null, score: 0, lang: 'en' },
            timer: 0,
            word: "Ord saknas",
            lang: 'en',
            uiLabels: {},
            choosenEmoji: '',
            gameEnded: false
        }
    },
    created: function () {

        socket.on("reciveEmoji", (playerEmoji, x, y) => {
            console.log('PlayerEMOJI ' + playerEmoji)
            var emoji = document.createElement("div");
                emoji.innerText = playerEmoji;
                emoji.style.fontSize = "45px"
                emoji.style.position = 'absolute';
                emoji.style.left = x + 'px';
                emoji.style.top = y + 'px';
                emoji.style.userSelect = 'none';
                document.body.appendChild(emoji);
                setTimeout(function() {
                document.body.removeChild(emoji);
            }, 3000);
        },)

        socket.on("testSend", () => {
            console.log("FUNKARR")
        })

        socket.on('timer', (count) => {
            this.timer = count;
        }),
            socket.on('connect', () => {
                this.socketID = socket.id;
                console.log(socket.id);
            }),
            socket.on('gameStart', (dataID) => {
                this.joinP = false;
                this.drawC = false;
                this.guessC = false;
                this.lobbyC = false;
                this.scoreC = false;
                this.endC = false;
                console.log("GAMESTART");
                console.log("MOTTAGEN SOCKET: " + dataID);
                console.log("DENNA SOCKET " + this.socketID);
                if (dataID == this.socketID) {
                    this.drawCON();
                } else {
                    this.guessCON();
                }
            }),
            socket.on('showScore', (lastRound) => {
                if (lastRound) {
                    this.endCON();
                }
                this.gameEnded = lastRound;
                console.log(this.gameEnded)
            });
        socket.on("recivedWord", (data) => {
            console.log("RECIEVED WORD I TESTVIEW " + JSON.stringify(data.word));
            this.word = data.word;
        }),
            this.lang = this.$route.params.lang;
        socket.emit("pageLoaded", this.lang);
        socket.on("init", (labels) => {
            this.uiLabels = labels
        })
    },
    methods: {

        setEmoji: function (emoji) {
            this.choosenEmoji = emoji
        },

        setGameID: function (id) {
            this.gameID = id;
        },

        joinCON: function () {
            this.joinC = true
            this.drawC = false;
            this.guessC = false;
            this.lobbyC = false;
            this.scoreC = false;
            this.endC = false;
        },
        drawCON: function () {
            this.joinC = false;
            this.drawC = true;
            this.guessC = false;
            this.lobbyC = false;
            this.scoreC = false;
            this.endC = false;
        },
        guessCON: function () {
            this.joinC = false;
            this.drawC = false;
            this.guessC = true;
            this.lobbyC = false;
            this.scoreC = false;
            this.endC = false;
        },
        scoreCON: function () {
            this.joinC = false;
            this.drawC = false;
            this.guessC = false;
            this.lobbyC = false;
            this.scoreC = true;
            this.endC = false;
        },
        lobbyCON: function () {
            console.log("LOBBYC ON")
            this.joinC = false;
            this.drawC = false;
            this.guessC = false;
            this.lobbyC = true;
            this.scoreC = false;
            this.endC = false;
        },
        endCON: function () {
            console.log("LOBBYC ON")
            this.joinC = false;
            this.drawC = false;
            this.guessC = false;
            this.lobbyC = false;
            this.scoreC = false;
            this.endC = true;
        },
        test: function () {
            this.scoreCON();
        }
    }
}
</script>
<style scoped>
#enterButton {
    color: white;
    border-radius: 1em;
    margin-top: 1em;
    width: 10em;
    background-color: #32C7D1;
    font-size: 1.5em;
    font-weight: 600;
    padding: 0.5em;
}

input {
    padding-left: 1em;
    padding-right: 1em;
    width: 7em;
    height: 70px;
    border-radius: 0.5em;
    font-size: 2em;
    font-weight: 600;
    margin: 0.3em;
}

#inputTextField {
    width: min-content;
    display: inline-table;
    margin-top: 2em;
    margin-left: auto;
    margin-right: auto;

}

#emojiField {
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
    display: flex;
}

#emoji {
    font-size: 3em;
    margin: 0.1em;
    text-shadow: 2px 2px 4px #575757;
}

#arrow {
    font-size: 1.5em;
    padding-top: 0.7em;
    margin: 0.1em;
    color: #575757;
    display: none;

}

#emoji:hover {
    border-radius: 100%;
    background-color: #9bba88;
    cursor: pointer;
    border: black;
}

#homeButton {
    color: white;
    border-radius: 1em;
    background-color: #5b893f;
    font-size: 1.5em;
    font-weight: 600;
    width: 10em;
    padding: 0.5em;
    margin-top: 1em;
}

@media only screen and (max-width: 600px) {
    #container {
        height: 100vh;
    }

    header {
        font-size: 3em;
    }

    #emojiField {
        overflow: auto;
        width: 19em;
    }

    #arrow {
        display: flex;
    }

    #scrollStyle {
        display: flex;
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
    }

    #buttonArea {
        width: min-content;
        margin-left: auto;
        margin-right: auto;
    }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 601px) {
    input {
        width: 12em;
    }

    #buttonArea {
        bottom: 2em;
        left: 2em;
        right: 2em;
        position: absolute;
        text-align: center;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
    }

    #homeButton {
        width: 10em;
    }

}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {}
</style>