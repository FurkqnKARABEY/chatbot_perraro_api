# Perraro Electric Bike Chatbot

Shopify mağazası için Vercel'de barındırılan ChatGPT tabanlı yardım masası chatbotu.

## Kurulum

1. Vercel'de environment variables ayarlayın:
   - `OPENAI_API_KEY`: OpenAI API anahtarınız
   - `ASSISTANT_ID`: GPTs asistan ID'niz

2. Shopify tema dosyasına widget scriptini ekleyin:
```liquid
<script src="https://your-vercel-app-url.vercel.app/shopify-chat-widget.js"></script>
<link rel="stylesheet" href="https://your-vercel-app-url.vercel.app/chat-styles.css">
