import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

export default function ResponseDisplay({ transcription, response }) {
  return (
    <Box mt={4} width="100%">
      <Paper elevation={3} style={{ padding: '20px', background: '#e3f2fd' }}>
        <Typography variant="h6" component="p">
          Your Speech:
        </Typography>
        <Typography variant="body1" component="p" mt={2}>
          {transcription}
        </Typography>
      </Paper>
      <Paper elevation={3} style={{ padding: '20px', background: '#d1c4e9', marginTop: '20px' }}>
        <Typography variant="h6" component="p">
          AI Response:
        </Typography>
        <Typography variant="body1" component="p" mt={2}>
          {response}
        </Typography>
      </Paper>
    </Box>
  );
}
