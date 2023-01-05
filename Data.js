'use strict';


const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.games = {};
  this.polls = {};
  this.gameID = null;
  this.playerList = [];
  this.CoordList = [];
  this.wordsList = [];
  this.word = '';
  this.userIDList = [];
  this.playerScore = 0;
}

/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

Data.prototype.score = function (timerCount) {
 // console.log('Data playerScore')
  this.playerScore += timerCount
 // console.log(this.playerScore)
  return this.playerScore
}

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
  console.log("UPDATERAT SCORE: "+this.games[gameID].playerInfo[socketID].score);
}
Data.prototype.addCoords = function (Coords) {
  //console.log("ADD COORDS"+Coords)
  this.CoordList.push(Coords)
}

Data.prototype.getCoords = function () {
  return this.CoordList
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

Data.prototype.sendPlayerInfo = function () {
  //console.log('Send player info:')
  //console.log(this.playerList)
  return this.playerList;
}



Data.prototype.addPlayers = function(info) {
  let idState = false;
  let nameState = false;
  if(info.id in this.games){
    console.log("ID FINNS BLAND GAMES")
    idState = true;
    if(typeof this.games[info.id].playerInfo[info.name] === "undefined"){
    this.games[info.id].playerInfo[info.userID] = {name: info.name, emoji: info.emoji, score: info.score};
    this.games[info.id].scoreUserSortList.push([info.userID, info.score, info.name]);
    this.games[info.id].userIdList.push(info.userID);
    // console.log("KEYS "+Object.keys(this.games[info.id].playerInfo));
    // console.log("VALUES "+JSON.stringify(Object.values(this.games[info.id].playerInfo)));
    console.log("VÄRDET ÄR!!!!!! : "+ JSON.stringify(Object.values(this.games[info.id].playerInfo)).name);
    console.log("LA TILL "+ info.name + " i spelet: "+info.id);
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
      game.playerInfo = {};
      game.userIdList = [];
      game.scoreUserSortList = [];
      this.games[gameId] = game;
    }
}

Data.prototype.createPoll = function (pollId, lang = "en", wordsList) {
  if (typeof this.polls[pollId] === "undefined") {
    let poll = {};
    poll.lang = lang;
    this.wordsList = wordsList;
    this.polls[pollId] = poll;
    this.gameID = pollId;
    // console.log('createPoll');
    // console.log(this.wordsList);
    // console.log(this.gameID);
  }
  return { pollId: pollId, lang: lang };
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

Data.prototype.recivePollId = function () {
  return this.polls
}

// Gamla
// Data.prototype.createPoll = function(pollId, lang="en") {
//   if (typeof this.polls[pollId] === "undefined") {
//     let poll = {};
//     poll.lang = lang;  
//     poll.questions = [];
//     poll.answers = [];
//     poll.currentQuestion = 0;              
//     this.polls[pollId] = poll;
//     console.log("poll created", pollId, poll);
//   }
//   return this.polls[pollId];
// }

Data.prototype.addQuestion = function (pollId, q) {
  const poll = this.polls[pollId];
  //console.log("question added to", pollId, q);
  if (typeof poll !== 'undefined') {
    poll.questions.push(q);
  }
}

Data.prototype.editQuestion = function (pollId, index, newQuestion) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.questions[index] = newQuestion;
  }
}

Data.prototype.getQuestion = function (pollId, qId = null) {
  const poll = this.polls[pollId];
  //console.log("question requested for ", pollId, qId);
  if (typeof poll !== 'undefined') {
    if (qId !== null) {
      poll.currentQuestion = qId;
    }
    return poll.questions[poll.currentQuestion];
  }
  return []
}

Data.prototype.submitAnswer = function (pollId, answer) {
  const poll = this.polls[pollId];
  //console.log("answer submitted for ", pollId, answer);
  if (typeof poll !== 'undefined') {
    let answers = poll.answers[poll.currentQuestion];
    if (typeof answers !== 'object') {
      answers = {};
      answers[answer] = 1;
      poll.answers.push(answers);
    }
    else if (typeof answers[answer] === 'undefined')
      answers[answer] = 1;
    else
      answers[answer] += 1
    console.log("answers looks like ", answers, typeof answers);
  }
}
Data.prototype.getAnswers = function (pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      return { q: poll.questions[poll.currentQuestion].q, a: answers };
    }
  }
  return {}
}
module.exports = Data;



