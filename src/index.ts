import { Client, GatewayIntentBits } from 'discord.js';
import events from './events';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

client.login(process.env.TOKEN)
  .then(() => events(client));