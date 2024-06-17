import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

export default function InteractionHistory({ history }) {
  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', background: '#e0f7fa' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Interaction History
      </Typography>
      <List>
        {history.map((interaction, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemText
              primary={`You: ${interaction.userInput}`}
              secondary={`${interaction.model === 'gemini-1.5-flash' ? 'Gemini' : 'GPT-4'}: ${interaction.response}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
