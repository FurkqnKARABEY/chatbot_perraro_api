// pages/api/upload-pdf.js
import pdf from 'pdf-parse';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);

  try {
    const data = await pdf(buffer);
    res.status(200).json({ content: data.text });
  } catch (err) {
    console.error('PDF parse error:', err);
    res.status(500).json({ error: 'PDF parsing failed.' });
  }
}
