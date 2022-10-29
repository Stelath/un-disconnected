import React from "react"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from "../theme/theme"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link} from "react-router-dom";



class Join extends React.Component {
    constructor() {
        super()
        this.state = {value: 0, name: ""}
    }

    handleJoinCodeChange = (e) => this.setState({ 
		value: e.target.value 
	}) 

    handleNameChange = (e) => this.setState({ 
		name: e.target.value 
	}) 

    render() {
         return (
            <ThemeProvider theme={theme}>
                <Stack
                mt={5}
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={4}>
                    <Typography variant="h3"> Join A Game </Typography>
                    <TextField id="outlined-basic" label="Join Code" color="text" margin="normal" onChange={this.handleJoinCodeChange}/>
                    <TextField id="outlined-basic" label="Name" color="text" margin="normal" onChange={this.handleNameChange}/>

                    <Button variant="contained" href={`/controller?joinCode=${this.state.value}&name=${this.state.name}`}>Join!</Button>
                    

                </Stack>
            </ThemeProvider>
        )
    }
}

export default Join;