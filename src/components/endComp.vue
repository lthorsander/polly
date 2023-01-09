<template>
    <div id="container">
    <header id="mainTitle">
      <div></div>
      <h1 class="title" id="winnerPresentation"> {{ uiLabels.theWinnerIs}} {{ word }} </h1>
    </header>
    <div id="leaderBoard">
      <div id="scoreboard" v-if="scoreBoardInfo[0] != null">
        <label id="placing"> 1 </label> <label id="name"> {{ scoreBoardInfo[0][2] }} </label> <label id="Score">
          {{ scoreBoardInfo[0][1] + "p"}} </label>
      </div>
      <div id="scoreboard" v-if="scoreBoardInfo[1] != null">
        <label id="placing"> 2 </label> <label id="name"> {{ scoreBoardInfo[1][2] }} </label> <label id="Score">
          {{ scoreBoardInfo[1][1] + "p"}} </label>
      </div>
      <div id="scoreboard" v-if="scoreBoardInfo[2] != null">
        <label id="placing"> 3 </label> <label id="name"> {{ scoreBoardInfo[2][2] }} </label> <label id="Score">
          {{ scoreBoardInfo[2][1] + "p"}} </label>
      </div>
    </div>
  <div id="buttonDiv">
      <button id="exitButton" @click="$router.push('/')"> {{ uiLabels.exitButton }} </button>
      <!-- <button id="restartButton"> {{ uiLabels.restartButton }} </button> -->
    </div>
  </div>
</template>

<script>
import dancingSound from '..//..//public/music/dancingQueen.mp3';
const dancingAudio = new Audio(dancingSound); 
export default {
    name: 'endComp',
    props: ['uiLabels', 'gameSocket', 'gameID', 'gameEnded'],
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
  
      this.gameSocket.emit('getScoreBoard', this.gameID);
      this.gameSocket.on('scoreBoard', (scoreInfo) => {
        dancingAudio.play();
        console.log(scoreInfo);
        this.scoreBoardInfo = scoreInfo;
      })
    },
    methods: {}
  }
  </script>
  <style scoped>
  #language img {
    width: 100px;
  }
  #container{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: disco 1.5s linear infinite;

  }
  @keyframes moveEmojisLeft{
  0% {
  left: -102%;
  }
  100% {
  left: 0%;
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
  
  header {
    font-weight: 600;
    font-size: 4em;
    color: white;
    width: 100%;
  }
  
  header div {
    height: 0.5em;
  }
  
  #exitButton {
    width: 8em;
    background-color: #C00000;
    float: left;
    margin: 1em;
  }
/*   
  #restartButton {
    color: white;
    width: 8em;
    background-color: #5b893f;
    float: right;
    margin: 1em;
  } */
  
  #scoreboard {
    width: 470px;
    height: 70px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
    background-color: #32C7D1;
    border-radius: 0.5em;
    border: solid rgb(97, 97, 97);
    margin-top: 10px;
  }

  #placing, #name, #Score {
  font-size: 2em;
  font-weight: 600;
  color: white;
  align-self: center;
}
  
  #placing{
    margin-left: 0.2em;
  }
  
  #Score{
    margin-right: 0.2em;
  }
  
  
  @media only screen and (max-width: 600px) {
  
  }
  
  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (max-width: 640px) {
    #buttonDiv{
      display: flex;
      flex-direction: column;
      margin-left: auto;
      margin-right: auto;
      height: fit-content;
    }
  
    #exitButton{
      margin-bottom: 2em;
    }
  
    /* #restartButton {
      margin: 0.3em 0em 1em 0em;
    } */
  
    #scoreboard {
      width: 360px;
      height: 70px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-left: auto;
      margin-right: auto;
      background-color: #32C7D1;
      border-radius: 0.5em;
      border: solid rgb(97, 97, 97);
  }
  
  #placing, #name, #Score {
    font-size: 2em;
    font-weight: 600;
    color: white;
    align-self: center;
  }
  
  #placing{
    float: left;
  }
  
  }
  
  @media only screen and (max-width: 800px) {
    header{
      font-size: 3em;
    }
  }
  
  @media only screen and (max-width: 630px) {
    header{
      font-size: 2.5em;
    }
  }
  
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {}
  </style>
  
  <style>
  button:hover {
    cursor: pointer;
    opacity: 0.75;
  }
  </style>