class PerraroChatWidget {
  constructor() {
    this.initWidget();
  }

  initWidget() {
    this.createButton();
    this.createChatContainer();
    this.setupEventListeners();
  }

  createButton() {
    this.chatButton = document.createElement('button');
    this.chatButton.id = 'perraro-chat-button';
    this.chatButton.innerHTML = 'Perraro Help';
    document.body.appendChild(this.chatButton);
  }

  createChatContainer() {
    this.chatContainer = document.createElement('div');
    this.chatContainer.id = 'perraro-chat-container';
    this.chatContainer.innerHTML = `
      <div class="chat-header">
        <h3>Perraro Electric Bike Help Desk</h3>
        <button id="close-chat">×</button>
      </div>
      <div id="chat-messages"></div>
      <div class="chat-input">
        <input type="text" id="chat-input" placeholder="Type your question...">
        <button id="send-message">Send</button>
      </div>
    `;
    document.body.appendChild(this.chatContainer);
    this.chatContainer.style.display = 'none';
  }

  setupEventListeners() {
    this.chatButton.addEventListener('click', () => {
      this.chatContainer.style.display = this.chatContainer.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('close-chat').addEventListener('click', () => {
      this.chatContainer.style.display = 'none';
    });

    document.getElementById('send-message').addEventListener('click', this.sendMessage.bind(this));
    document.getElementById('chat-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  async sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;

    this.addMessage('user', message);
    input.value = '';

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }],
          assistantId: 'asst_3xXmxBPDkSJ028i06zdKzrGV' // GPTs ID'niz
        }),
      });

      const data = await response.json();
      this.addMessage('assistant', data.response);
    } catch (error) {
      console.error('Error:', error);
      this.addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
    }
  }

  addMessage(role, content) {
    const messagesDiv = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    messageDiv.textContent = content;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
}

// Shopify theme için initialization
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    new PerraroChatWidget();
  });
}
