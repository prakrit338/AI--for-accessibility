import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecordButton from '../components/RecordButton';
import ResponseDisplay from '../components/ResponseDisplay';
import InteractionHistory from '../components/InteractionHistory';
import ModelSelector from '../components/ModelSelector';

export default function Home() {
  const [transcription, setTranscription] = useState('');
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState([]);
  const [model, setModel] = useState('gpt-4');

  const handleResponse = (userInput, response) => {
    setTranscription(userInput);
    setResponse(response);
    setHistory([...history, { userInput, response, model }]);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Header />
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', background: '#fff5e6' }}>
              <Typography variant="h3" component="h1" gutterBottom>
                Voice Interaction App
              </Typography>
              <Typography variant="h6" component="p" gutterBottom>
                Speak to interact with GPT-4 or Gemini 1.5-Flash. Click the button below to start recording.
              </Typography>
              <ModelSelector model={model} setModel={setModel} />
              <RecordButton onResponse={handleResponse} model={model} />
            </Paper>
            <ResponseDisplay transcription={transcription} response={response} />
          </Grid>
          <Grid item xs={12} md={4}>
            <InteractionHistory history={history} />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Container>
  );
}
