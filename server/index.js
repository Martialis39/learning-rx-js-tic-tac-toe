const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Proof of life
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

// Listens for connections
io.on('connection', socket => {
  // Log when someone connects!
  console.log("Someone connected!")
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
