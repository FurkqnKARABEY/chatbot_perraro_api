import OpenAI from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { messages, assistantId } = req.body;
    
    const thread = await openai.beta.threads.create({
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    });

    const run = await openai.beta.threads.runs.create(
      thread.id,
      {
        assistant_id: assistantId || 'asst_3xXmxBPDkSJ028i06zdKzrGV' // GPTs ID'niz
      }
    );

    let runStatus = await openai.beta.threads.runs.retrieve(
      thread.id,
      run.id
    );

    // Polling for completion
    while (runStatus.status !== 'completed') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );
    }

    const threadMessages = await openai.beta.threads.messages.list(
      thread.id
    );

    const response = threadMessages.data[0].content[0].text.value;

    res.status(200).json({ response });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Error processing your request' });
  }
}
