import fetch from 'node-fetch';
import translate from '@vitalets/google-translate-api';
import { cmd } from '../command';

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
    const shizokeys = 'shizo';
    const res = await fetch(`https://shizoapi.onrender.com/api/texts/shayari?apikey=${shizokeys}`);
    if (!res.ok) return reply(await res.text());

    const json = await res.json();
    const hindiShayari = json.result;

    const translated = await translate(hindiShayari, { to: 'ur' });

    const finalText = `*${translated.text}*`;
    await conn.sendMessage(from, { text: finalText, mentions: [sender] }, { quoted: m });

  } catch (e) {
    console.error(e);
    return reply("کوئی خرابی ہوئی۔ دوبارہ کوشش کریں۔");
  }
});
