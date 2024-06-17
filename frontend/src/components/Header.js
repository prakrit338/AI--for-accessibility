import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" justifyContent="center" width="100%">
          <Typography variant="h6">
            Voice Interaction App
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
