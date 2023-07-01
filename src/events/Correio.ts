import { Events } from 'discord.js';
import { config } from '../utils/constants';
import track from '../routine/track';

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client: any) {

		const { code, mentionId, channelId, messageId } = config;

		const channel = client.channels.cache.get(channelId);
		if (!channel) throw new Error('Canal inválido.');

		const message = await channel.messages.fetch(messageId);
		if (!messageId) return channel.send('Copie o **ID** dessa mensagem é coloque em **src > utils > constants > messageId** \nCaso não queira fazer isso espere **10 minuto(s)**.');

		track(code, mentionId, message);
		setInterval(() => {
			track(code, mentionId, message);
		}, 10 * 60000);
	},
};