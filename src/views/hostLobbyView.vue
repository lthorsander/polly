<template>
    <div id="container">
        <header>
            <div></div>
           <h1> {{ uiLabels.gameID }} {{gameID}}</h1>
        </header>
        <div>
            <div id="playerInfo" v-for="player in playerList" v-bind:key="player">
                <p> {{ player }} </p>
            </div>
        </div>
        <div id="buttonArea">
            <div id="editButtonDiv">
                <button id="editButton" @click="$router.go(-1)"> {{ uiLabels.editGameButton }} </button>
            </div>
            <div id="gameInfo"> {{ playerList.length }} {{ uiLabels.amountOfPlayers }} </div>
            <div id="startButtonDiv">
                <button id="startButton" @click="startGame()">{{ uiLabels.startGameButton }}</button>
            </div>
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
            gameID: null,
            playerList: []
        }
    },
    created: function () {
        this.gameID = this.$route.params.id;
        this.lang = this.$route.params.lang;
        socket.emit('hostJoin', this.gameID);
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
            //const route = useRoute();
            //const id = route.params.lang.id;
            socket.emit("startGame", this.gameID);
            socket.emit("selectWord");
            console.log(this.word)
            socket.on("recivedWord", (data) => {
                this.word = data
                console.log(this.word)
            })
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

#container {
    background-color: #C4E0B2;
    min-height: 100vh;
    height: fit-content;
    display: flex;
    flex-direction: column;
    flex: 1;
}
header {
    font-weight: 600;
    font-size: 5em;
    color: white;
    width: 100%;
    order: 0;
}

header div {
    height: 0.5em;
}

#startButton {
    margin-top: 1em;
    width: 8em;
    background-color: #548135;
}

#editButton {
    margin-top: 1em;
    width: 8em;
    background-color: #548135;
}

#editButtonDiv,
#startButtonDiv {
    flex: 1 1 0;
}
#playerInfo {
    font-weight: 600;
    font-size: 3em;
    color: black;
    order: 1;
}
#gameInfo {
    font-weight: 600;
    font-size: 2em;
    color: white;
    width: 100%;
    margin-top: 1.5em;
    flex: 1 1 0;
}
#gameId {
    font-weight: 600;
    font-size: 3em;
    color: white;
    width: 100%;
}
#buttonArea {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    bottom: 2em;
    left: 2em;
    right: 2em;
    position: absolute;
    text-align: center;
    order: 2;
}
@media only screen and (max-width: 840px) {
    #container {
        height: 100vh;
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    #buttonArea {
        width: min-content;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 1em;
    }
    
    #gameInfo {
        order: 0;
    }
    #editButtonDiv {
        order: 2;
    }
    #startButtonDiv {
        order: 1;
    }
    header {
        font-size: 3em;
    }
    #playerInfo {
        font-size: 2em;
    }
}
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (max-width: 1051px) {
    #container {
        height: 100vh;
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    #buttonArea {
        width: min-content;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 1em;
    }
    #gameInfo {
        order: 0;
    }
    #editButtonDiv {
        order: 2;
    }
    #startButtonDiv {
        order: 1;
    }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {}

@media only screen and (max-width: 996px) {}
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {}
</style>
  
<style>
button:hover {
    cursor: pointer;
    opacity: 0.75;
}
</style>
