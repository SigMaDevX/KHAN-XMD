const { cmd } = require('../command');
const fetch = require('node-fetch');
const translate = require('@vitalets/google-translate-api');
const googleTTS = require('google-tts-api');

cmd({
    pattern: "shayari",
    desc: "Get a random shayari from Shizo API",
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

        // Generate audio of Urdu shayari
        const audioUrl = googleTTS.getAudioUrl(urduText, {
            lang: 'ur',
            slow: false,
            host: 'https://translate.google.com',
        });

        // Send both text and audio
        await conn.sendMessage(m.chat, {
            text: `${urduText}`,
            mentions: [m.sender]
        }, { quoted: m });

        await conn.sendMessage(m.chat, {
            audio: { url: audioUrl },
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: m });

    } catch (err) {
        console.error("Shayari Error:", err);
        return m.reply("❌ شاعری حاصل کرنے میں ناکام۔ بعد میں کوشش کریں۔");
    }
});
