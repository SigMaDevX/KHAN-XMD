const { cmd } = require('../command');
const config = require('../config');
const fetch = require('node-fetch');
const translate = require('@vitalets/google-translate-api');

cmd({
  pattern: "shayari",
  desc: "Get Hindi Shayari translated into Urdu",
  category: "fun",
  filename: __filename
}, async (conn, m, mData) => {
  try {
    const res = await fetch(`https://shizoapi.onrender.com/api/texts/shayari?apikey=shizo`);
    if (!res.ok) throw await res.text();

    const json = await res.json();
    const hindiText = json.result;

    const translated = await translate(hindiText, { to: 'ur' });

    const urduShayari = translated.text;
    await conn.sendMessage(m.chat, {
      text: urduShayari,
      mentions: [m.sender]
    }, { quoted: m });

  } catch (err) {
    console.error("Shayari Error:", err);
    await conn.sendMessage(m.chat, { text: '❌ Shayari fetch or translation failed.' }, { quoted: m });
  }
});
