import React from "react";
import theme from "../theme/theme";

import { ThemeProvider } from "@mui/material/styles";
import { Typography, Stack, Button, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

function Home() {
  return (
    <Box >
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <img src="/banner.svg" alt="UnDisconnected Banner" />
          <Typography variant="h1">WEB BASED</Typography>
          <Typography variant="h1">PARTY GAMES</Typography>
        </Grid>
        <Stack
          mt={5}
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <Button variant="contained" href="/join">
            Join A Room
          </Button>
          <Button variant="contained" href="/createroom">
            {" "}
            Create a Room
          </Button>
        </Stack>
      </Grid>
    </ThemeProvider>
    </Box>
  );
}

export default Home;
