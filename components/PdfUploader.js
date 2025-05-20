// components/PdfUploader.js
import { useState } from 'react';

export default function PdfUploader({ onExtracted }) {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const res = await fetch('/api/upload-pdf', {
      method: 'POST',
      body: file,
    });

    const data = await res.json();
    setLoading(false);
    onExtracted(data.content);
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {loading && <p>Yükleniyor...</p>}
    </div>
  );
}
