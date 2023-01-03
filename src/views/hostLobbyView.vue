<template>
    <div id="container">
        <header>
            <div></div>
            {{ uiLabels.gameID }} {{ Object.keys(data)[Object.keys(data).length - 1] }}
        </header>
        <div id="buttonArea">
            <div id="editButtonDiv">
                <button id="editButton" @click="$router.go(-1)"> {{ uiLabels.editGameButton }} </button>
            </div>
            <div id="userInfo">
                <div id="playerInfo" v-for="player in playerList" v-bind:key="player.name">
                    <p> {{ (player.emoji + " " + player.name) }} </p>
                </div>
            </div>
            <div id="gameInfo"> {{ playerList.length }} {{ uiLabels.amountOfPlayers }} </div>
            <div id="gameId"> {{ uiLabels.gameID + ":" }} {{ id }} </div>
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
            playerList: [],
            word: ''
        }
    },
    created: function () {
        socket.emit('recivePollId')
        socket.on('pollID', (data) => {
            console.log('hostLobyView pollCreated***')
            this.data = data
            console.log(this.data)
        }),

            socket.emit('getPlayerList');
        socket.on('RetrievePlayerList', (Info) => {
            this.playerList = Info
            console.log(this.playerList)
        })
        this.id = Object.keys(this.data)[Object.keys(this.data).length - 1];
        this.pollId = this.$route.params.lang.id;
        this.lang = this.$route.params.lang;
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

#container {
    display: flex;
    flex-direction: column;
    flex: 1;

}

#startButton {
    color: white;
    border-radius: 1em;
    margin-top: 1em;
    width: 10em;
    background-color: #548135;
    font-size: 1.5em;
    font-weight: 600;
    padding: 0.5em;
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

#editButtonDiv,
#startButtonDiv {
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
    margin-top: 1em;
    flex: 1 1 0;
}

#gameId {
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