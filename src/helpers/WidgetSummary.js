import React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Box from "@mui/material/Box";
import { alpha, styled } from "@mui/material/styles";

//Need to get theme color and a color that is lighter for the icon
// PRIMARY: #d1e9fc
// SECONDARY LIGHT: #ffffff
// SECONDARY DARK: #9fb7c9
// Need to find Icon

const IconWrapperStyle = styled("div")(() => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: 8,
  height: 8,
  justifyContent: "center",
  marginBottom: 3,
}));

export default function WidgetSummary() {
  return (
    <Card
      sx={{
        py: 3,
        boxShadow: 0,
        textAlign: "center",
        color: "#1976d2",
        bgcolor: "#d1e9fc",
        borderRadius: 5,
      }}
    >
      <Box
        sx={{
          color: "#1976d2",
          backgroundImage: `linear-gradient(135deg, ${alpha(
            "#1976d2",
            0
          )} 0%, ${alpha("#1976d2", 0.24)} 100%)`,
          margin: "auto",
          display: "flex",
          borderRadius: "50%",
          alignItems: "center",
          width: 50,
          height: 50,
          justifyContent: "center",
          marginBottom: 3,
        }}
      >
        <LockOpenIcon width={24} height={24} />
      </Box>

      <Typography variant="h3">100</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Unlocked
      </Typography>
    </Card>
  );
}
