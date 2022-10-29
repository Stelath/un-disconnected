import React from "react"
import { ThemeProvider } from '@mui/material/styles';
import theme from "../theme/theme"
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



class GameSelection extends React.Component {
    
    render() {
         return (
            <ThemeProvider theme={theme}>
                <Stack
                mt={5}
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={4}>
                    <h1>Games:</h1>
                    <Button variant="contained" href="/game">Snake</Button>
                </Stack>
            </ThemeProvider>
        )
    }
}

export default GameSelection;