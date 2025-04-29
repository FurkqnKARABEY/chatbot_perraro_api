Perraro Electric Bike Chatbot
Shopify mağazaları için ChatGPT tabanlı yardım masası chatbotu
Bu proje, Vercel üzerinde barındırılan ve OpenAI GPT teknolojisiyle desteklenen bir müşteri destek widget'ıdır. Özellikle Perraro Electric Bike mağazası için tasarlanmıştır, ancak farklı Shopify mağazalarına da kolayca entegre edilebilir.

Özellikler
OpenAI ChatGPT teknolojisi ile doğal dilde destek

Hızlı ve hafif Shopify entegrasyonu

Vercel üzerinde kolay dağıtım

Stiller ve script dosyaları harici olarak yüklenir

Kurulum
1. Ortam Değişkenlerini Ayarlayın (Vercel)
Vercel projenizin ortam değişkenlerini aşağıdaki gibi ayarlayın:

OPENAI_API_KEY: OpenAI API anahtarınız

ASSISTANT_ID: GPTs panelinizden aldığınız özel asistan ID’si

2. Shopify Tema Dosyasına Widget’ı Ekleyin
Aşağıdaki script ve stil dosyalarını Shopify temanıza (genellikle theme.liquid) <head> veya <body> tag’lerinin içine ekleyin:

html
Kodu kopyala
<script src="https://your-vercel-app-url.vercel.app/shopify-chat-widget.js"></script>
<link rel="stylesheet" href="https://your-vercel-app-url.vercel.app/chat-styles.css">
your-vercel-app-url kısmını kendi Vercel uygulama adresinizle değiştirin.

Lisans
Bu proje MIT lisansı ile lisanslanmıştır.
