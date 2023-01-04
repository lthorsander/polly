<template>
    <div id="container">
      <header>
        <div></div>
        {{uiLabels.scoreBoardTitle}}
      </header>

      <div id="scoreboard" v-if="scoreBoardInfo[0]!=null"> 
      <label id="placing" > 1 </label> <label id="name"> {{scoreBoardInfo[0][2]}} </label> <label id="Score"> {{scoreBoardInfo[0][1]}} </label>
      </div>
      <div id="scoreboard" v-if="scoreBoardInfo[1]!=null"> 
        <label id="placing"> 2 </label> <label id="name"> {{scoreBoardInfo[1][2]}} </label> <label id="Score"> {{scoreBoardInfo[1][1]}} </label>
      </div>
      <div id="scoreboard" v-if="scoreBoardInfo[2]!=null"> 
        <label id="placing"> 3 </label> <label id="name"> {{scoreBoardInfo[2][2]}} </label> <label id="Score"> {{scoreBoardInfo[2][1]}} </label>
      </div>
      
      <button id="exitButton" @click="$router.push('/')"> {{uiLabels.exitButton}} </button>
      <button id="restartButton"> {{uiLabels.restartButton}} </button>
    </div>
  </template>
  
  <script>
  //import ResponsiveNav from '@/components/ResponsiveNav.vue';
  export default {
    name: 'scoreComp',
    props: ['uiLabels','gameSocket', 'gameID'],
    components: {
      //ResponsiveNav
    },
    data() {
      return {
        playerInfo: {},
        scoreBoardInfo: []
      }
    },
    created: function () {
        this.gameSocket.emit('revivePlayerInfo')
        this.gameSocket.on('playerJoined', (data)=>{this.playerInfo=data})
        
        this.gameSocket.emit('getScoreBoard', this.gameID);
        this.gameSocket.on('scoreBoard', (scoreInfo) => {
            console.log(scoreInfo);
            this.scoreBoardInfo = scoreInfo;
        })
      },
    methods: {
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
  