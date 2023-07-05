import { Client, GatewayIntentBits } from 'discord.js';
import events from './events';
import 'dotenv/config';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

client.login(process.env.TOKEN)
  .then(() => events(client));