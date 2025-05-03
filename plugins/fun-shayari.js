const { cmd } = require('../command');
const fetch = require('node-fetch');
const translate = require('@vitalets/google-translate-api');

cmd({
    pattern: "shayari",
    desc: "Get a random shayari in Urdu",
    category: "fun",
    filename: __filename
}, async (conn, m, msg) => {
    try {
        const shizoKey = 'shizo';
        const res = await fetch(`https://shizoapi.onrender.com/api/texts/shayari?apikey=${shizoKey}`);

        if (!res.ok) throw await res.text();

        const json = await res.json();
        const englishText = json.result;

        // Translate to Urdu
        const translated = await translate(englishText, { to: 'ur' });
        const urduText = translated.text;

        // Send Urdu shayari
        await conn.sendMessage(m.chat, {
            text: `*اردو شاعری:*\n\n${urduText}`,
            mentions: [m.sender]
        }, { quoted: m });

    } catch (err) {
        console.error("Shayari Error:", err);
        return m.reply("❌ شاعری حاصل کرنے میں ناکام۔ بعد میں کوشش کریں۔");
    }
});
