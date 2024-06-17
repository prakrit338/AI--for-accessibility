import React from 'react';
import { Typography, Link, Box } from '@mui/material';

export default function Footer() {
  return (
    <Box mt={5} mb={3} textAlign="center">
      <Typography variant="body2" color="textSecondary">
        {'Empowering every voice, illuminating every story'}
        <Link color="inherit" href="https://yourwebsite.com/"> <br />
        Crafted with care for every vision      </Link>
      </Typography>
    </Box>
  );
}
