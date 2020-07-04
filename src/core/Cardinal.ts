import { Client } from 'discord.js';
import {CardinalRegistry} from '.';
import onMessage from './Dispatcher';
import {info, error} from './Logger';

export default class Cardinal {

  public client = new Client();
  public registry = new CardinalRegistry(this);

  public constructor() {
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
      this.client.on('message', onMessage(this));
    } catch (e) {
      error('Something went wrong calling Cardinal#login().');
      error(e.message);
      process.exit(1);
    }
  }

}

