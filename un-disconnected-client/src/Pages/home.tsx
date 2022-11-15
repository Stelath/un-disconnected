import React from "react";
import theme from "../theme/theme";

import { ThemeProvider } from "@mui/material/styles";
import { Typography, Stack, Button } from "@mui/material";

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Stack
        mt={5}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Typography variant="h1"> un-Disconnected </Typography>
        <Typography variant="h1">
          WEB BASED
          PARTY GAMES
        </Typography>
        <Button variant="contained" href="/join">
          Join A Room
        </Button>
        <Button variant="contained" href="/createroom">
          {" "}
          Create a Room
        </Button>
      </Stack>
    </ThemeProvider>
  );
}

export default Home;
