import React, { useState } from 'react';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import axios from 'axios';

export default function RecordButton({ onResponse, model }) {
  const [isRecording, setIsRecording] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [siteToScrape, setSiteToScrape] = useState('');
  const [waitingForScrape, setWaitingForScrape] = useState(false);
  const [scrapeSummary, setScrapeSummary] = useState('');

  const handleRecording = async () => {
    setIsRecording(true);
    await axios.post('/api/record');
    setIsRecording(false);

    const transcriptionRes = await axios.get('/api/transcribe');
    const transcription = transcriptionRes.data.transcription;

    // Check for commands
    const commandMatch = transcription.match(/(visit|scrape|go to)\s+([^\s]+)/i);
    if (commandMatch) {
      const site = commandMatch[2];
      setSiteToScrape(site);
      setDialogOpen(true);
      const utterance = new SpeechSynthesisUtterance(`Do you want to scrape ${site}?`);
      speechSynthesis.speak(utterance);
    } else {
      // If no command found, proceed with AI response
      const responseRes = await axios.post('/api/respond', {
        question: transcription,
        model,
      });

      const response = responseRes.data.response;
      onResponse(transcription, response);

      if (model === 'gemini-1.5-flash') {
        const utterance = new SpeechSynthesisUtterance(response);
        speechSynthesis.speak(utterance);
      } else {
        // For GPT-4, the backend handles text-to-speech and audio playback
      }
    }
  };

  const handleConfirmScrape = async () => {
    setDialogOpen(false);
    setWaitingForScrape(true); // Show "Please wait" message

    try {
      const scrapeResponse = await axios.post('/api/scrape', { site: siteToScrape });
      const { message } = scrapeResponse.data; // Assuming your API returns a message

      // Assuming your API response includes a summary
      if (scrapeResponse.data.summary) {
        setScrapeSummary(scrapeResponse.data.summary);
        const utterance = new SpeechSynthesisUtterance(`Summary from scraping: ${scrapeResponse.data.summary}`);
        speechSynthesis.speak(utterance);
      }

      // Optionally handle other response data here as needed
      console.log("Scrape API Response:", message);
    } catch (error) {
      console.error('Error scraping site:', error);
      const utterance = new SpeechSynthesisUtterance('Sorry, there was an error scraping the site. Please try again later.');
      speechSynthesis.speak(utterance);
    } finally {
      setWaitingForScrape(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRecording}
        disabled={isRecording}
        endIcon={isRecording ? <CircularProgress size={20} /> : null}
      >
        {isRecording ? 'Recording...' : 'Start Recording'}
      </Button>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to scrape {siteToScrape}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmScrape} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {waitingForScrape && (
        <Typography variant="body1" color="textSecondary" align="center" style={{ marginTop: '16px' }}>
          Please wait, scraping {siteToScrape}...
        </Typography>
      )}
      {scrapeSummary && (
        <Typography variant="body1" color="textPrimary" align="center" style={{ marginTop: '16px' }}>
          Scrape Summary: {scrapeSummary}
        </Typography>
      )}
    </>
  );
}
