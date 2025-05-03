const fetch = require('node-fetch');
const translate = require('@vitalets/google-translate-api');
const { cmd } = require('../command');

cmd({
  pattern: "shayari",
  desc: "Hindi shayari translated to Urdu",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, {
  from, quoted, body, isCmd, command, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname,
  isMe, isOwner, groupMetadata, groupName, participants,
  groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    const apiKey = 'shizo';
    const res = await fetch(`https://shizoapi.onrender.com/api/texts/shayari?apikey=${apiKey}`);
    if (!res.ok) return reply(await res.text());

    const json = await res.json();
    const hindiShayari = json.result;

    const translated = await translate(hindiShayari, { to: 'ur' });

    const urduText = `*${translated.text}*`;
    await conn.sendMessage(from, { text: urduText, mentions: [sender] }, { quoted: m });

  } catch (e) {
    console.error(e);
    return reply("کچھ غلط ہو گیا، بعد میں دوبارہ کوشش کریں۔");
  }
});
