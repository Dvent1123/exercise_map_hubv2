import React from "react";
import Layout from "./core/Layout";
import { Link } from "react-router-dom";
import arm from "./assets/images/arm.svg";
import graph from "./assets/images/graph.svg";
import joints from "./assets/images/joints.svg";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import banner from "./assets/images/banner-pic.webp";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const App = () => {
  return (
    <Layout>
      <Container maxWidth="xl">
        <Paper
          sx={{ height: "calc(100vh - 87px)", width: "100%" }}
          variant="outlined"
        >
          <img
            src={banner}
            style={{ width: "100%", maxHeight: "100%", zIndex: "-1" }}
          />
          <Box
            sx={{
              position: "absolute",
              left: { xs: "50%", md: "35%", lg: "30%" },
              top: { xs: 200, md: 525, lg: 650 },
              transform: "translateX(-50%)",
              zIndex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: {xs: "center", md: "flex-start"},
            }}
          >
            <Typography
              variant="h2"
              color="white"
              sx={{ fontSize: { xs: 20, md: 40  } }}
            >
              Track Your Strength Skills and <br /> Unlock Your Achievements
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ marginTop: 3, backgroundColor: "#126a75" }}
            >
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "white" }}
              >
                Join Now
              </Link>
            </Button>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default App;
