import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await axios.post('http://0.0.0.0:8000/record_audio');
    res.status(200).end();
  } else {
    res.status(405).end();
  }
}
