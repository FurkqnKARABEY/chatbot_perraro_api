// pages/api/chat.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { messages, assistantId, pdfContent } = req.body;

  try {
    const thread = await openai.beta.threads.create({
      messages: [
        { role: 'system', content: pdfContent || '' },
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
    });

    // Bekle, cevabı al
    let status = 'queued';
    let response;

    while (status !== 'completed') {
      await new Promise((r) => setTimeout(r, 1000));
      const runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      status = runStatus.status;
    }

    const messagesResp = await openai.beta.threads.messages.list(thread.id);
    const lastMessage = messagesResp.data[0];

    response = lastMessage.content[0].text.value;

    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
}
