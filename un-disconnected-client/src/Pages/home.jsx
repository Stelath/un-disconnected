import React from "react"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from "../theme/theme"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



class Home extends React.Component {
    
    render() {
         return (
            <ThemeProvider theme={theme}>
                <Stack
                mt={5}
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={4}>
                    <h1>Un-Disconnected</h1>
                    <Button variant="contained">Join A Room</Button>
                    <Button variant="contained">Create a Room</Button>
                </Stack>
            </ThemeProvider>
        )
    }
}

export default Home;