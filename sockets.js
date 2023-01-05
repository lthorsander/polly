
function sockets(io, socket, data) {

  socket.emit('init', data.getUILabels());

  //socket.emit('GetCoords', data.getCoords())



  socket.on("playerScore", function(timerCount){
    //console.log('playerScore')
    io.emit("leaderBoard", data.score(timerCount))
  })

  socket.on("updateScore", function(time, gameID){
  
    data.updateScore(time, gameID, socket.id);
  })

  socket.on('getScoreBoard', function(gameID){
    io.to(gameID).emit('scoreBoard', data.getScoreBoard(gameID));
  })

  socket.on("sendEmoji", function(emoji){
    //console.log('sendEmoji')
    //console.log(emoji)
    io.emit("reciveEmoji", emoji)
  })

  socket.on("hostJoin", function(id){
    socket.join(id);
  })

  socket.on("playerScore", function(timerCount){
    //console.log('playerScore')
    io.emit("leaderBoard", data.score(timerCount))
  })

  // socket.on("selectWord", function () {
  //   io.emit("recivedWord", data.chooseWord());
  // })

  socket.on("getWord", function () {
    io.emit("theWord", data.reciveWord());
  })

  socket.on("startGame", function (id) {
    //console.log("SKICKAR TILL "+id)
    //io.to(id).emit("testSend", id);
    gameMechanics(id);
  })

  async function gameMechanics(id) {
    //console.log("HEJSAN")
    let userIDList = data.getUserIDList(id);
    let wordlistLength= data.getWordsList(id).length;
    let gameCounter = wordlistLength-1;
    let userIndex = 0;
    for (let index = 0; index < wordlistLength; index++) {
      //console.log(userIDList[index])
      if(userIndex == userIDList.length){
        userIndex = 0;
      };
      await startRound(userIDList[userIndex],id);
      //console.log("VISAR SCORE")
      await showScore(gameCounter,id);
      //console.log("FÄRDIG!!!")
      userIndex++
      gameCounter--
    }
  }

  function startRound(userID,id) {
    return new Promise((resolve, reject) => {
      io.to(id).emit("recivedWord", data.chooseWord(id));
      io.to(id).emit("gameStart", userID);
      let count = 20;
      let t = setInterval(() => {
        io.to(id).emit("timer", --count);
        if (count == 0) {
          clearInterval(t)
          t = null;
          //io.emit("roundEnd");
          resolve()
        }
        //console.log(count);
      }, 1000);
    })
  }

  function showScore(gameCounter, id) {
    return new Promise((resolve, reject) => {
      console.log("WORDLIST: "+gameCounter);
      if(gameCounter == 0){
        console.log("INUTI IF")
        io.to(id).emit("showResult");
      }else{
        io.to(id).emit("showScore");
      }
      
      setTimeout(() => {
        resolve()
      }, 3000)
    })
  }
  socket.on('getPlayerList', function (gameID) {
    //console.log("GetPLauerLIST");
    io.to(gameID).emit('RetrievePlayerList', data.getPlayerInfo(gameID));
  })

  socket.on("sendClearDrawing", function () {
    io.emit("getClearDrawing");
  })

  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('drawCoords', function (Coords, id) {
    data.addCoords(Coords)
    console.log("DRAW: "+id);
    io.to(id).emit('GetTheCoords', Coords)
  })

  socket.on('drawColor', function (Color) {
    //data.addCoords(Coords)
    io.emit('getColor', Color)
  })

  socket.on('drawSize', function (Size) {
    //data.addCoords(Coords)
    io.emit('getSize', Size)
  })


  socket.on('retreiveCoords', function () {
    socket.emit('GetCoords', data.getCoords())
  })

  socket.on('revivePlayerInfo', function () {
    socket.emit('playerJoined', data.sendPlayerInfo());
  })

  socket.on('recivePollId', function () {
    socket.emit('pollID', data.recivePollId());
  })

  socket.on('userInfo', function (playerInfo) {
    let state = data.addPlayers(playerInfo);
    console.log("IDSTATE ÄR: "+state[0] + " NAMESTATE ÄR " +state[1]);
    if((state[0] && state[1])){
      console.log("LÄGGER TILL SPELARE I RUM MED ID "+ playerInfo.id);
      socket.join(playerInfo.id)
      console.log(socket.id);
      io.to(socket.id).emit('CheckName', state);
      io.to(playerInfo.id).emit('RetrievePlayerList', data.getPlayerInfo(playerInfo.id));
    }
  });


  socket.on('newUsers', function (id) {
    //console.log("newUsers" + id)
    socket.join(id)
    io.to(id).emit('newPlayer', data.sendPlayerInfo())
  });

  socket.on('switchLanguage', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('joinedPoll', function () {
    socket.emit('pollJoined', data.createPoll());
  });

  socket.on('createGame', function (d) {
    data.createGame(d.gameId, d.words);
    console.log("SPEL SKAPAT")
  });

  socket.on('createPoll', function (d) {
    //console.log('createPoll i socket.js')
    //console.log(d)
    //console.log("KOLLA HÄR: " + data.createPoll(d.pollId, d.lang).pollId)
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang, d.words));
  });

  socket.on('addQuestion', function (d) {
    data.addQuestion(d.pollId, { q: d.q, a: d.a });
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('editQuestion', function (d) {
    data.editQuestion(d.pollId, d.index, { q: d.q, a: d.a });
    socket.emit('questionEdited', data.getAllQuestions(d.pollId));
  });

  socket.on('joinPoll', function (pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId))
    socket.emit('dataUpdate', data.getAnswers(pollId));
  });

  socket.on('runQuestion', function (d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('submitAnswer', function (d) {
    data.submitAnswer(d.pollId, d.answer);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  })

}

module.exports = sockets;