<template>
  <div id="container" ref="container">
    <div id="topInfo">
      <div id="language">
        <img :src="uiLabels.changeLanguage" v-on:click="switchLanguage">
      </div>
      <div id="disco">
        <img src="../../public/img/discoballBig.svg" alt="Disco" v-on:click="toggleDisco">
      </div>
      <div id="infoBtn">
        <img src="../../public/img/pngfind.com-question-marks-png-435937.png" alt="Info" v-on:click="showInfo">
      </div>
    </div>
    <div id="infoBackground" ref="infoBackground">
      <div id="infoBox" ref="InfoBox">
        <span v-on:click="closeInfo">&times;</span>
        <h1>{{uiLabels.playerInfo}}</h1>
        <p id="infoBoxText"> {{ uiLabels.playerInfoText }}</p>
      </div>
    </div>
    <header ref="header">
      {{ uiLabels.title }}
    </header>
    <div id="gameBtnArea" ref="btnArea">
      <button ref="createBtn" @click="$router.push('/createGame/' + lang)">{{ uiLabels.creatGameButton }}</button>
      <button ref="joinBtn" @click="$router.push('/game/' + lang)">{{ uiLabels.joinGameButton }}</button>
    </div>
    <div ref="emojiDivLeft" id="emojiLeft">
      <div>🦄</div>
      <div>😀</div>
      <div>🥰</div>
      <div>😇</div>
      <div>🐙</div>
      <div>🐳</div>
      <div>🍑</div>
      <div>💜</div>
      <div>😈</div>
      <div>🤠</div>
    </div>
    <div ref="emojiDivRight" id="emojiRight">
      <div>🦄</div>
      <div>😀</div>
      <div>🥰</div>
      <div>😇</div>
      <div>🐙</div>
      <div>🐳</div>
      <div>🍑</div>
      <div>💜</div>
      <div>😈</div>
      <div>🤠</div>
    </div>
  </div>
</template>

<script>
//import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
import wiiSound from '..//..//public/music/wiiMusic.mp3';
import dancingSound from '..//..//public/music/dancingQueen.mp3';
const socket = io();
const wiiAudio = new Audio(wiiSound);
const dancingAudio = new Audio(dancingSound);

export default {
  name: 'StartView',
  components: {
    //ResponsiveNav
  },
  data: function () {
    return {
      uiLabels: {},
      lang: "en",
      discoON: false
    }
  },
  created: function () {
    socket.emit("switchLanguage", this.lang)
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
  methods: {
    switchLanguage: function () {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    },
    showInfo: function () {
      this.$refs.infoBackground.style.display = "flex";
      wiiAudio.play();
    },
    closeInfo: function () {
      this.$refs.infoBackground.style.display = "none";
      wiiAudio.pause();
    },
    toggleDisco: function () {
      this.discoON = !this.discoON;
      let container = this.$refs.container;
      let header = this.$refs.header;
      let createBtn = this.$refs.createBtn;
      let joinBtn = this.$refs.joinBtn;
      let emojiDivLeft = this.$refs.emojiDivLeft;
      let emojiDivRight = this.$refs.emojiDivRight;
      if(this.discoON){
        dancingAudio.play();
        container.classList.add('discoContainer');
        header.classList.add('headerDisco');
        createBtn.classList.add('btnCreate');
        joinBtn.classList.add('btnJoin');
        emojiDivLeft.classList.add('dancingEmojisLeft');
        emojiDivRight.classList.add('dancingEmojisRight');
      }else{
        dancingAudio.pause()
        container.classList.remove('discoContainer');
        header.classList.remove('headerDisco');
        createBtn.classList.remove('btnCreate');
        joinBtn.classList.remove('btnJoin');
        emojiDivLeft.classList.remove('dancingEmojisLeft');
        emojiDivRight.classList.remove('dancingEmojisRight');
      }
    }
  },
}
</script>
<style scoped>

#emojiLeft{
  display: flex;
  font-size: 3em;
  position: absolute;
  left: -60%;
  bottom: 20vh;
}

#emojiRight{
  display: flex;
  font-size: 3em;
  position: absolute;
  right: -60%;
  bottom: 15vh;
}

.dancingEmojisLeft{
  animation: moveEmojisLeft 10s linear infinite;
}

.dancingEmojisRight{
  animation: moveEmojisRight 10s linear infinite;
}

#emojiLeft div, #emojiRight div{
  animation: left 1.5s linear infinite;
  transform-origin: center;
}

@keyframes moveEmojisLeft{
  0% {
  left: -60%;
  }
  100% {
  left: 100%;
  }
}

@keyframes moveEmojisRight{
  0% {
  right: -60%;
  }
  100% {
  right: 100%;
  }
}

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

.discoContainer {
  animation: disco 1.5s linear infinite;
}

.headerDisco{
  animation: left 1.5s linear infinite;
  transform-origin: center;
}

.btnJoin{
  animation: left 2s linear infinite;
  transform-origin: center;
}
.btnCreate{
  animation: right 2s linear infinite;
  transform-origin: center;
}


@keyframes discoSpinLeft {
  0%{
    transform: rotate(360deg);
  }
}

@keyframes discoSpinRight {
  0%{
    transform: rotate(-360deg);
  }
}

@keyframes disco {
  0%{
    background-color: red;
  }

  10%{
    background-color: lightskyblue;
  }

  20%{
    background-color: yellow;
  }

  30%{
    background-color: rgb(238, 0, 255);
  }

  40%{
    background-color: orange;
  }

  50%{
    background-color: rgb(26, 202, 140);
  }

  60%{
    background-color: lime;
  }

  70%{
    background-color: blueviolet;
  }

  80%{
    background-color: cyan;
  }

  90%{
    background-color: azure;
  }

  100%{
    background-color: blue;
  }
}


h1{
  font-weight: 600;
}

#infoBox span {
  font-size: 2em;
  float: right;
}

#infoBox span:hover {
  cursor: pointer;
}

#topInfo {
  display: flex;
  justify-content: space-between;
}

#disco img{
  width: 100%;
}
#disco{
  width: 60px;
  animation: left 1.5s linear infinite;
  transform-origin: top;
  cursor: pointer;
}
#infoBtn {
  width: 50px;
  margin: 1em;
  animation: left 1.5s linear infinite;
  transform-origin: bottom;
  cursor: pointer;
}

#infoBox h1{
  font-size: 2em;
  margin-bottom: 0.5em;
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

#infoBtn img {
  width: 100%;
}


#language {
  margin: 1em;
  animation: left 1.5s linear infinite;
  transform-origin: center;
  cursor: pointer;
}

#language img {
  border-radius: 20px;
  width: 70px;
  height: 50px;
}

#container {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start
}

header {
  justify-self: center;
}

#gameBtnArea {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#gameBtnArea button {
  color: white;
  margin: 1em;
  margin-bottom: 0;
  background-color: #32C7D1;
  font-weight: 600;
  width: 400px;
  border-radius: 1em;
  font-size: 2em;
  padding: 1em;
}

#gameBtnArea button:hover {
  background-color: black;
}

button:hover {
  cursor: pointer;
  opacity: 0.75;
}



@media only screen and (max-width: 600px) {
  #container {
    height: 100vh;
  }

  header {
    font-size: 3em;
  }

  #buttonArea {
    width: min-content;
    margin-left: auto;
    margin-right: auto;
  }

  #gameBtnArea button {
    font-size: 1.5em;
    width: 10em;
    margin-left: 2em;
    margin-right: 2em;
  }
}

@media only screen and (max-width: 849px) {

  #infoBox {
  padding: 1em;
  padding-top: 2em;
}

#infoBox h1{
  font-size: 1.5em;
}

#infoBox span {
  font-size: 2em;
  margin-top: -0.3em;
}

#infoBoxText {
  font-size: 0.7em;
  padding-left: 1.5em;
  padding-right: 1.5em;
  padding-bottom: 1em;
}

}

@media only screen and (max-width: 800px) {

#emojiLeft{
  left: -90%;
}

#emojiRight{
  right: -90%;
}


@keyframes moveEmojisLeft{
  0% {
  left: -90%;
  }
  100% {
  left: 100%;
  }
}

@keyframes moveEmojisRight{
  0% {
  right: -90%;
  }
  100% {
  right: 100%;
  }
}

}

@media only screen and (max-width: 700px) {

#emojiLeft{
  left: -100%;
}

#emojiRight{
  right: -100%;
}


@keyframes moveEmojisLeft{
  0% {
  left: -100%;
  }
  100% {
  left: 100%;
  }
}

@keyframes moveEmojisRight{
  0% {
  right: -100%;
  }
  100% {
  right: 100%;
  }
}

}

@media only screen and (max-width: 600px) {

#emojiLeft{
  left: -105%;
}

#emojiRight{
  right: -105%;
}


@keyframes moveEmojisLeft{
  0% {
  left: -105%;
  }
  100% {
  left: 100%;
  }
}

@keyframes moveEmojisRight{
  0% {
  right: -105%;
  }
  100% {
  right: 100%;
  }
}

}

@media only screen and (max-width: 500px) {

#emojiLeft{
  left: -140%;
}

#emojiRight{
  right: -140%;
}


@keyframes moveEmojisLeft{
  0% {
  left: -140%;
  }
  100% {
  left: 100%;
  }
}

@keyframes moveEmojisRight{
  0% {
  right: -140%;
  }
  100% {
  right: 100%;
  }
}

}

@media only screen and (max-width: 400px) {

#emojiLeft{
  left: -150%;
}

#emojiRight{
  right: -150%;
}


@keyframes moveEmojisLeft{
  0% {
  left: -150%;
  }
  100% {
  left: 100%;
  }
}

@keyframes moveEmojisRight{
  0% {
  right: -150%;
  }
  100% {
  right: 100%;
  }
}

}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (max-width: 649px) {

  #infoBox {
  width: 60%;
}

#infoBox h1{
  font-size: 1.2em;
}

#infoBox span {
  font-size: 1.5em;
}

}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {}



/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 930px) {
  #gameBtnArea {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {}
</style>

