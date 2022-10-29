import React from "react"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from "../theme/theme"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



class CreateRoom extends React.Component {
    
    render() {
         return (
            <ThemeProvider theme={theme}>
                <Stack
                mt={5}
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={4}>
                    <h1>Join Code: 000000 (replace later)</h1>
                    <h2>Members Joined: 0/4(change later)</h2>
                    <Stack
                        mt={3}
                        direction="column"
                        alignItems="center"
                        spacing={4}>
                            <h3><b>Eduardo</b></h3>
                            <h3><b>Jeff</b></h3>
                            <h3><b>Tate</b></h3>
                            <h3><b>Camden</b></h3>
                        </Stack>

                </Stack>
            </ThemeProvider>
        )
    }
}

export default CreateRoom;