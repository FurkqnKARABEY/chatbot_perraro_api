import fs from 'fs';
import pdf from 'pdf-parse';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function loadPDF() {
  const dataBuffer = fs.readFileSync('./public/data/perraro-user-manual.pdf');
  const pdfData = await pdf(dataBuffer);
  const text = pdfData.text;

  const chunks = text.match(/(.|[\r\n]){1,1000}/g); // 1000 karakterlik parçalara böl

  const embeddings = [];

  for (const chunk of chunks) {
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: chunk,
    });

    embeddings.push({
      embedding: embedding.data[0].embedding,
      text: chunk,
    });
  }

  fs.writeFileSync('./data/pdf-embeddings.json', JSON.stringify(embeddings));
  console.log('PDF embedding verisi oluşturuldu.');
}

loadPDF();
