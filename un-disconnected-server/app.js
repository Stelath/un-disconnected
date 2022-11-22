var express = require("express");
var http = require("http");
var socketIo = require("socket.io");
var port = process.env.PORT || 4001;
var index = require("./routes/index");
var app = express();
app.use(index);
var server = http.createServer(app);
var io = socketIo(server, { cors: { origin: "*" } });
var game = require("./game");
var games;
io.on("connection", function (socket) {
    console.log("New client connected");
    makeNewRoom(socket);
    joinRoom(socket);
    listenForInput(socket);
    socket.on("disconnect", function () {
        console.log("Client disconnected");
    });
});
var updateAllThings = function () {
    var LEFT = '0010';
    var UP = '1000';
    var RIGHT = '0001';
    var DOWN = '0100';
    var STOP = '0000';
    games.forEach(function (value, key) {
        var outputs = [];
        if (!value) {
            return;
        }
        value.players.forEach(function (value, key) {
            switch (value.state) {
                case 'left':
                    outputs.push(LEFT);
                    break;
                case 'up':
                    outputs.push(UP);
                    break;
                case 'right':
                    outputs.push(RIGHT);
                    break;
                case 'down':
                    outputs.push(DOWN);
                    break;
            }
        });
        io.to(key).emit("new-input", outputs);
    });
};
setInterval(function () { return updateAllThings(); }, 30); // update all things every second
var makeNewRoom = function (socket) {
    socket.once("create-room", function (data) {
        var roomID = Math.floor(Math.random() * 10000).toString();
        games.set(roomID, new game(roomID));
        socket.join(roomID);
        io.to(roomID).emit("room-created", roomID);
        console.log("Room created: " + roomID); // emit to the socket that created the room
        console.log(socket.rooms);
    });
};
var joinRoom = function (socket) {
    socket.once("join-room", function (data) {
        var _a;
        if (data) {
            var roomID = data.roomCode.toString();
            var playerName = data.name;
            if (games.has(roomID)) {
                socket.join(roomID);
                (_a = games.get(roomID)) === null || _a === void 0 ? void 0 : _a.addPlayer(socket.id, playerName);
                // io.to(roomID).emit("room-created", 0)
                io.to(roomID).emit("player-joined", playerName); // emit to everyone in the room
                console.log("Player joined room: " + roomID); // emit to the socket that joined the room
            }
        }
    });
};
var listenForInput = function (socket) {
    socket.on("input", function (data) {
        var roomID = data.roomCode;
        if (games.has(roomID)) {
            var game_1 = games.get(roomID);
            if (game_1.players.has(socket.id)) {
                game_1.players.get(socket.id).state = data.input; // update the direction of the player
            }
            else {
                socket.emit("error", "You are not in this room");
            }
        }
        else {
            socket.emit("error", "Room does not exist");
        }
    });
};
server.listen(port, function () { return console.log("Listening on port ".concat(port)); });
