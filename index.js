var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var store = require('./store');
const {PORT = 3002} = process.env;

app.get('/', function(req, res){
  res.send('alma')
});

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('ADD_BOOZE_TO_LIST', ({username, message}) => {
    store.add(username, message.item);
    io.emit('ALL_LIST', store.cache);
  });
  socket.on('GET_ALL_LIST', () => {
    socket.emit('ALL_LIST', store.cache)
  });
  socket.on('DELETE_BOOZE_FROM_LIST', ({username, message}) => {
    store.remove(username, message.item);
    io.emit('ALL_LIST', store.cache);
  });

  socket.on('TAKE_BY', ({username}) => {
    store.takenBy = username;
    io.emit('TAKEN_BY', store.takenBy);
  });

  socket.on('CLEAR_TAKEN_BY', () => {
    store.takenBy = null;
    io.emit('TAKEN_BY', store.takenBy);
  });

  socket.on('ALL_DONE', () => {
    store.cache = {};
    io.emit('ALL_DONE', store.cache);
  });

  socket.on('RECONNECT', () => {
    socket.emit('RECONNECT', {
      takenBy: store.takenBy,
      items: store.cache
    })
  });
});

http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});
