<template>
    <meta charset="UTF-8">
    <div id="container">
        <div id="topInfo">
            <!-- <div></div> -->
        <header>
            <div></div>
            {{ uiLabels.createYourGameTitle }}
        </header>
        <div id="rulesBtn">
        <img src="../../public/img/pngfind.com-question-marks-png-435937.png" alt="Rules" v-on:click="showRules">
      </div>
      <div id="rulesBackground" ref="rulesBackground">
      <div id="rulesBox" ref="RulesBox">
        <span v-on:click="closeRules">&times;</span>
        <h1>{{uiLabels.playerInfo}}</h1>
        <p id="rulesBoxText"> {{ uiLabels.playerInfoText }}</p>
        <h2> {{ uiLabels.gameRulesTitle }}</h2>
        <p id="rulesBoxText"> {{ uiLabels.gameRules1 }}</p>
        <p id="rulesBoxText"> {{ uiLabels.gameRules2 }}</p>
        <p id="rulesBoxText"> {{ uiLabels.gameRules3 }}</p>
        <p id="rulesBoxText"> {{ uiLabels.gameRules4 }}</p>
      </div>
    </div>
    </div>
            <WordComponentNew ref="wordComp" @scrollDown="scrollToBottom" :uiLabels="uiLabels"></WordComponentNew>
        <div id="gameBtnArea" ref="botDiv">
            <!-- <button id="addBtn" v-on:click="addWord()">ADD WORD</button>  -->
            <button id="nextBtn" v-on:click="showInfo">
                {{ uiLabels.nextStepButton }}
                <!-- <span id="nextWarningText"> Är du säker på att du vill fortsätta? Det går inte att ändra dina ord efter detta steg. </span> -->
            </button>
            <button id="exitButton" @click="$router.go(-1)"> {{ uiLabels.exitButton }} </button>
        </div>
            <div id="infoBackground" ref="infoBackground">
        <div id="infoBox" ref="InfoBox">
        <h1> {{ uiLabels.nextBtnInfo }}</h1>
        <!-- <p id="infoBoxText">SPELET GÅR UT PÅ ATT RITA OCH GISSA! POÄNG FÅR UTIFRÅN KVARVARANDE TID, DEN MED HÖGST POÄNG VINNER!</p> -->
        <button class="infoBoxBtn" id="yesBtn" v-on:click="nextStep()" @click="$router.push('/hostLobbyView/' + lang + '/' + gameID)"> {{ uiLabels.yesBtn }} </button>
        <button class="infoBoxBtn" id="noBtn" v-on:click="closeInfo"> {{ uiLabels.noBtn }} </button>
    
        </div>
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

            socket.emit("createGame", { gameId: this.gameID, words: this.$refs.wordComp.allWords });
        },
        scrollToBottom: function () {
            this.$refs.botDiv.scrollIntoView({ behavior: 'smooth' });
        },

        showInfo: function () {
        this.$refs.infoBackground.style.display = "flex";
        },

        closeInfo: function () {
        this.$refs.infoBackground.style.display = "none";
        },

        showRules: function () {
            this.$refs.rulesBackground.style.display = "flex";
        },

        closeRules: function () {
            this.$refs.rulesBackground.style.display = "none";
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


header{
    margin-right: 1.3em;
    margin-left: 1.3em;
}


#rulesBackground {
  display: none;
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  overflow: auto;
  top: 0;

}


#rulesBox {
  margin-top: auto;
  margin-bottom: auto;
  background-color: white;
  width: 40%;
  height: fit-content;
  padding: 2em;
  border-radius: 20px;
}

h1{
  font-weight: 600;
  margin-bottom: 0.5em;
}

#rulesBox h1{
    font-size: 2em;
}

#rulesBox h2{
  font-weight: 600;
  font-size: 1.5em;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
}

#rulesBoxText {
  font-size: 0.9em;
  text-align: left;
  padding-left: 1.5em;
  padding-right: 1.5em;
  padding-bottom: 1em;
}

#rulesBox span {
  font-size: 2em;
  float: right;
}

#rulesBox span:hover {
  cursor: pointer;
}

#rulesBtn {
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  margin: 1em;
  animation: left 1.5s linear infinite;
  transform-origin: bottom;
  cursor: pointer;
}


@keyframes right {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(10deg);
  }

  50% {
    transform: rotate(0deg);
  }

  75% {
    transform: rotate(-10deg);
  }

  100% {
    transform: rotate(0deg);
  }

}

@keyframes left {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(-10deg);
  }

  50% {
    transform: rotate(0deg);
  }

  75% {
    transform: rotate(10deg);
  }

  100% {
    transform: rotate(0deg);
  }

}


#rulesBtn img {
  width: 100%;
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

/* NEXT BUTTON INFO POPUP STYLING */


#infoBackground {
  display: none;
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  overflow: auto;
}

#infoBox {
  margin-top: 15em;
  background-color: white;
  width: 40%;
  height: fit-content;
  padding: 2em;
  border-radius: 20px;
}

.infoBoxBtn {
    margin: 0.5em;
    margin-bottom: 0em;
}

#infoBox .infoBoxBtn:hover {
  cursor: pointer;
}

#yesBtn {
    background-color: #5b893f;
    color: white;
}

#noBtn {
    background-color: #C00000;
    color: white;
}

 /* #topInfo {
  display: flex;
  justify-content: space-between;
} */

#infoBtn {
  width: 50px;
  margin: 1em;
  animation: info 1.5s linear infinite;
  transform-origin: bottom;
  cursor: pointer;
}

#infoBox h1{
  font-size: 1.5em;
  margin-bottom: 0.5em;
}

/* 
#nextWarningText::after{
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: #555 transparent transparent transparent;
        } */
/* 
#exitButton:hover #nextWarningText {
            visibility: visible;
            opacity: 1;
        }


    #nextWarningText {
        width: 120px;
        background-color: #555;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: -60px;
        opacity: 0;
        transition: opacity 0.3s;
        } */

        
@media only screen and (max-width: 630px){


    header {
        font-size: 3em;
    }

    #rulesBtn {
        /* margin: 0; */
        margin-right: auto;
        margin-top: auto;
    
        top: 1em;
        /* right: 0; */
    }

    #rulesBtn img {
        width: 60%;
    }
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

   
}


@media only screen and (max-width: 949px) {

    #infoBox {
    width: 60%;
    }

#infoBox {
padding: 1em;
padding-top: 2em;
}

#infoBox h1{
font-size: 1.2em;
}

#infoBoxText {
font-size: 0.7em;
padding-left: 1.5em;
padding-right: 1.5em;
padding-bottom: 1em;
}

.infoBoxBtn {
    margin-bottom: 0.5em;
}
/* 
RULES BOX BELOW */


#rulesBox {
  padding: 1em;
  padding-top: 2em;
}

#rulesBox h1{
  font-size: 1.5em;
}

#rulesBox h2{
  font-size: 1em;
}

#rulesBox span {
  font-size: 2em;
  margin-top: -0.3em;
}

#rulesBoxText {
  font-size: 0.7em;
  padding-left: 1.5em;
  padding-right: 1.5em;
  padding-bottom: 1em;
}

#rulesBox {
  width: 60%;
}


}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (max-width: 649px) {

#infoBox h1{
font-size: 1.2em;
}

#rulesBox span {
  font-size: 1.5em;
}

#rulesBox h1{
  font-size: 1.2em;
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
  