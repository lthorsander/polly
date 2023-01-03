<template>
    <div id="container">
      <header>
        <div></div>
        {{uiLabels.scoreBoardTitle}}
      </header>

      <div id="scoreboard"> 
      <label id="placing"> 1 </label> <label id="name"> {{playerInfo.name}} </label> <label id="Score"> {{playerInfo.score}} </label>
      </div>
      <div id="scoreboard"> 
        <label id="placing"> 2 </label> <label id="name"> {{playerInfo.name}} </label> <label id="Score"> {{playerInfo.score}} </label>
      </div>
      <div id="scoreboard"> 
        <label id="placing"> 3 </label> <label id="name"> {{playerInfo.name}} </label> <label id="Score"> {{playerInfo.score}} </label>
      </div>
      
      <button id="exitButton" @click="$router.push('/firstPage')"> {{uiLabels.exitButton}} </button>
      <button id="restartButton"> {{uiLabels.restartButton}} </button>
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
        lang: "en",
        playerInfo: {}
      }
    },
    created: function () {
        socket.on("init", (labels) => {
          this.uiLabels = labels
        })
        socket.emit('revivePlayerInfo')
        socket.on('playerJoined', (data)=>{this.playerInfo=data})
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
    mounted(){
      socket.on('leaderBoard', (score)=>{this.playerInfo.score = score
        console.log('Hämta player score')
        console.log(this.playerInfo.score)})
    }
  }
  </script>
  <style scoped>

    #language img{
      width: 100px;
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

    #scoreboard{
      width: 470px;
      height: 70px;
      margin-left: auto;
      margin-right: auto; 
      background-color: #32C7D1;
      border-radius: 0.5em;
      text-align: middle;
      border: solid rgb(97, 97, 97);
      margin-top: 10px;
    }

    #placing{
      font-size: 4em;
      font-weight: 600;
      color: white;
    }

    #name{
      font-size: 2em;
      font-weight: 600;
      color: white;
    }

    #Score{
      font-size: 4em;
      font-weight: 600;
      color: white;
    }
  
  </style>
  
  <style>
  
  button:hover{
    cursor: pointer;
    opacity: 0.75;
  }
  </style>
  