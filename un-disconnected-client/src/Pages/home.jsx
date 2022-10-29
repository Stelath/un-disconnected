import React from "react"

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
         return (
            <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={4}>
                <h1>Un-Disconnected</h1>
                <Button variant="contained">Join A Room</Button>
                <Button variant="contained">Create a Room</Button>
            </Stack>
        )
    }
}

export default Home;