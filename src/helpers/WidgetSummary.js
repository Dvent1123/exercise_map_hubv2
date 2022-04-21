import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";

//Need to get theme color and a color that is lighter for the icon
// PRIMARY: #d1e9fc
// SECONDARY LIGHT: #ffffff
// SECONDARY DARK: #9fb7c9
// Need to find Icon

export default function WidgetSummary({ totalUnlocked } ) {
  return (
    <Card
      sx={{
        py: 3,
        boxShadow: 0,
        textAlign: "center",
        color: "#1976d2",
        bgcolor: "#d1e9fc",
        borderRadius: 5,
        height: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Box
        sx={{
          color: "#1976d2",
          backgroundImage: `linear-gradient(135deg, ${alpha(
            "#1976d2",
            0
          )} 0%, ${alpha("#1976d2", 0.24)} 100%)`,
          margin: "none",
          display: "flex",
          borderRadius: "50%",
          alignItems: "center",
          width: 80,
          height: 80,
          justifyContent: "center",
          marginBottom: 3,
        }}
      >
        <LockOpenIcon fontSize="large"/>
      </Box>

      <Typography variant="h2">{totalUnlocked}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Unlocked
      </Typography>
    </Card>
  );
}
