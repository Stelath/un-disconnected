import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import Game from './games/game';
import SnakeGame from './games/snakeGame';

const port = process.env.PORT || 4001;

const server = createServer();
const io = new Server(server, { cors: { origin: "*" } });

let games = new Map<string, Game>();

io.on("connection", (socket) => {
  console.log("New client connected");
  
  handleNewRoom(socket);
  handleJoinRoom(socket);

  handleNewInput(socket);

  handleDisconnect(socket);
});

const updateAllThings = () => {
    games.forEach((value: Game, key: string) => {
        const outputs = value.getState();
        
        io.to(key).emit("new-input", outputs);
    });
}

setInterval(() => updateAllThings(), 30); // update all things every second

const handleNewRoom = (socket: Socket) => {
  socket.once("create-room", (data) => {
    if(!data || !data.gameType) {
      io.to(socket.id).emit("room-creation-failed");
      return false;
    }

    const gameType = data.gameType;
    const roomID = Math.floor(Math.random() * 100000).toString().padEnd(5, '0');

    switch(gameType) {
      case 'snake':
        games.set(roomID, new SnakeGame(socket.id, roomID));
        break;
      default:
        io.to(socket.id).emit("room-creation-failed");
        return false;
    }

    socket.join(roomID);
    io.to(roomID).emit("room-created", roomID);

    console.log(`Room created: ${roomID}`); // emit to the socket that created the room
    console.log(socket.rooms);
    console.log();

    return true;
  });
};

const handleJoinRoom = (socket: Socket) => {
    socket.once("join-room", (data) => {
        if(data) {
            const roomID: string = data.roomCode.toString();
            const playerName: string = data.name;
            if(games.has(roomID)) {
                socket.join(roomID);
                games.get(roomID)?.addPlayer(socket.id, playerName);
                
                io.to(roomID).emit("player-joined", playerName); // emit to everyone in the room

                console.log(`Player joined room: ${roomID}\n`);
            }
        }
    });
};

const handleNewInput = (socket: Socket) => {
    socket.on("input", (data) => {
        let roomID: string = data.roomCode;
        
        if(games.has(roomID)) {
          let game: Game = games.get(roomID)!;
          if(game.players.has(socket.id)) {
            game.players.get(socket.id)!.state = data.input; // update the direction of the player
          } else {
            socket.emit("error", "You are not in this room");
          }
        } else {
          socket.emit("error", "Room does not exist");
        }
    });
};

const handleDisconnect = (socket: Socket) => {
  socket.on("disconnecting", () => {
    socket.rooms.forEach(room => {
      if(games.has(room)) {
        const game = games.get(room)!;
        if(game.hostID == socket.id) {
          games.delete(room);
          io.to(room).emit("deleted-room");
          console.log(`Deleted room: ${room}`)
        } else {
          if(game.players.has(socket.id)) {
            io.to(game.roomID).emit("player-left", game.players.get(socket.id)!.name)
            game.players.delete(socket.id);
          }
        }
      }
    });
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected, ID: ${socket.id}\n`);
  })
}

server.listen(port, () => console.log(`Listening on port ${port}`));
