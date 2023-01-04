<template>
    <div id="container">
      <header>
        <div></div>
        {{uiLabels.resultBoardTitle}}
      </header>
      <div id="scoreboard" v-if="scoreBoardInfo[0]!=null"> 
      <label class="placing" id="placingOne"> 1 </label> <Transition name="fade"><label class="name" id="winner" v-if="showOne"> {{scoreBoardInfo[0].name}} </label></Transition> <Transition name="fade"><label id="Score" v-if="showOne"> {{scoreBoardInfo[0].score}} </label></Transition>
      </div>
      <div id="scoreboard" v-if="scoreBoardInfo[1]!=null"> 
        <label class="placing" id="placingTwo"> 2 </label> <Transition name="fade"><label class="name" v-if="showTwo"> {{scoreBoardInfo[1].name}} </label></Transition> <Transition name="fade"><label id="Score" v-if="showTwo"> {{scoreBoardInfo[1].score}} </label></Transition>
      </div>
      <div id="scoreboard" v-if="scoreBoardInfo[2]!=null"> 
        <label class="placing" id="placingThree"> 3 </label> <Transition name="fade"><label class="name" v-if="showThree"> {{scoreBoardInfo[2].name}} </label></Transition> <Transition name="fade"><label id="Score" v-if="showThree"> {{scoreBoardInfo[2].score}} </label></Transition>
      </div>
    </div>
  </template>
  
  <script>
  //import ResponsiveNav from '@/components/ResponsiveNav.vue';
  import io from 'socket.io-client';
  const socket = io();
  
  export default {
    name: 'scoreComp',
    props: ['gameID', 'uiLabels'],
    components: {
      //ResponsiveNav
    },
    data() {
      return {
        playerInfo: {},
        scoreBoardInfo: [],
        showOne: false,
        showTwo: false,
        showThree: false,
        showPlayersCount: 30
      }
    },
    created: function () {
        socket.emit('revivePlayerInfo')
        socket.on('playerJoined', (data)=>{this.playerInfo=data})
        
        socket.emit('getScoreBoard');
        socket.on('scoreBoard', (scoreInfo) => {
            console.log(scoreInfo);
            this.scoreBoardInfo = scoreInfo;
        })
      },
    methods: {
    },
    watch: {

        showPlayersCount: {
    handler(value) {
        if (value > 0) {
            setTimeout(() => {
                this.showPlayersCount--;
                if(this.showPlayersCount ==29){
                    this.showThree = true
                } else if (this.showPlayersCount ==28){
                    this.showTwo = true
                } else if (this.showPlayersCount == 27) {
                    this.showOne = true
                }
            }, 1000);
        }

    },
    immediate: true
}

}
}
  </script>
  <style scoped>

  /* we will explain what these classes do next! */
.fade-enter-active{
    transition: opacity 0.5s ease;
}
.fade-leave-active {
    transition: opacity 0.5s ease;
}


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

    .placing{
      font-size: 4em;
      font-weight: 600;
      color: white;
      margin-left: 0em;
    }

    #placingOne{
        color: gold;
    }

    #placingTwo{
        color: silver;
    }

    #placingThree{
        color: goldenrod;
    }

    .name{
      font-size: 4em;
      font-weight: 600;
      color: white;
    }

    #winner{
        font-size: 4em;
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
  