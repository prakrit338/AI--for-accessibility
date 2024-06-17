import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const response = await axios.get('http://0.0.0.0:8000/transcribe_audio');
    res.status(200).json(response.data);
  } else {
    res.status(405).end();
  }
}
