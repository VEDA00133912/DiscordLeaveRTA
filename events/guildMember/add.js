const { saveJoinTime } = require('../../function/mongodb');
const { createEmbed } = require('../../function/embed');
const { Events, userMention } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(client, member) {
        try {
            const joinTime = new Date();
            await saveJoinTime(member.id, joinTime);
            console.log(`[SUCCESS] ${member.id}のデータを保存しました`);
            const user = userMention(member.id);

            const embed = createEmbed(
                `誰か来たよ`,
                `**${user} が参加しました**\n
                参加日: \`${joinTime.toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })}\``
            );

            const channel = client.channels.cache.get(config.rtaChannelId);
            if (channel) {
                await channel.send({ embeds: [embed] });
            } else {
                console.error('[ERROR] 指定されたチャンネルが見つかりません');
            }
        } catch (error) {
            console.error('[ERROR] エラーが発生しました（guildMemberAdd）:', error);
        }
    },
};
