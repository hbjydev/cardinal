import { Collection } from 'discord.js';
import Command from './Command';
import Cardinal from './Cardinal';
import {info} from './Logger';

export default class CardinalRegistry {
  
  public commands = new Collection<String, Command>();

  public constructor (private cardinal: Cardinal) {}

  public registerCommands(...commands: (typeof Command)[]) {
    for(const command of commands) {
      const cmd = new command(this.cardinal);
      info(`Loading command ${cmd.name}...`);
      info(`Registering command ${cmd.name}...`);
      this.commands.set(cmd.name, cmd);
      info(`Calling #init on command ${cmd.name}...`);
      cmd.init();
    }

    info(`Loaded ${this.commands.size} commands.`);
  }

}
