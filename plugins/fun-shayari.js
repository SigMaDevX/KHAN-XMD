const { cmd } = require('../command')
const fetch = require('node-fetch')
const config = require('../config')

cmd({
  pattern: "shayari",
  desc: "Get Hindi Shayari with Roman Urdu style",
  category: "fun",
  filename: __filename
}, async (conn, m, msg) => {
  try {
    let res = await fetch(`https://shizoapi.onrender.com/api/texts/shayari?apikey=shizo`);
    if (!res.ok) throw await res.text();
    let json = await res.json();
    let hindi = json.result.trim();

    let roman = transliterateToRoman(hindi);

    let caption = `${roman}`;
    await conn.sendMessage(m.chat, { text: caption, mentions: [m.sender] }, { quoted: m });

  } catch (err) {
    console.error("Shayari Error:", err);
    return m.reply("❌ Shayari fetch/transliteration failed.");
  }
});

// Simple Hindi-to-Roman Urdu transliterator
function transliterateToRoman(text) {
  const map = {
    'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
    'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
    'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n', 'ँ': 'n', 'ः': 'h',
    'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh',
    'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n', 'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
    'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
    'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h',
    'ज्ञ': 'gy', 'त्र': 'tr', 'क्ष': 'ksh',
    'ऋ': 'ri', 'श्र': 'shr',
    ' ' : ' ', '\n': '\n'
  };

  return [...text].map(char => map[char] || char).join('');
}
