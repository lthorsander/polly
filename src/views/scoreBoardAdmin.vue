<template>
    <div id="container">
      <header>
        <div></div>
        {{uiLabels.scoreBoardTitle}}
      </header>
      <div id="scoreBoard">
        <p id="nameView"> Name 1 </p>
        <p id="score"> 1 </p>
      </div>
      <button id="exitButton" @click="$router.push('/firstPage')"> {{uiLabels.exitButton}} </button>
      <button id="restartButton" @click="$router.push('/lobbyView')"> {{uiLabels.restartButton}} </button>
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
    }
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
  
    #language img{
      width: 100px;
    }
    #container{
      background-color: #C4E0B2;
      min-height: 100vh;
      height: fit-content;
    }
    header {
      font-weight: 600;
      font-size: 5em;
      color: white;
      width: 100%;
    }

    header div{
      height: 0.5em;
    }

    #scoreBoard{
        margin-top: 2em;
        background-color: #32C7D1;
        width: 470px;
        height: 70px;
        border-radius: 0.5em;
        border: solid rgb(85, 85, 85);
        margin-left: auto;
        margin-right: auto;
    }

    #nameView{
    font-size: 2.0em;
    font-weight: 600;
    margin-top: 0.5em;
    margin-left: -10em;
    }

    #exitButton{
    color: white;
    border-radius: 1em;
    margin-top: 1em;
    width: 300px;
    background-color: #C00000;
    font-size: 1.5em;
    font-weight: 600;
    padding: 1em;
    margin: 1em;

    }

    #restartButton{
        color: white;
        border-radius: 1em;
        margin-top: 1em;
        width: 300px;
        background-color: #5b893f;
        font-size: 1.5em;
        font-weight: 600;
        padding: 1em;  
        margin: 1em; 
    }
  
  </style>
  
  <style>
  
  button:hover{
    cursor: pointer;
    opacity: 0.75;
  }
  </style>
  