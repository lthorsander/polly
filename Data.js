'use strict';


const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.games = {};
}

/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/


Data.prototype.getScoreBoard = function (gameID) {
  console.log("GET SCORE BOARD GAMEID: "+gameID)
  let theList = this.games[gameID].scoreUserSortList;

  var i, j;
  let n = theList.length
  for (i = 0; i < n - 1; i++) {
    for (j = 0; j < n - i - 1; j++) {
      if (theList[j][1] < theList[j + 1][1]) {
        var temp = theList[j];
        theList[j] = theList[j + 1];
        theList[j + 1] = temp;
      }
    }
  }
  return theList;
}

Data.prototype.updateScore = function (time, gameID, socketID) {
  let scoreList = this.games[gameID].scoreUserSortList;

  for (let index = 0; index < scoreList.length; index++) {
    console.log(scoreList[index][0]+ " : "+scoreList[index][1])
    if(scoreList[index].includes(socketID)){
      console.log("NU JÄVLARR")
      scoreList[index][1] = scoreList[index][1] + time;
    }
  }
  //console.log("UPDATERAT SCORE: "+this.games[gameID].playerInfo[socketID].score);
}

Data.prototype.getUILabels = function (lang = "en") {
  const ui = require("./data/labels-" + lang + ".json");
  return ui;
}

Data.prototype.getUserIDList = function (id) {
  return this.games[id].userIdList;
}


Data.prototype.getPlayerInfo = function (gameID) {

  console.log("JAG ÄR ANROPAD!! "+gameID);
  let playerList = [];
  let playerKeys = Object.keys(this.games[gameID].playerInfo);
            for (let index = 0; index < playerKeys.length; index++) {
                let nameAndEmoji = this.games[gameID].playerInfo[playerKeys[index]].name + " " + this.games[gameID].playerInfo[playerKeys[index]].emoji;
                playerList.push(nameAndEmoji);
            }

  return playerList;
}


Data.prototype.addPlayers = function(info) {
  let idState = false;
  let nameState = false;
  if(info.id in this.games){
    console.log("ID FINNS BLAND GAMES")
    idState = true;
    if(typeof this.games[info.id].playerInfo[info.userID] === "undefined" && !(this.games[info.id].playerNameList.includes(info.name)) && !(typeof info.name === "undefined"     )){
      //console.log("SPELARNAMN: "+ info.name + ". Tillhörande socketID: "+ )
    this.games[info.id].playerInfo[info.userID] = {name: info.name, emoji: info.emoji, score: info.score};
    this.games[info.id].playerNameList.push(info.name);
    this.games[info.id].scoreUserSortList.push([info.userID, info.score, info.name]);
    this.games[info.id].userIdList.push(info.userID);
    // console.log("KEYS "+Object.keys(this.games[info.id].playerInfo));
    // console.log("VALUES "+JSON.stringify(Object.values(this.games[info.id].playerInfo)));
    //console.log("LA TILL "+ info.name + " i spelet: "+info.id);
    nameState = true;
    return [idState, nameState];
    } else{
      console.log("NAMN REDAN UPPTAGET I SPEL: "+info.id);
    }
  }else{
    console.log("ID FINNS INTE")
  }
  return [idState, nameState];
}
Data.prototype.createGame = function(gameId, wordsList) {
    if(typeof this.games[gameId] === "undefined") {
      let game = {};
      game.words = wordsList;
      game.playerNameList = [];
      game.playerInfo = {};
      game.userIdList = [];
      game.scoreUserSortList = [];
      this.games[gameId] = game;
    }
}

Data.prototype.getWordsList = function (id) {
  return this.games[id].words;
}

Data.prototype.chooseWord = function (id) {
  // console.log('LISTAN FÖRST')
  // console.log(this.wordsList)
  let randomIndex = Math.floor(Math.random() * this.games[id].words.length);
  //console.log("Nuvarande lista: " + JSON.stringify(this.wordsList));
  let word = this.games[id].words[randomIndex];
  //console.log("Valt ord: " + JSON.stringify(this.word));
  this.games[id].words.splice(randomIndex, 1);
  //console.log("Lista efter ordval" + JSON.stringify(this.wordsList));
  return word;
}




module.exports = Data;



