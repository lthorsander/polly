<template>
    <meta charset="UTF-8">
    <div id="container">
        <header>
            <div></div>
            {{ uiLabels.createYourGameTitle }}
        </header>
        <WordComponentNew ref="wordComp" @scrollDown="scrollToBottom" :uiLabels="uiLabels"></WordComponentNew>
        <div id="gameBtnArea" ref="botDiv">
            <!-- <button id="addBtn" v-on:click="addWord()">ADD WORD</button>  -->
            <button id="nextBtn" v-on:click="nextStep()"
                @click="$router.push('/hostLobbyView/' + lang + '/' + gameID)">NEXT
                STEP</button>
            <button id="exitButton" @click="$router.go(-1)"> {{ uiLabels.exitButton }} </button>
        </div>
    </div>
</template>
  
<script>
//import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
const socket = io();
//import WordComponent from '@/components/wordComponent.vue';
import WordComponentNew from '@/components/wordComponentNew.vue';

export default {
    name: 'createView',
    components: {
        //ResponsiveNav
        //WordComponent
        WordComponentNew
    },
    data: function () {
        return {
            uiLabels: {},
            lang: "en",
            pollId: "123456",
            gameID: '',
            data: {},
            botDiv: null,
            allWords: null
        }
    },
    created: function () {
        this.botDiv = this.$refs.botDiv;
        this.lang = this.$route.params.lang;
        socket.emit("pageLoaded", this.lang);
        socket.on("init", (labels) => {
            this.uiLabels = labels
        })
    },
    methods: {
        nextStep: function () {
            //this.gameID = null;
            for (let index = 0; index < 6; index++) {
                this.gameID += Math.floor(Math.random() * 10)
            }

            socket.emit("createPoll", { pollId: this.gameID, lang: this.lang, words: this.$refs.wordComp.allWords });
            socket.emit("createGame", { gameId: this.gameID, words: this.$refs.wordComp.allWords });
        },
        scrollToBottom: function () {
            this.$refs.botDiv.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
</script>
<style scoped>

#container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}

#gameBtnArea {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin: 2em 2em 0 2em;

}


#nextBtn {
    background-color: #548135;
}


#exitButton {
  color: white;
  border-radius: 0.5em;
  background-color: #C00000;
  font-size: 2em;
  font-weight: 600;
  width: fit-content;
  padding: 0.5em;
}
</style>
  