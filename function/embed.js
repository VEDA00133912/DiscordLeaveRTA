const { EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    createEmbed: (title, description) => {
        try {
            return new EmbedBuilder()
                .setColor(Colors.Blue) 
                .setTitle(title)
                .setDescription(description)
                .setFooter({ text: 'RTA-BOT' })
                .setTimestamp();
        } catch (err) {
            console.error('[ERROR] Error creating embed:', err);
            return new EmbedBuilder()
                .setColor(Colors.Red)
                .setTitle('エラー')
                .setDescription('Embed作成中にエラーが発生しました')
                .setFooter({ text: 'RTA-BOT' })
                .setTimestamp();
        }
    },
};