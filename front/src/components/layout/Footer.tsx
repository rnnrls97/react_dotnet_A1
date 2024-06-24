import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" py={2} textAlign="center" bgcolor="primary.main" color="primary.contrastText" style={{position: "absolute", bottom: "0", width: "100%"}}>
      <Typography variant="body2">
        © {new Date().getFullYear()} Renan Santos - RGM 34572309.
      </Typography>
    </Box>
  );
}
