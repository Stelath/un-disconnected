interface PlayerState {
  name: string;
  state: any;
}

class Game {
  roomID: number;
  connectedPlayers: number;
  players: Map<string, PlayerState>;

  constructor(roomID: number) {
    this.roomID = roomID;
    this.connectedPlayers = 0;
  }

  addPlayer(playerID: string, playerName: string = "No Name"): void {
    this.connectedPlayers++;
    this.players.set(playerID, { name: playerName, state: "" }); // direction: "up", "down", "left", "right" or "" (no direction) // aPressed: true or false // bPressed: true or false
  }
}

module.exports = Game;
