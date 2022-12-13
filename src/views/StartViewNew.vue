<template>
  <div id="container">
    <header>
      <div></div>
      {{uiLabels.title}}
    </header>
    <div id="language">
      <img :src="uiLabels.changeLanguage" v-on:click="switchLanguage">
    </div>
    <div id="gameBtnArea">
      <button @click="$router.push('/createGameMobile/'+lang)">{{uiLabels.creatGameButton}}</button>
      <button @click="$router.push('/joinGame/'+lang)">{{uiLabels.joinGameButton}}</button>
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
    switchLanguage: function() {
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

html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  #language {
    margin: 1em;
  }
  #language img{
    width: 100px;
    height: 70px;
  }
  #container{
    background-color: #C4E0B2;
    min-height: 100vh;
    min-width: 350px;
    height: fit-content;
  }
  header {
    font-weight: 600;
    font-size: 5em;
    color: white;
    width: 92%;
    margin-left: 4%;
    margin-right: 4%;
    text-align: center;
  }
  header div{
    height: 0.5em;
  }
  /* #gameBtnArea{
      margin-top: 4em;
    } */
    #gameBtnArea button{ 
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

    #gameBtnArea button:hover{
      background-color: black;
    }

  button:hover{
  cursor: pointer;
  opacity: 0.75;
  }

  @media only screen and (max-width: 600px) {
  #container{
    height: 100vh;
  }
  header{
    font-size: 3em;
  }

  #buttonArea{
    width: min-content;
    margin-left: auto;
    margin-right: auto;
  }
  #gameBtnArea button{ 
    font-size: 1.5em;
    width: 10em;
    margin-left: 2em;
    margin-right: 2em;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 601px) {

  
#buttonArea{
  bottom: 2em;
  left: 2em;
  right: 2em;
  position: absolute;
  text-align: center;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between; 
}

}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {

}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {

}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {

}


</style>

