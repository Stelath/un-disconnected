const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server, { cors: { origin: "*" } });

const game = require("./game");
let games = {};

io.on("connection", (socket) => {
  console.log("New client connected");
  
  makeNewRoom(socket);
  joinRoom(socket);

  listenForInput(socket);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const updateAllThings = () => {
    const LEFT  = '0010';
    const UP    = '1000';
    const RIGHT = '0001';
    const DOWN  = '0100';
    const STOP  = '0000';
    Object.entries(games).forEach(([key, value]) => {
        console.log(key)
        outputs = [];
        console.log(value);
        if(!value) {return;}
        Object.entries(value.playerState).forEach(([key, value]) => {
            console.log(value);
            switch(value.direction) {
                case 'left': outputs.push(LEFT); break;
                case 'up': outputs.push(UP); break;
                case 'right': outputs.push(RIGHT); break;
                case 'down': outputs.push(DOWN); break;
            }
        });
        
        io.to(key).emit("new-input", outputs);
    });
}

setInterval(() => updateAllThings(), 30); // update all things every second

const makeNewRoom = (socket) => {
  socket.once("create-room", (data) => {
    const roomID = Math.floor(Math.random() * 10000).toString();
    games[roomID] = (new game(roomID));
    socket.join(roomID);
    io.to(roomID).emit("room-created", roomID);
    console.log("Room created: " + roomID); // emit to the socket that created the room
    console.log(socket.rooms)
  });
};

const joinRoom = (socket) => {
    socket.once("join-room", (data) => {
        if(data) {
            const roomID = data.roomCode.toString();
            const playerName = data.name;
            if(games[roomID]) {
                socket.join(roomID);
                games[roomID].addPlayer(socket.id, playerName);
                // io.to(roomID).emit("room-created", 0)
                io.to(roomID).emit("player-joined", playerName); // emit to everyone in the room
                console.log("Player joined room: " + roomID); // emit to the socket that joined the room
            }
        }
    });
};

const listenForInput = (socket) => {
    socket.on("input", (data) => {
        let roomID = data.roomCode;
        
        games[roomID].playerState[socket.id].direction = data.input; // update the direction of the player
    });
};

const getApiAndEmit = (socket) => {
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
