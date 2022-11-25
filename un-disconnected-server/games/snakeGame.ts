import Game, {PlayerState} from './game';

interface SnakeGamePlayerState extends PlayerState {
    state: string;
}

class SnakeGame extends Game {
    players: Map<string, SnakeGamePlayerState>;

    constructor(host: string, roomID: string) {
        super(host, roomID);
        this.players = new Map<string, SnakeGamePlayerState>();
    }

    setInput(): boolean {
        

        return false;
    }
    
    getState(): string[] {
        const LEFT  = '0010';
        const UP    = '1000';
        const RIGHT = '0001';
        const DOWN  = '0100';
        const STOP  = '0000';

        let outputs: string[] = [];
        this.players.forEach((value: PlayerState, key: string) => {
            outputs.push(value.state.toUpperCase());
        });

        return outputs;
    }
}

export default SnakeGame;