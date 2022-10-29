class Game {
  constructor(roomID) {
    this.roomID = roomID;
    this.connectedPlayers = 0;
    this.playerState = {};
  }

  addPlayer(playerID, playerName = "No Name") {
    this.connectedPlayers++;
    this.playerState[playerID] = { name: playerName, direction: "", aPressed: false, bPressed: false }; // direction: "up", "down", "left", "right" or "" (no direction) // aPressed: true or false // bPressed: true or false
  }
}

module.exports = Game;
