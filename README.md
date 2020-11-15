# Tic-Tac-Toe with RxJs

This is a project for learning RxJs. The goal is to make a multiplayer
Tic-Tac-Toe game with RxJs and socket.io.

The project will progress through various mob programming sessions that
wil be held over the upcoming weeks.

The code that is pushed will be left 'as-is' and not cleaned or edited.

### How to run

Goes without saying, clone this.

The project is split into 2 parts. The back-end (a dead-simple Express
server with socket.io) is relegated to the `/server` directory.

To start the server, `cd` into the `server` directory and do 
`node index.js`. This will start the server on port 3000. Incoming
connections are logged in the console.

To start the front-end, do `parcel index.html` in the root directory.
Parcel is a simple build tool that looks through an HTML files and finds
and compiles all the references JavaScript dependencies.

You need to have `parcel-bundler` installed globally. For that, do
`npm install -g parcel-bundler`. For more information, checkout
[Parcel's website](https://parceljs.org/getting_started.html).

### Session of 5/11/20

Got started! Spent a bit of time getting everything up and running.
This session was mostly about explaining the boilerplate HTML and
socket io server and then getting the basics up and running.

We tinkered with streams and answered a lot of 'What if?' questions.
We learned the difference between `map` and `flatMap`. We think we
know what a monad is???

We tried to be maintain good structure but failed. We hoped to have
the observables, helper functions, and the main game loop all in
separate files but at some point, the focus just shifted to
`observables.js`. Sorry.

### "Architecture" notes

What do I want to do? I want to send the board each time. I am fixated
on this. If I would do this, I would have:

1) A stream from the server (Server Stream), which gives me the newest board.
Whenever this emits, I want to draw the board.

2) A stream for local input (Local stream), which also has the latest board.
When this stream emits, I want to trigger an emission to Server Stream.

To do this, I need a subject (need to control when sth emits).


