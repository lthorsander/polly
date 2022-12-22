'use strict';

const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.polls = {};
  this.gameID = null;
  this.playerList = [];
  this.CoordList = [];
  this.wordsList = [];
  this.word = '';
  this.userIDList = [];
}

/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/


Data.prototype.addCoords = function(Coords) {
  //console.log("ADD COORDS"+Coords)
  this.CoordList.push(Coords)
}

Data.prototype.getCoords = function() {
  return this.CoordList
}

Data.prototype.getUILabels = function (lang = "en") {
  const ui = require("./data/labels-" + lang + ".json");
  return ui;
}


Data.prototype.checkID = function(playerInfo){
  let state = false;
  //console.log("DATA CHECKNAME"+playerInfo.name)
  //console.log("PLAYERLIST"+this.playerList)
  console.log(this.gameID)
  console.log(playerInfo.id)
  if(!(this.gameID == null || playerInfo.id == "")){
    //for (let index = 0; index < this.playerList.length; index++) {
      //console.log("FOR-LOOP")
      console.log(this.gameID)
      if(this.gameID == playerInfo.id){
        console.log("TJOHOOOO")
        return state = true
      //}
    }
  }
  return state
}

Data.prototype.checkName = function(playerInfo){
  let state = true;
  //console.log("DATA CHECKNAME"+playerInfo.name)
  //console.log("PLAYERLIST"+this.playerList)
  if(!(this.playerList.length == 0 || playerInfo.name == "")){
    for (let index = 0; index < this.playerList.length; index++) {
      //console.log("FOR-LOOP")
      if(this.playerList[index].name == playerInfo.name){
        //console.log("TJOHOOOO")
        return state = false
      }
      
    }
  }
  return state
}

Data.prototype.getUserIDList = function(){
  return this.userIDList;
}

Data.prototype.addPlayer = function(playerInfo){
  this.playerList.push(playerInfo);
  console.log("IN DATA: "+playerInfo.userID);
  this.userIDList.push(playerInfo.userID);
}

Data.prototype.getPlayerInfo = function () {
  //console.log('Get player info:')
  console.log(this.playerList)
  return this.playerList
}

Data.prototype.sendPlayerInfo = function () {
  //console.log('Send player info:')
  //console.log(this.playerList)
  return this.playerList;
}

Data.prototype.createPoll = function(pollId, lang="en", wordsList) {
  if (typeof this.polls[pollId] === "undefined") {
    let poll = {};
    poll.lang = lang;
    this.wordsList = wordsList;        
    this.polls[pollId] = poll;
    this.gameID = pollId;
    // console.log('createPoll');
    // console.log(wordsList);
    // console.log(this.wordsList);
    // console.log(this.gameID);
  }
  return {pollId: pollId, lang: lang};
}

Data.prototype.getWordsList = function (){
  return this.wordsList;
}

Data.prototype.chooseWord = function (){
    // console.log('LISTAN FÖRST')
    // console.log(this.wordsList)
    let randomIndex = Math.floor(Math.random()*this.wordsList.length);
    console.log("Nuvarande lista: "+JSON.stringify(this.wordsList));
    this.word = this.wordsList[randomIndex]; 
    console.log("Valt ord: "+JSON.stringify(this.word));
    this.wordsList.splice(randomIndex, 1);    
    console.log("Lista efter ordval"+JSON.stringify(this.wordsList));  
    return this.word;
}

Data.prototype.recivePollId = function(){
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

Data.prototype.addQuestion = function(pollId, q) {
  const poll = this.polls[pollId];
  //console.log("question added to", pollId, q);
  if (typeof poll !== 'undefined') {
    poll.questions.push(q);
  }
}

Data.prototype.editQuestion = function(pollId, index, newQuestion) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.questions[index] = newQuestion;
  }
}

Data.prototype.getQuestion = function(pollId, qId=null) {
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

Data.prototype.submitAnswer = function(pollId, answer) {
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

Data.prototype.getAnswers = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      return {q: poll.questions[poll.currentQuestion].q, a: answers};
    }
  }
  return {}
}
module.exports = Data;



