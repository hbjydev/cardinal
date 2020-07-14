import { Collection, ClientEvents } from 'discord.js';
import Command from './Command';
import Cardinal from './Cardinal';
import {info, error} from './Logger';
import Event from './Event';

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

  public registerEvents(...events: (typeof Event)[]) {
    for(const event of events) {
      const ev = new event(this.cardinal);
      info(`Loading event handler for \`${ev.event}\` with description \`${ev.description}\``);
      try {
        this.cardinal.client.on(
          ev.event as keyof ClientEvents,
          (...args: unknown[]) => ev.run(...args)
        );
      } catch (e) {
        error(e.message ?? e);
        process.exit(1);
      }
    }
  }

}
