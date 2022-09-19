import React from "react";
import { Box, Button, Typography } from "@mui/material";

export default function StartPage({handleStartClick}) {
  return (
    <Box
      className="startPage"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      gap={4}
    >
      <Typography variant="h1" fontWeight={700} color="primary.dark">Quizzlet</Typography>
      <Button
        variant="contained"
        sx={{ textTransform: "capitalize", fontSize: "24px", px: 8, borderRadius: 6 }}
        onClick={handleStartClick}
      >
        Start
      </Button>
    </Box>
  );
}
