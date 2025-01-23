const { Events, ActivityType } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.user.setActivity('即抜けうんち野郎を監視中', {
      type: ActivityType.Custom, 
    });
  },
};
