let currentDrawer = null;
let playersGuessedCorrect = 0;
function sockets(io, socket, data) {

  socket.emit('init', data.getUILabels());

  //socket.emit('GetCoords', data.getCoords())

  socket.on("updateScore", function(time, gameID){
    if(currentDrawer != null){
      var totalGuessing = data.getPlayerInfo(gameID).length -1;
      let drawerPoint = Math.round(time/totalGuessing);
      data.updateScore(drawerPoint, gameID, currentDrawer)
    }
    data.updateScore(time, gameID, socket.id);
    playersGuessedCorrect = playersGuessedCorrect + 1;
  })

  socket.on('getScoreBoard', function(gameID){
    io.to(gameID).emit('scoreBoard', data.getScoreBoard(gameID));
  })

  socket.on("sendEmoji", function(gameId, emoji, x, y){
    //console.log('sendEmoji')
    io.to(gameId).emit("reciveEmoji", emoji, x, y)
  })

  socket.on("hostJoin", function(id){
    socket.join(id);
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
      currentDrawer = userID;
      currentDrawerName = data.getPlayerName(id, userID);
      totalGuessers = data.getPlayerInfo(id).length -1;
      //console.log('currentDrawer: ' + currentDrawerName + " med socketID: "+currentDrawer);
      io.to(id).emit("currentDrawer", currentDrawerName);
      io.to(id).emit("recivedWord", data.chooseWord(id));
      let wordsLeft= data.getWordsList(id).length;
      io.to(id).emit("wordsLeft", wordsLeft);
      io.to(id).emit("gameStart", userID);
      let count = 60;
      let t = setInterval(() => {
        io.to(id).emit("timer", --count);
        if (playersGuessedCorrect == totalGuessers && count > 1){
          count = 1
        }
        else if (count == 0) {
          playersGuessedCorrect = 0;
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
      let nextRoundTimer = 10;
      console.log("WORDLIST: "+gameCounter);
      if(gameCounter == 0){
        //console.log("INUTI IF")
        io.to(id).emit("showScore", true); 
      }else{
        io.to(id).emit("showScore", false);
      }
      let s = setInterval(() => {
        io.to(id).emit("nextRoundTimer", --nextRoundTimer);
        if (nextRoundTimer == 0) {
          clearInterval(s);
          s = null;
          resolve()
        }
      }, 1000)
    })
  }

  socket.on("sendClearDrawing", function (id) {
    io.to(id).emit("getClearDrawing");
  })

  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('drawCoords', function (Coords, id) {
    io.to(id).emit('GetTheCoords', Coords)
  })

  socket.on('drawColor', function (Color, id) {
    //data.addCoords(Coords)
    io.to(id).emit('getColor', Color)
  })

  socket.on('drawSize', function (Size, id) {
    //data.addCoords(Coords)
    io.to(id).emit('getSize', Size)
  })


  socket.on('userInfo', function (playerInfo) {
    //console.log("NAMN: "+ playerInfo.name + ". SOCKETID: "+socket.id);
    playerInfo.userID = socket.id;
    let state = data.addPlayers(playerInfo);
    //console.log("IDSTATE ÄR: "+state[0] + " NAMESTATE ÄR " +state[1]);
    socket.emit('CheckName', state);
    if((state[0] && state[1])){
      //console.log("LÄGGER TILL SPELARE MED NAMN: "+playerInfo.name+" OCH SOCKETID: "+socket.id+" I RUM MED ID "+ playerInfo.id);
      socket.join(playerInfo.id)
      //console.log(socket.id);
      io.to(playerInfo.id).emit('RetrievePlayerList', data.getPlayerInfo(playerInfo.id));
    }
  });

  socket.on('switchLanguage', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createGame', function (d) {
    data.createGame(d.gameId, d.words);
    //console.log("SPEL SKAPAT")
  });

}

module.exports = sockets;