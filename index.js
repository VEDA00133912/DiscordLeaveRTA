const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const { connectToDB } = require('./function/mongodb');
const TOKEN = process.env.DISCORD_TOKEN;
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

const getEventFiles = (dir) => 
  fs.readdirSync(dir).flatMap(file => {
    const filePath = path.join(dir, file);  
    return fs.statSync(filePath).isDirectory()
      ? getEventFiles(filePath)  
      : file.endsWith('.js') ? [filePath] : [];  
  });

getEventFiles('./events').forEach(file => {
  try {
    const event = require(path.join(__dirname, file));  
    client[event.once ? 'once' : 'on'](event.name, (...args) => event.execute(client, ...args));
    console.log(`[SUCCESS] Loading event from: ${file}`);  
  } catch (err) {
    console.error(`[ERROR] Error loading event ${file}:`, err);
  }
});

connectToDB();
client.login(TOKEN);
