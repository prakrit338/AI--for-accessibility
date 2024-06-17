import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function ModelSelector({ model, setModel }) {
  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <InputLabel id="model-select-label">Select Model</InputLabel>
      <Select
        labelId="model-select-label"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        label="Select Model"
      >
        <MenuItem value="gpt-4">GPT-4</MenuItem>
        <MenuItem value="gemini-1.5-flash">Gemini 1.5-Flash</MenuItem>
      </Select>
    </FormControl>
  );
}
