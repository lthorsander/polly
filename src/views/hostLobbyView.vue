<template>
    <div id="container">
        <header>
            <div></div>
            {{ uiLabels.gameID }} {{ Object.keys(data)[Object.keys(data).length - 1] }}
        </header>
        <div id="userInfo">
            <div id="playerInfo" v-for="player in playerList" v-bind:key="player.name">
                <p> {{ (player.emoji + " " + player.name) }} </p>
            </div>
        </div>
        <div id="buttonArea">
            <button id="editButton" @click="$router.go(-1)"> {{ uiLabels.editGameButton }} </button>
            <div id="gameInfo"> {{playerList.length}} {{uiLabels.amountOfPlayers}} </div> 
            <button id="startButton" @click="startGame()">{{ uiLabels.startGameButton }}</button>
        </div>
    </div>
</template>
  
<script>
//import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
const socket = io();

export default {
    name: 'lobbyView',
    components: {
        //ResponsiveNav
    },
    data: function () {
        return {
            uiLabels: {},
            lang: "en",
            playerInfo: null,
            data: {},
            pollId: null,
            playerList: []
        }
    },
    created: function () {
        socket.emit('recivePollId')
        socket.on('pollID', (data) => {
            console.log('hostLobyView pollCreated***')
            this.data = data
            console.log(this.data)
        })
        this.id = Object.keys(this.data)[Object.keys(this.data).length - 1];
        this.pollId = this.$route.params.lang.id;
        socket.emit("pageLoaded", this.lang);
        socket.on("init", (labels) => {
            this.uiLabels = labels
        })

        //socket.emit('getPlayerList');
        // socket.on('pollCreated', (data) => { 
        //     console.log('hostLobyView pollCreated***')
        //     this.data = data
        //     console.log(data)
        //     console.log(data.pollId)
        // })
    },
    methods: {
        switchLanguage: function () {
            if (this.lang === "en")
                this.lang = "sv"
            else
                this.lang = "en"
            socket.emit("switchLanguage", this.lang)
        },
        startGame() {
            socket.emit("startGame");
        }
    },
    mounted() {
        socket.on('RetrievePlayerList', (Info) => {
            this.playerList = Info
            console.log(this.playerList)
        })
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

#startButton, #editButton {
    color: white;
    border-radius: 1em;
    margin-top: 1em;
    width: 12em;
    background-color: #548135;
    font-size: 1.5em;
    font-weight: 600;
    padding: 0.5em;
}


#playerInfo {
    font-weight: 600;
    font-size: 3em;
    color: black;

    width: 100%;
}

#userInfo {
    margin-top: 1em;

}

#gameInfo {
    font-weight: 600;
    font-size: 2em;
    color: white;
    width: 100%;
    margin-top: 1em;
}

#gameId {
    font-weight: 600;
    font-size: 3em;
    color: white;
    width: 100%;
}

@media only screen and (max-width: 600px) {
  #container {
    height: 100vh;
  }

  header {
    font-size: 3em;
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

}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {}
</style>

  
<style>
button:hover {
    cursor: pointer;
    opacity: 0.75;
}
</style>