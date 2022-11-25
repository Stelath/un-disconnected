interface PlayerState {
  name: string;
  state: any;
}

class Game {
  hostID: string;
  roomID: string;
  connectedPlayers: number;
  players: Map<string, PlayerState>;

  constructor(host: string, roomID: string) {
    this.hostID = host;
    this.roomID = roomID;
    this.connectedPlayers = 0;
    this.players = new Map<string, PlayerState>();
  }

  addPlayer(playerID: string, playerName: string = "No Name"): void {
    this.connectedPlayers++;
    this.players.set(playerID, { name: playerName, state: "" }); // direction: "up", "down", "left", "right" or "" (no direction) // aPressed: true or false // bPressed: true or false
  }

  setInput(): boolean {
    return false;
  }

  getState(): any {
    return undefined;
  }
}

export default Game;
export { PlayerState };