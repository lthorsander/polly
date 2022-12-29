<template>
    <meta charset="UTF-8">
    <div id="container">
        <header>
            <div></div>
            {{ uiLabels.createYourGameTitle }}
        </header>

        <div id="inputArea">
            <WordComponentNew></WordComponentNew>
            <!-- <button id="addBtn" v-on:click="addWord()">ADD WORD</button>  -->
        </div>
        
        <div id="buttonArea">
            <button id="nextBtn" v-on:click="nextStep()" @click="$router.push('/hostLobbyView/' + lang + '/' + gameID)">NEXT
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
            data: {}
        }
    },
    created: function () {
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
            for(let index=0; index<6; index++){
            this.gameID += Math.floor(Math.random()*10)
        }
        console.log('KOLLA HÄR FÖR WORDCOMP:' + Object.keys(WordComponentNew))
        socket.emit("createPoll", {pollId: this.gameID, lang: this.lang})
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
  min-width: 350px;
  height: fit-content;
  position: relative;
/* 
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-areas: 
  ". . header header header header header . ."
  ". . . . inputArea . . . ."
  ". . . . . . . . ."
  ". . . . . . . . ."
  ". . . . . . . . ."
  ". exitButton exitButton . . . . . ."
  ; */

}

header {
    font-weight: 600;
    font-size: 5em;
    color: white;
    width: 92%;
    margin-left: 4%;
    margin-right: 4%;
    text-align: center;
    /* grid-area: header; */
}

header div {
    height: 0.5em;
}

#nextBtn {
    color: white;
    border-radius: 1em;
    margin-top: 1em;
    width: 10em;
    background-color: #548135;
    font-size: 1.5em;
    font-weight: 600;
    padding: 0.5em;
}


/* #inputArea {
    /* grid-area: inputArea; */
    /* text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: min-content;
    margin-top: 2em;
} */ 

/* #inputArea button {
    color: white;
    border-radius: 0.5em;
    font-size: 2em;
    font-weight: 600;
    padding: 0.5em;
    margin-top: 1em;
} */

/* #buttonArea {
    /* grid-area: exitButton;
}*/
/* 
#addBtn {
    width: 60vw;
    background-color: #32C7D1;
} */

#exitButton {
  color: white;
  border-radius: 1em;
  background-color: #C00000;
  font-size: 1.5em;
  font-weight: 600;
  width: 10em;
  padding: 0.5em;
  margin-top: 1em;
}


@media only screen and (max-width: 600px) {

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
  /* input {
    width: 12em;
  } */

  #container {
    position: relative;
  }
/* 
  #buttonArea {
    bottom: 2em;
    left: 2em;
    right: 2em;
    position: absolute;
    text-align: center;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  } */

  #buttonArea {
    position: fixed;
    left: 2em;
    right: 2em;
    bottom: 2em;
  }

  #exitButton {
    text-align: center;
    float: left;
  }

  #nextBtn {
    text-align: center;
    float: right;
  }
/* 
  #exitButton {
    width: 10em;
  } */
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {}

</style>
  