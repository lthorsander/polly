<template>
    <div id="container">
      <header>
        <div></div>
        ENTER GAME ID
      </header>
      <div id="inputTextField"> 
        <input type="number" placeholder="GAME ID..."/> 
        <input type="text" placeholder="YOUR NAME..."/>
        <input type="text" placeholder="YOUR Emoji..."/>
      </div>
      <button id="enterButton">ENTER GAME</button>
    </div>
  </template>
  
  <script>
  //import ResponsiveNav from '@/components/ResponsiveNav.vue';
  //import io from 'socket.io-client';
  //const socket = io();
  
  export default {
    name: 'StartView',
    components: {
      //ResponsiveNav
    },
    data: function () {
      return {
      }
    },
    methods: {
      navigateTo: function (nav) {
      this.$router.go({
          path: nav
      })
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

    header {
      font-weight: 600;
      font-size: 3em;
      color: white;
      width: 100%;
    }
    header div{
      height: 1em;
    }
    #enterButton{ 
      color: white;
      border-radius: 1em;
      margin: 2em;
      background-color: #32C7D1;
      font-size: 1.5em;
      font-weight: 600;
      width: 300px;
      padding: 2em;
    }

    input {
    padding-left: 1em;
    padding-right: 1em;
    width: 430px;
    height: 70px;
    border-radius: 0.5em;
    font-size: 2em;
    font-weight: 600;
    margin: 0.3em;
}  

#inputTextField{
  margin-top:20px;
  width: 500px;
  margin-left: auto;
  margin-right: auto;

}
 
  </style>
  