import { Client, DiscordAPIError, Events, Message, TextChannel } from 'discord.js';
import config from '../util/constants';
import track from '../routine/track';
import iMessage from '../interface/iMessage';

const { code, mentionId, channelId, messageId } = config;

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client: Client) {
		const channel = client.channels.cache.get(channelId) as TextChannel;
		if (!channel) throw new Error('Adicione o ID de um canal.');

		try {
			const message = await channel.messages.fetch(messageId || '123');
			if (!code) throw new Error('Adicione um código de rastreio.');

			start({ code, mentionId, message });
		} catch (e: unknown) {
			if (e instanceof DiscordAPIError) return channel.send(error(e));
		}

	},
};

const start = ({ code, mentionId, message }: iMessage): void => {
	track({ code, mentionId, message });
	setInterval(() => track({ code, mentionId, message }), 10 * 60000)
}

const error = (error: DiscordAPIError): string => {
	return {
		10008: 'Copie o **ID** dessa mensagem é coloque em **src > util > constant > messageId**'
	}[error.code] || error.message;
}