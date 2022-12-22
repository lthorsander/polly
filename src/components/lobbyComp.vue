<template>
    <div id="container">
        <header>
            <div></div>
            {{uiLabels.waitingForHost}}
        </header> 
        <div id="userInfo"> 
        <div id="playerInfo" v-for="player in playerList" v-bind:key="player.name">
            <p> {{(player.emoji +" "+ player.name)}} </p>
        </div>
        </div>
        <div id="gameInfo"> {{playerList.length}} {{uiLabels.amountOfPlayers}} </div> 

        <button id="exitButton" @click="$router.go(-1)" v-on:click="enterGame(playerName, gameId)">{{uiLabels.exitButton}}</button>
    </div>
</template>
  
<script>
//import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
const socket = io();

export default {
    name: 'lobbyComp',
    data () {
        return {
            uiLabels: {},
            lang: "en",
            playerList:[],
            polls: {},
            data: {}
        }
    },
    created: function () {
        // this.lang = this.$route.params.lang;
        socket.emit("pageLoaded",this.lang);
        socket.on("init", (labels) => {
           this.uiLabels = labels;
        });
        socket.emit('getPlayerList');
        socket.on('RetrievePlayerList', (Info) => {
            this.playerList = Info
            console.log(this.playerList)
        })
    },
    methods: {
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
    font-size: 4em;
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

#exitButton {
  color: white;
  border-radius: 1em;
  margin-top: 1em;
  width: 300px;
  background-color: #C00000;
  font-size: 1.5em;
  font-weight: 600;
  padding: 1em;
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
button:hover {
    cursor: pointer;
    opacity: 0.75;
}
</style>
