// scrape.js in your pages/api directory

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { site } = req.body; // Assuming you're sending site name in the request body
    try {
      await axios.post('http://0.0.0.0:8000/scrape', { site });
      res.status(200).end();
    } catch (error) {
      console.error('Error calling scraping API:', error);
      res.status(500).json({ error: 'Error calling scraping API' });
    }
  } else {
    res.status(405).end();
  }
}
