import { readdirSync } from 'node:fs';
import { join } from 'node:path';

export default function events(client: any) {
	const eventsPath = join(__dirname, 'events');
	const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

	for (const file of eventFiles) {
		const filePath = join(eventsPath, file);
		const event = require(filePath);
		if (event.once) {
			client.once(event.name, (...args: any) => event.execute(...args));
		} else {
			client.on(event.name, (...args: any) => event.execute(...args));
		}
	};
	
}