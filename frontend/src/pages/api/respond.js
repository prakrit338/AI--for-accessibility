import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { question, model } = req.body;
    const response = await axios.post('http://0.0.0.0:8000/respond', { question, model });
    res.status(200).json(response.data);
  } else {
    res.status(405).end();
  }
}
