const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const logEvent = event => (response, payload) => {
  console.log(`####\nReceived: ${event.toUpperCase()};\nSending response of type ${response.toUpperCase()} with payload: ${JSON.stringify(payload)};\n####`)
}

const logMoveFromServer = logEvent('move');

// Proof of life
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

// Listens for connections
io.on('connection', socket => {
  // Log when someone connects!
  console.log("Someone connected!")
  // Receive moves
  socket.on('move', board => {
    logMoveFromServer('move_from_server', board);
    io.emit('move_from_server', board);
    // broadcast sends to all but the sender
    // socket.broadcast.emit('move_from_server', board);
  })
  // When some emits a message of type 'greeting'
  socket.on('greeting', msg => {
    // Log it
    console.log("Got a greeting: ", msg)
    // Greet them back
    io.emit('response', 'Welcome to my world!');
  })
})

// Start listening
http.listen(3000, () => {
  console.log('listening on *:3000');
});
