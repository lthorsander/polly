function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());

  
  socket.on('getPlayerList', function(){
    socket.emit('RetrievePlayerList', data.getPlayerInfo());
  })

  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('revivePlayerInfo', function(){
  socket.emit('playerJoined', data.sendPlayerInfo());
})

socket.on('recivePollId', function(){
  socket.emit('pollID', data.recivePollId());
})

  socket.on('userInfo', function(playerInfo){
    let state = data.checkName(playerInfo)
    console.log("USERINFO CHECKNAME "+state)
    if(state){
      data.addPlayer(playerInfo);
    }
    socket.emit('CheckName', state)
  })

  socket.on('newUsers', function(id){
    console.log("newUsers" + id)
    socket.join(id)
    io.to(id).emit('newPlayer', data.sendPlayerInfo())
  })

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('joinedPoll', function(){
    socket.emit('pollJoined', data.createPoll());
  })

  socket.on('createPoll', function(d) {
    console.log('createPoll i socket.js')
    console.log(d)
    console.log("KOLLA HÄR: " + data.createPoll(d.pollId, d.lang).pollId)
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang));
  });

  socket.on('addQuestion', function(d) {
    data.addQuestion(d.pollId, {q: d.q, a: d.a});
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('editQuestion', function(d) {
    data.editQuestion(d.pollId, d.index, {q: d.q, a: d.a});
    socket.emit('questionEdited', data.getAllQuestions(d.pollId));
  });

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId))
    socket.emit('dataUpdate', data.getAnswers(pollId));
  });

  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('submitAnswer', function(d) {
    data.submitAnswer(d.pollId, d.answer);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  })
 
}

module.exports = sockets;