// index.js
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// अपने Telegram Bot Token यहाँ डालें
const TELEGRAM_TOKEN = "8208225445:AAHjAkkvcbUqcMkwId63IB-4QMePaauPNpo";
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

app.use(express.json());

// Telegram webhook route
app.post("/webhook", async (req, res) => {
  const message = req.body.message;

  if (message && message.text) {
    const chatId = message.chat.id;
    const userText = message.text;

    let reply = "🙏 आपका स्वागत है! आप ने लिखा: " + userText;

    // रिप्लाई भेजना
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: reply,
    });
  }

  res.sendStatus(200);
});

// Home route
app.get("/", (req, res) => {
  res.send("🚀 Telegram Bot Backend is Running on Railway!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
