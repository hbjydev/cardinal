import { Client } from 'discord.js';
import { CardinalRegistry } from '.';
import { Dispatcher } from './events/index';
import { info, error } from './Logger';

export default class Cardinal {
  public client = new Client();

  public registry = new CardinalRegistry(this);

  public constructor(public prefix: string, public owners: string[]) {
    info('Initializing Cardinal...', 'init');
  }

  /**
   * Authenticates the bot with Discord.
   *
   * @param token If not specified, this parameter will default to the
   *              DISCORD_TOKEN environment variable.
   */
  public async login(token = process.env.DISCORD_TOKEN) {
    try {
      await this.client.login(token);
      info('Successfully authenticated with Discord!');
      this.registry.registerEvents(Dispatcher);
    } catch (e) {
      error('Something went wrong calling Cardinal#login().');
      error(e.message);
      process.exit(1);
    }
  }
}
