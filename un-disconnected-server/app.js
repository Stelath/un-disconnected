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
let games = [];

io.on("connection", (socket) => {
  console.log("New client connected");
  
  makeNewRoom(socket);
  joinRoom(socket);

  listenForInput(socket);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const makeNewRoom = (socket) => {
  socket.once("new-room", () => {
    const roomID = Math.floor(Math.random() * 10000);
    games.append(new game(roomID));
    socket.join(roomID);
  });
};

const joinRoom = (socket) => {
    socket.once("join-room", (roomID) => {
        socket.join(roomID);
    });
};

const listenForInput = (socket) => {
    socket.on("input", (data) => {
        console.log(socket.id + ": " + data);
        console.log(socket.rooms)
    });
};

const getApiAndEmit = (socket) => {
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
