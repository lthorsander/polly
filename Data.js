'use strict';

const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.polls = {};
  this.playerList = []
}

/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

Data.prototype.getUILabels = function (lang = "en") {
  const ui = require("./data/labels-" + lang + ".json");
  return ui;
}

Data.prototype.checkName = function(playerInfo){
  let state = true;
  console.log("DATA CHECKNAME"+playerInfo.name)
  console.log("PLAYERLIST"+this.playerList)
  if(!(this.playerList.length == 0)){
    for (let index = 0; index < this.playerList.length; index++) {
      console.log("FOR-LOOP")
      if(this.playerList[index].name == playerInfo.name){
        console.log("TJOHOOOO")
        return state = false
      }
      
    }
  }else{
    return state;
  }
  
  return state;
}

Data.prototype.addPlayer = function(playerInfo){
  this.playerList.push(playerInfo);
}

Data.prototype.getPlayerInfo = function () {
  console.log('Get player info:')
  console.log(this.playerList)
  return this.playerList
}

Data.prototype.sendPlayerInfo = function () {
  console.log('Send player info:')
  console.log(this.playerList)
  return this.playerList;
}

Data.prototype.createPoll = function(pollId, lang="en") {
  if (typeof this.polls[pollId] === "undefined") {
    let poll = {};
    poll.lang = lang;  
    poll.questions = [];
    poll.answers = [];
    poll.currentQuestion = 0;              
    this.polls[pollId] = poll;
    console.log("poll created", pollId, poll);
  }
  return {pollId: pollId, lang: lang};
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
  console.log("question added to", pollId, q);
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
  console.log("question requested for ", pollId, qId);
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
  console.log("answer submitted for ", pollId, answer);
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



