<template>
  <div id="container">
    <div id="topInfo">
      <div id="language">
        <img :src="uiLabels.changeLanguage" v-on:click="switchLanguage">
      </div>
      <div id="infoBtn">
        <img src="../../public/img/pngfind.com-question-marks-png-435937.png" alt="Info" v-on:click="showInfo">
      </div>
    </div>
    <div id="infoBackground" ref="infoBackground">
      <div id="infoBox" ref="InfoBox">
        <span v-on:click="closeInfo">&times;</span>
        <h1>Spelinformation</h1>
        <p>Spelet går ut på att rita och gissa! Poäng fås utifrån kvarvarande tid, den med högst poäng vinner!</p>
      </div>
    </div>
    <header>
      {{ uiLabels.title }}
    </header>
    <div id="gameBtnArea">
      <button @click="$router.push('/createGame/' + lang)">{{ uiLabels.creatGameButton }}</button>
      <button @click="$router.push('/game/' + lang)">{{ uiLabels.joinGameButton }}</button>
    </div>
  </div>
</template>

<script>
//import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'StartView',
  components: {
    //ResponsiveNav
  },
  data: function () {
    return {
      uiLabels: {},
      lang: "en"
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
    },
    closeInfo: function () {
      this.$refs.infoBackground.style.display = "none";
    }
  },
}
</script>
<style scoped>
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
  font-family: cursive;
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

#infoBtn {
  width: 50px;
  margin: 1em;
  animation: info 1.5s linear infinite;
  transform-origin: bottom;
  cursor: pointer;
}

#infoBox h1{
  font-size: 2em;
  margin-bottom: 0.5em;
}

@keyframes info {
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
}

#language img {
  border-radius: 20px;
  width: 70px;
  height: 50px;
}

#container {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start
}

header {
  justify-self: center;
  margin-top: 1.5em;
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

@media only screen and (min-width: 301px) {}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 601px) {}

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

