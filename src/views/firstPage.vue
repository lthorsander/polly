<template>
  <div id="container">
    <div id="language">
      <img :src="uiLabels.changeLanguage" v-on:click="switchLanguage">
    </div>
    <header>
      {{ uiLabels.title }}
    </header>
    <div id="gameBtnArea">
      <button @click="$router.push('/createGame/' + lang)">{{ uiLabels.creatGameButton }}</button>
      <button @click="$router.push('/game/')">{{ uiLabels.joinGameButton }}</button>
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
    }
  },
}
</script>
<style scoped>

#language {
  margin: 1em;
  align-self: flex-start;
}

#language img {
  border-radius: 20px;
  width: 70px;
  height: 50px;
}

#container {
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

