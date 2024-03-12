import './lib/setup';
import '@sapphire/plugin-hmr/register'
import '@sapphire/plugin-api/register';

import { LogLevel, SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits, OAuth2Scopes } from 'discord.js';
import { methods,Route,type ApiRequest,type ApiResponse } from '@sapphire/plugin-api'

export class UserRoute extends Route {
	public constructor(
		context: Route.LoaderContext,
		options: Route.Options
	) {
		super(context, {...options, route: ''});
	}

	public [methods.GET](_request: ApiRequest, response: ApiResponse) {
		return response.json({ message: 'Hello, World!' });
	}

	public [methods.POST](_request: ApiRequest, response: ApiResponse) {
		return response.json({ message: 'Hello, World!' });
	}
}

const client = new SapphireClient({
	defaultPrefix: '!',
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Debug
	},
	intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
	loadMessageCommandListeners: true,
	hmr: {
		enabled: process.env.NODE_ENV === 'development',
	},
	api: {
		auth: {
			id: process.env.CLIENT_ID!,
			secret: process.env.CLIENT_SECRET!,
			scopes: [OAuth2Scopes.Identify,OAuth2Scopes.Guilds],
			domainOverwrite: "127.0.0.1"
		},
	}
});

const main = async () => {
	try {
		client.logger.info('Logging in');
		await client.login();
		client.logger.info('logged in');
	} catch (error) {
		client.logger.fatal(error);
		await client.destroy();
		process.exit(1);
	}
};

void main();
