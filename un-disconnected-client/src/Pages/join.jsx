import React from "react"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from "../theme/theme"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



class Join extends React.Component {
    
    render() {
         return (
            <ThemeProvider theme={theme}>
                <Stack
                mt={5}
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={4}>
                    <h1>Join A game</h1>
                    <TextField id="outlined-basic" label="Join Code"  margin="normal" type="search" color="text" focused/>

                </Stack>
            </ThemeProvider>
        )
    }
}

export default Join;