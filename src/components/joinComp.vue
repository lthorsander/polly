<template>
  <div id="container">
    <header>
      <div></div>
      {{ uiLabels.joinGameButton }}
    </header>
    <div id="userInfoField">
      <div id="inputTextField">
        <input id="idInput" type="text" v-on:click="resetColorID" v-model="gameId"
          v-bind:placeholder="uiLabels.gameID + '...'" required="required" />
        <input id="pName" type="text" v-on:click="resetColorName" v-model="playerName"
          v-bind:placeholder="uiLabels.playerName + '...'" required="required" />
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
      <button id="enterButton" @click="enterGame(playerName, gameId, this.lang)">{{
        uiLabels.enterGameButton
      }}</button>
      <button id="homeButton" @click="$router.go(-1)"> {{ uiLabels.homeButton }} </button>
    </div>

    <div id="infoBackground" ref="infoBackground">
      <div id="infoBox" ref="InfoBox">
        <span v-on:click="closeInfo">&times;</span>
        <h1>{{ uiLabels.chooseEmoji }}</h1>
        <p> {{ uiLabels.chooseEmojiText }} </p>
      </div>
    </div>
  </div>
</template>

<script>
const emojiList = [{ name: "happy", emoji: "😀" }, { name: "love", emoji: "🥰" }, { name: "angel", emoji: "😇" }, { name: "unicorn", emoji: "🦄" }, { name: "octopus", emoji: "🐙" }, { name: "whale", emoji: "🐳" }, { name: "peach", emoji: "🍑" }, { name: "heart", emoji: "💜" }, { name: "devil", emoji: "😈" }, { name: "cowboy", emoji: "🤠" }];

export default {
  name: "joinComp",
  props: ['socketID', 'lobbyCON', 'uiLabels', 'gameSocket'],
  data() {
    return {
      emojis: emojiList,
      userInfo: { userID: null, id: "", name: "", emoji: null, score: 0, lang: 'en' },
      nameState: false,
      IDState: false
    };
  },
  created: function () {
    //this.lang = this.$route.params.lang;

  },
  methods: {
    chooseEmoji: function (theEmoji) {
      this.userInfo.emoji = theEmoji.emoji;
      let emojiP = this.$refs.emojiP;
      for (let index = 0; index < emojiP.length; index++) {
        emojiP[index].style.backgroundColor = null
        if (emojiP[index].innerHTML == theEmoji.emoji) {
          emojiP[index].style.backgroundColor = "#5b893f"
          emojiP[index].style.borderRadius = "100%"
        }
      }
    },

    showInfo: function () {
      this.$refs.infoBackground.style.display = "flex";
    },
    closeInfo: function () {
      this.$refs.infoBackground.style.display = "none";
    },

    enterGame: function (playerName, gameId, lang) {
      this.userInfo.name = playerName
      this.userInfo.id = gameId
      this.userInfo.lang = lang

      let emoji = this.userInfo.emoji
      console.log(this.userInfo)
      if (emoji == null) {
        this.showInfo();
      } else {
        this.$emit('choosenEmoji', emoji)
        this.gameSocket.emit("userInfo", this.userInfo)
        this.$emit('updateGameID', this.userInfo.id);
        this.gameSocket.on("CheckName", (state) => {
          console.log("EMITTAR");
          this.nameState = state[1];
          this.IDState = state[0];
          let pNameInput = document.getElementById('pName');
          let pGameIDInput = document.getElementById('idInput')
          console.log(this.IDState);
          if (this.nameState && this.IDState) {
            this.lobbyCON();
            console.log("FUNKAR")
          }

          if (!this.IDState) {
            //this.alertPop("ID FINNS REDAN")
            pGameIDInput.style.backgroundColor = "#ff5e5e";
            console.log("ID FINNS REDAN!!")
          }
          else if (!this.nameState) {
            pNameInput.style.backgroundColor = "#ff5e5e";
            console.log("NAMN FINNS REDAN!!")
            //this.alertPop("NAMN FINNS REDAN")
          }
        });
      }
    },
    alertPop(msg) {
      let alertDiv = document.createElement('div');
      let containerDIV = document.getElementById('container')
      //containerDIV.style.backgroundColor = "black";
      containerDIV.style.filter = "brightness(65%)";
      alertDiv.innerHTML = msg;
      alertDiv.style.width = "100px";
      alertDiv.style.height = "100px";
      alertDiv.style.borderRadius = "10%";
      alertDiv.style.position = "absolute";
      alertDiv.style.backgroundColor = "#ff5e5e";
      alertDiv.style.left = "0";
      alertDiv.style.right = "0";
      alertDiv.style.top = "0";
      alertDiv.style.bottom = "0";
      alertDiv.style.margin = "auto";

      document.body.appendChild(alertDiv);
    },
    resetColorName() {
      let pNameInput = document.getElementById('pName');
      pNameInput.style.backgroundColor = "white";

    },
    resetColorID() {
      let pGameIDInput = document.getElementById('idInput')
      pGameIDInput.style.backgroundColor = "white";

    }
  }
}
</script>
<style scoped>
#container {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start
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
  margin-top: 1em;
  width: 8em;
  background-color: #32C7D1;
}

#homeButton {
  background-color: #5b893f;
  width: 8em;
  margin-top: 1em;
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
  width: fit-content;
  display: flex;
}

#emoji {
  font-size: 3em;
  margin: 0.1em;
  text-shadow: 2px 2px 4px #575757;
}

#infoBackground {
  display: none;
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  overflow: auto;
}

#infoBox {
  margin-top: 15em;
  background-color: white;
  width: 40%;
  height: fit-content;
  padding: 2em;
  border-radius: 20px;
}

#infoBox span {
  font-size: 2em;
  float: right;
}

#infoBox span:hover {
  cursor: pointer;
}

#infoBox h1 {
  font-weight: 600;
  font-size: 2em;
  margin-bottom: 0.5em;
}

#arrow {
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

  #arrow {
    display: flex;
  }

  #scrollStyle {
    display: flex;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
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

}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {}
</style>
