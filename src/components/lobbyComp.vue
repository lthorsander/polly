<template>
    <div id="container">
        <header>
            <div></div>
            {{uiLabels.waitingForHost}}
        </header> 
        <div id="userInfo"> 
        <div id="playerInfo" v-for="player in playerList" v-bind:key="player">
            <p> {{player}} </p>
        </div>

        <div id="infoArea">
            <div id="buttonDiv">
                <button id="exitButton" @click="$router.go(-1)" v-on:click="enterGame(playerName, gameId)">
                {{uiLabels.exitButton}}
            </button>
            </div>
            <div id="gameInfo"> {{ playerList.length }} {{ uiLabels.amountOfPlayers }} </div>
            <div id="gameId"> {{ uiLabels.gameID + ":" }} {{ this.playerList[0].id }} </div>
        </div>
    </div>

    <!-- <div id="gameInfo"> {{playerList.length}} {{uiLabels.amountOfPlayers}} </div> 

        <button id="exitButton" @click="$router.go(-1)" v-on:click="enterGame(playerName, gameId)">{{uiLabels.exitButton}}</button>
    </div>-->
</template>
  
<script>
//import ResponsiveNav from '@/components/ResponsiveNav.vue';
export default {
    name: 'lobbyComp',
    props: ['uiLabels', 'gameSocket', 'gameID'],
    data () {
        return {
            playerList:[],
            polls: {},
            data: {}
        }
    },
    created: function () {
        // this.lang = this.$route.params.lang;
        this.gameSocket.on('RetrievePlayerList', (playerList) => {
            this.playerList = playerList;
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
    display: flex;
    flex-direction: column;
    flex: 1;
}
header {
    font-weight: 600;
    font-size: 4em;
    color: white;
    width: 100%;
    order: 0;
}
header div {
    height: 0.5em;
}

#exitButton {
    width: 8em;
    background-color: #C00000;
}

#buttonDiv {
    margin-top: 1em;
    flex: 1 1 0;
}

#playerInfo {
    font-weight: 600;
    font-size: 3em;
    color: black;
    width: 100%;
    order: 1;
}

#userInfo {
    margin-top: 1em;
}

#gameInfo {
    font-weight: 600;
    font-size: 2em;
    color: white;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    flex: 1 1 20%;
}

#gameId {
    font-weight: 600;
    font-size: 2em;
    color: white;
    width: 100%;
    flex: 1 1 0;
}
#infoArea {
    margin-left: auto;
    margin-right: auto;
    bottom: 2em;
    left: 2em;
    right: 2em;
    position: absolute;
    order: 2;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
@media only screen and (max-width: 960px) {
    #container {
        height: 100vh;
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    #gameInfo {
        order: 0;
        font-size: 1.5em;
    }
    #gameId {
        order: 1;
        font-size: 1.5em;
    }
    #buttonDiv {
        order: 2;
    }
    #infoArea {
        width: max-content;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 1em;
    }
    header {
        font-size: 2.5em;
    }
    #playerInfo {
        font-size: 2em;
    }
}
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 960px) {
    #gameId, #gameInfo{
    margin-top: 1em;
    }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {}

/* Large devices (laptops/desktops, 992px and up) */
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
