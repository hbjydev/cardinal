// Copyright 2021 Hayden Young. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import { Client } from 'discord.js';
import { CardinalRegistry } from '.';
import { Dispatcher } from './events/index';
import { info, error } from './Logger';
import { createConnection, ConnectionOptions } from 'typeorm';
import createServer from '../rcon';

export default class Cardinal {
  public client = new Client();

  public registry = new CardinalRegistry(this);

  public commandReaction = process.env.COMMAND_REACTION ?? '👀';

  public rconServer = createServer(this);

  public constructor(public prefix: string, public owners: string[]) {
    info('Initializing Cardinal...', 'init');
  }

  /**
   * Authenticates the bot with Discord.
   *
   * @param token If not specified, this parameter will default to the
   *              DISCORD_TOKEN environment variable.
   */
  public async login(token = process.env.DISCORD_TOKEN): Promise<void> {
    try {
      await this.client.login(token);
      info('Successfully authenticated with Discord!');
      this.registry.registerEvents(Dispatcher);
      this.rconServer.listen(9000);
    } catch (e) {
      error('Something went wrong calling Cardinal#login().');
      error(e.message);
      process.exit(1);
    }
  }

  /**
   * Connects the bot to a database.
   *
   * @param dbUri The database URI to connect using.
   */
  public async connectDatabase(config: ConnectionOptions): Promise<void> {
    try {
      await createConnection(config);
    } catch (e) {
      error('Failed to connect to database.', 'db');
      error(e.message, 'db');
      process.exit(1);
    }
  }
}
