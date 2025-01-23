const { Events, userMention } = require('discord.js');
const config = require('../../config.json');
const { calculateDuration } = require('../../function/mongodb');
const { createEmbed } = require('../../function/embed');
const { deleteUserData } = require('../../function/mongodb'); 

module.exports = {
    name: Events.GuildMemberRemove,
    async execute(client, member) {
        try {
            const { duration, joinDate } = await calculateDuration(member.id);
            const user = userMention(member.id);

            const embed = createEmbed(
                '誰か消えたよ',
                `**${user} が脱退しました**\n
                参加日: \`${joinDate}\`\n` +
                `滞在期間: \`${duration}\``
            );

            const channel = client.channels.cache.get(config.rtaChannelId);
            if (channel) {
                await channel.send({ embeds: [embed] });
            } else {
                console.error('[ERROR] 指定されたチャンネルが見つかりません');
            }

            await deleteUserData(member.id);
            console.log(`[SUCCESS] ${member.id}のデータを削除しました`);
        } catch (error) {
            console.error('[ERROR] エラーが発生しました（guildMemberRemove）:', error);
        }
    },
};