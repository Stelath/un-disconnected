import React from "react"
import socket from "../service/socket";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from "../theme/theme"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

class CreateRoom extends React.Component {

    constructor() {
        super();
        this.state = {joinCode: 0, playerNames: []}
    }
    
    componentDidMount() {
        socket.connect();
        socket.emit("create-room",  { gameType: 'snake' });

        socket.on("room-created", data => {
            this.setState({joinCode: data});
        });
        
        socket.on("player-joined", data => {
            console.log("player joined (frontend)" + data);
            this.setState({playerNames: [...this.state.playerNames, data]});
        });

        socket.on("player-left", data => {
            console.log("Player left: " + data);
        });
    }
      

    render() {
         return (
            <ThemeProvider theme={theme}>
                <Stack
                mt={5}
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={4}>
                    <h1>Join Code: {this.state.joinCode}</h1>
                    <h2>Members Joined: {this.state.playerNames.length}/4</h2>
                    <Stack
                        mt={3}
                        direction="column"
                        alignItems="center"
                        spacing={4}>
                            {this.state.playerNames.map(function(object, i){
                                return (
                                <h3><b>{object}</b></h3>
                                );
                             })}
                        </Stack>
                    <Button variant="contained" href={`/game?joinCode=${this.state.joinCode}&numPlayers=${this.state.playerNames.length}`}>Start the Game!</Button>

                </Stack>
            </ThemeProvider>
        )
    }
}

export default CreateRoom;