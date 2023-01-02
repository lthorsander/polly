<template>
    <div id="container">
        <header>
            <div></div>
            {{ uiLabels.createYourGameTitle }}
        </header>
        <WordComponentNew ref="wordComp" @scrollDown="scrollToBottom"></WordComponentNew>
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
        socket.on("pollCreated", (data) => {
            this.data = data
            console.log('KOLLA HÄR OCKSÅ:' + this.data.pollId)
        })

    },
    methods: {
        nextStep: function () {
            //this.gameID = null;
            for (let index = 0; index < 6; index++) {
                this.gameID += Math.floor(Math.random() * 10)
            }

            socket.emit("createPoll", { pollId: this.gameID, lang: this.lang, words: this.$refs.wordComp.allWords })
        },
        scrollToBottom: function () {
            this.$refs.botDiv.scrollIntoView({ behavior: 'smooth' });
        }
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


#container {
    background-color: #C4E0B2;
    min-height: 100vh;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

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

#gameBtnArea {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin: 2em 2em 0 2em;

}

#gameBtnArea button {
    color: white;
    border-radius: 0.5em;
    font-size: 2em;
    font-weight: 600;
    padding: 0.5em;
    margin-top: 1em;
    width: 250px;
    font-size: 2em;
    font-weight: 600;
    margin-bottom: 1em;
}



#nextBtn {
    background-color: #548135;
}


#exitButton {
    background-color: #C00000;
}


@media screen and (max-width: 930px) {
    #gameBtnArea {
        margin-left: auto;
        margin-right: auto;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        margin-bottom: 2em;
        margin-top: 1em;
        gap: 1em;
    }

    #gameBtnArea button {
        margin: 0;
    }

    header {
        font-size: 4em;
    }
}

;
</style>
  