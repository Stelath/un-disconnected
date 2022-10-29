import React from "react"
import { ThemeProvider } from '@mui/material/styles';
import theme from "../theme/theme"
import Typography from '@mui/material/Typography';
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
                    <Typography variant="h3"> un-Disconnected </Typography>
                    <Button variant="contained" href="/join">Join A Room</Button>
                    <Button variant="contained" href="/createroom"> Create a Room</Button>
                </Stack>
            </ThemeProvider>
        )
    }
}

export default Home;