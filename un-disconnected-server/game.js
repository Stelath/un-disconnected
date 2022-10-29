class Game {
  constructor(roomID) {
    this.roomID = roomID;
    this.connectedPlayers = 0;
    this.playerState = {};
  }

  addPlayer(playerID) {
    this.connectedPlayers++;
    this.playerState[playerID] = { direction: "", aPressed: false, bPressed: false }; // direction: "up", "down", "left", "right" or "" (no direction) // aPressed: true or false // bPressed: true or false
  }
}

module.exports = Game;
