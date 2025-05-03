const { cmd } = require('../command');
const fetch = require('node-fetch');

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
        const text = json.result;

        await conn.sendMessage(m.chat, {
            text,
            mentions: [m.sender]
        }, { quoted: m });

    } catch (err) {
        console.error("Shayari Error:", err);
        return m.reply("❌ Failed to fetch shayari. Try again later.");
    }
});
