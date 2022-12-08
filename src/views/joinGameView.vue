<template>
  <meta charset="UTF-8">
    <div id="container">
      <header>
        <div></div>
        {{uiLabels.joinGameButton}}
      </header>
      <div id="userInfoField"> 
      <div id="inputTextField"> 
        <input type="text" v-model="gameId" v-bind:placeholder="uiLabels.gameID+'...'" required="required"/> 
        <input type="text" v-model="playerName" v-bind:placeholder="uiLabels.playerName+'...'" required="required"/>
      </div>
      <div id="emojiField"> 
        <div  id="emoji" v-for="emoji in emojis" v-bind:key="emoji.name" v-on:click="chooseEmoji(emoji)">
          <p ref="emojiP" >{{emoji.emoji}}</p>
        </div>
     </div>
      <button id="enterButton" @click="$router.push('/lobbyView')" v-on:click="enterGame(playerName, gameId)">{{uiLabels.enterGameButton}}</button>
     </div>
      <button id="homeButton" @click="$router.go(-1)"> {{uiLabels.homeButton}} </button>
    </div>
</template>
  
  <script>
  //import ResponsiveNav from '@/components/ResponsiveNav.vue';
  import io from 'socket.io-client';
  const socket = io();

  const emojiList = [{name: "happy", emoji: "😀"}, {name:"love", emoji: "🥰"}, {name:"angel",emoji: "😇"}, {name:"unicorn", emoji: "🦄"}, {name:"octopus", emoji: "🐙"}, {name:"whale", emoji: "🐳"},{name:"peach",emoji: "🍑"}, {name:"heart", emoji: "💜"}, {name:"devil", emoji: "😈"},{name:"cowboy", emoji: "🤠"}];
  
  export default {
    name: 'StartView',
    components: {
      //ResponsiveNav
    },
    data: function () {
      return {
        emojis: emojiList,
        userInfo: {id:"", name:"", emoji:"", score:0},
        uiLabels: {},
        lang: "en",

      }
    },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
      socket.on("init", (labels) => {
        this.uiLabels = labels
      })
    },
    methods: {
      navigateTo: function (nav) {
      this.$router.go({
        path: nav
      })
    },
    chooseEmoji: function(theEmoji){
      this.userInfo.emoji = theEmoji.emoji
      console.log(this.userInfo)
      let emojiP = this.$refs.emojiP;
      for (let index = 0; index < emojiP.length; index++) {
        emojiP[index].style.backgroundColor = null
        if (emojiP[index].innerHTML == theEmoji.emoji ){
          emojiP[index].style.backgroundColor = "#5b893f"
          emojiP[index].style.borderRadius = "100%"
        }
      }
    },
    enterGame: function(playerName, gameId){
      this.userInfo.name = playerName
      this.userInfo.id = gameId
      console.log('playerName' + playerName)
      console.log('playerName' + gameId)
      console.log(this.userInfo)
      socket.emit("userInfo", this.userInfo);
    },
  }
}
</script>
<style scoped>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}


#container {
  background-color: #C4E0B2;
  min-height: 100vh;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-areas: 
  ". . . header header header . . ."
  ". . . . inputField . . . ."
  ". . . . . . . . ."
  ". homeButton homeButton . . . . . ."
  ". . . . . . . . ."
  ;

}

header {
  font-weight: 600;
  font-size: 5em;
  color: white;
  width: 100%;
  grid-area:header;
}

#userInfoField{
grid-area:inputField;
}

header div {
  height: 0.5em;
}

#enterButton {
  color: white;
  border-radius: 1em;
  margin-top: 1em;
  width: 300px;
  background-color: #32C7D1;
  font-size: 1.5em;
  font-weight: 600;
  padding: 1em;
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

#inputTextField {
  margin-top: 0em;
  margin-left: auto;
  margin-right: auto;

}

#emojiField{
  margin-left: auto;
  margin-right: auto;
  display: flex;
  width: fit-content;
}

#emoji{
  font-size: 3em;
  margin: 0.1em;
  text-shadow: 2px 2px 4px #575757;
  }

#emoji:hover{
  border-radius: 100%;
  background-color: #9bba88;
  cursor: pointer;
  border: black;
}

#homeButton {
  color: white;
  border-radius: 1em;
  background-color: #5b893f;
  font-size: 1.5em;
  font-weight: 600;
  grid-area:homeButton;
  margin-left:-3em;
  width: 9em;
}

</style>
  