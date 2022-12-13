<template>
  <meta charset="UTF-8">
  <div id="container">
    <header>
      <div></div>
      {{ uiLabels.joinGameButton }}
    </header>
    <div id="userInfoField">
      <div id="inputTextField">
        <input id="idInput" type="text" v-model="gameId" v-bind:placeholder="uiLabels.gameID + '...'"
          required="required" />
        <input id="pName" type="text" v-model="playerName" v-bind:placeholder="uiLabels.playerName + '...'"
          required="required" />
      </div>
      <div id="scrollStyle"> 
        <p id="arrow"> ◀︎ </p>
      <div id="emojiField">
        <div id="emoji" v-for="emoji in emojis" v-bind:key="emoji.name"
          v-on:click="chooseEmoji(emoji, playerName, gameId)">
          <p ref="emojiP">{{ emoji.emoji }}</p>
        </div>
      </div>
      <p id="arrow"> ▶︎ </p>
    </div>
      
    </div>
    <div id="buttonArea">
      <button id="enterButton"
        v-on:click="enterGame(playerName, gameId, this.lang)">{{ uiLabels.enterGameButton }}</button>
      <button id="homeButton" @click="$router.go(-1)"> {{ uiLabels.homeButton }} </button>
    </div>
  </div>
</template>
  
<script>
//import ResponsiveNav from '@/components/ResponsiveNav.vue';
import router from '@/router';
import io from 'socket.io-client';
const socket = io();

const emojiList = [{ name: "happy", emoji: "😀" }, { name: "love", emoji: "🥰" }, { name: "angel", emoji: "😇" }, { name: "unicorn", emoji: "🦄" }, { name: "octopus", emoji: "🐙" }, { name: "whale", emoji: "🐳" }, { name: "peach", emoji: "🍑" }, { name: "heart", emoji: "💜" }, { name: "devil", emoji: "😈" }, { name: "cowboy", emoji: "🤠" }];

export default {
  name: 'StartView',
  components: {
    //ResponsiveNav
  },
  data: function () {
    return {
      emojis: emojiList,
      userInfo: { id: "", name: "", emoji: null, score: 0, lang: 'en' },
      uiLabels: {},
      lang: "en",
      nameState: false,
      IDState: false
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
    chooseEmoji: function (theEmoji) {
      this.userInfo.emoji = theEmoji.emoji
      console.log(this.userInfo)
      let emojiP = this.$refs.emojiP;
      for (let index = 0; index < emojiP.length; index++) {
        emojiP[index].style.backgroundColor = null
        if (emojiP[index].innerHTML == theEmoji.emoji) {
          emojiP[index].style.backgroundColor = "#5b893f"
          emojiP[index].style.borderRadius = "100%"
        }
      }
    },
    enterGame: function (playerName, gameId, lang) {
      let pNameInput = document.getElementById('pName');
      let pGameIDInput = document.getElementById('idInput')
      this.userInfo.name = playerName
      this.userInfo.id = gameId
      this.userInfo.lang = lang

      let emoji = this.userInfo.emoji
      console.log(this.userInfo.emoji)
      if(!(emoji == null)){
      socket.emit("userInfo", this.userInfo)
      socket.on("CheckName", function (nameState, IDState) {
        console.log(emoji)
        if(nameState && IDState){
                router.push('/lobbyView/'+lang+'/'+gameId)
            }
      if (!nameState) {
        pNameInput.style.backgroundColor = "#ff5e5e";
        console.log("NAMN FINNS REDAN!!")
      }
      if (!IDState) {
        pGameIDInput.style.backgroundColor = "#ff5e5e";
        console.log("ID FINNS REDAN!!")
      }
      });
    } else{
      let emoji = document.getElementById('emojiField');
      console.log(emoji)   
      emoji.style.background = "#ff5e5e"
      emoji.style.borderRadius = "0%"
      emoji.style.border = "solid #575757"

    }
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
  min-width: 350px;
  height: fit-content;

}

header {
  font-weight: 600;
  font-size: 5em;
  color: white;
  width: 100%;
}

header div {
  height: 0.5em;
}

#enterButton {
  color: white;
  border-radius: 1em;
  margin-top: 1em;
  width: 10em;
  background-color: #32C7D1;
  font-size: 1.5em;
  font-weight: 600;
  padding: 0.5em;
}

input {
  padding-left: 1em;
  padding-right: 1em;
  width: 7em;
  height: 70px;
  border-radius: 0.5em;
  font-size: 2em;
  font-weight: 600;
  margin: 0.3em;
}

#inputTextField {
  width: min-content;
  display: inline-table;
  margin-top: 2em;
  margin-left: auto;
  margin-right: auto;

}

#emojiField {
  margin-left: auto;
  margin-right: auto;
  width:fit-content;
  display: flex;
}

#emoji {
  font-size: 3em;
  margin: 0.1em;
  text-shadow: 2px 2px 4px #575757;
}

#arrow{
  font-size: 1.5em;
  padding-top: 0.7em;
  margin: 0.1em;
  color: #575757;
  display: none;

}

#emoji:hover {
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
  width: 10em;
  padding: 0.5em;
  margin-top: 1em;
}

@media only screen and (max-width: 600px) {
  #container {
    height: 100vh;
  }

  header {
    font-size: 3em;
  }

  #emojiField {
    overflow: auto;
    width: 19em;

  }
  #arrow{
    display: flex;
  }

  #scrollStyle{
    display:flex;
    width: fit-content;
    margin-left:auto;
    margin-right:auto;
  }

  #buttonArea {
    width: min-content;
    margin-left: auto;
    margin-right: auto;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 601px) {
  input {
    width: 12em;
  }

  #buttonArea {
    bottom: 2em;
    left: 2em;
    right: 2em;
    position: absolute;
    text-align: center;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  #homeButton {
    width: 10em;
  }

}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {}
</style>
  