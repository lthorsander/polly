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
            <button id="nextBtn" v-on:click="nextStep()" @click="$router.push('/hostLobbyView/' + lang + '/' + gameID)">
                {{ uiLabels.nextStepButton }}
            </button>
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
    margin: 2em 2em 2em 2em;
}

#exitButton {
    background-color: #C00000;
    width: fit-content;
}

#nextBtn {
    background-color: #5b893f;
    width: fit-content;
}

@media only screen and (max-width: 600px) {
    #container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    #gameBtnArea {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        margin-left: auto;
        margin-right: auto;
    }

    #exitButton {
        background-color: #C00000;
        width: fit-content;
        margin-top: 0.5em;
    }

    #nextBtn {
        background-color: #5b893f;
        width: fit-content;
    }

    header {
        font-size: 3em;
    }
}

@media only screen and (min-width: 601px) {}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1000px) {}
</style>
  