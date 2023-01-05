<template>
    <div id="container">
        <score-comp v-if="scoreC" :uiLabels="uiLabels" :gameSocket="hostSocket" :gameID="gameID"></score-comp> 
        <div id="hostView" v-if="hostView"> 
        <header>
            <div></div>
            {{ uiLabels.gameID + ":"}} {{gameID}}
        </header>
            <div id="playerInfo" v-for="player in playerList" v-bind:key="player">
                <p> {{ player }} </p>
            </div>
        <div id="buttonArea">
            <div id="exitButtonDiv">
                <button id="exitButton" @click="$router.push('/')"> {{ uiLabels.endGame }} </button>
            </div>
            <div id="gameInfo"> {{ playerList.length }} {{ uiLabels.amountOfPlayers }} </div>
            <div id="startButtonDiv">
                <button id="startButton" @click="startGame()">{{ uiLabels.startGameButton }}</button>
            </div>
        </div>
    </div> 
    </div>
</template>
  
<script>
//import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
import scoreComp from '@/components/scoreComp.vue';

const socket = io();
export default {
    name: 'lobbyView',
    components: {
        scoreComp,
        //ResponsiveNav
    },
    data: function () {
        return {
            hostSocket: socket,
            uiLabels: {},
            lang: "en",
            playerInfo: null,
            data: {},
            gameID: null,
            playerList: [],
            scoreC: false,
            hostView: true
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
            this.scoreCON();
        },
        scoreCON: function () {
            this.hostView = false;
            this.scoreC = true;
        },
    },
    mounted() {
        socket.on('RetrievePlayerList', (Info) => {
            this.playerList = Info
            console.log(this.playerList);
        })
    },
}
</script>
<style scoped>


#container {
    display: flex;
    flex-direction: column;
    flex: 1;
}
header {
    width: 100%;
    order: 0;
    font-weight: 600;
    font-size: 4em;
    color: white;
    text-align: center;
}

#startButton {
    margin-top: 1em;
    width: 8em;
    background-color: #548135;
    float: right;
}

#exitButton {
    margin-top: 1em;
    width: 8em;
    background-color: #C00000;
    float: left;
}

#exitButtonDiv,
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
    flex: 1 1 20%;
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
    #exitButtonDiv {
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
@media only screen and (max-width: 1000px) {
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
    #exitButtonDiv {
        float: left;
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
