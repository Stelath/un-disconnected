import React from "react";
import theme from "../theme/theme";

import { ThemeProvider } from "@mui/material/styles";
import { Typography, Stack, Button, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

function Home() {
  return (
    <Box height = "100vh" display="flex" alignItems="center">
      <ThemeProvider theme={theme}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          style={{width: "100%", margin: "0 10%" }}
        >
          <Grid xs={12} sm={12} md={6} lg={6}>
            <img
              src="/banner.svg"
              alt="un-Disconnected Banner"
              style={{ width: "20rem" }}
            />
            <Typography variant="h1">WEB BASED</Typography>
            <Typography variant="h1">PARTY GAMES</Typography>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={6} margin={"50px 0"}>
            <Stack spacing={2} sx={{marginLeft: "auto", marginRight: "auto", width: "12.5rem"}}>
              <Button variant="contained" href="/join">
                Join A Room
              </Button>
              <Button variant="contained" href="/createroom">
                Create a Room
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Box>
  );
}

export default Home;
