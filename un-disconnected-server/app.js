const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 10000;
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
                io.to(roomID).emit("room-created", 03)
                io.to(roomID).emit("player-joined", playerName); // emit to everyone in the room
                console.log("Player joined room: " + roomID); // emit to the socket that joined the room
            }
        }
    });
};

const listenForInput = (socket) => {
    socket.on("input", (data) => {
        console.log(socket.id + ": " + data.input);
        console.log(socket.rooms)
    });
};

const getApiAndEmit = (socket) => {
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
