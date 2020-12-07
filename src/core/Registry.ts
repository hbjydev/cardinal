import { Collection, ClientEvents } from 'discord.js';
import Command from './Command';
import Cardinal from './Cardinal';
import { info, error } from './Logger';
import Event from './Event';

type EventConstructor = new (cardinal: Cardinal) => Event<any>;

export default class CardinalRegistry {
  public commands = new Collection<string, Command>();

  public constructor(private cardinal: Cardinal) {}

  public registerCommands(...commands: typeof Command[]) {
    commands.forEach((CommandClass) => {
      const cmd = new CommandClass(this.cardinal);
      info(`Loading command ${cmd.name}...`);
      info(`Registering command ${cmd.name}...`);
      this.commands.set(cmd.name, cmd);
      info(`Calling #init on command ${cmd.name}...`);
      cmd.init();
    });

    info(`Loaded ${this.commands.size} commands.`);
  }

  public registerEvents(...events: EventConstructor[]) {
    events.forEach((EventClass) => {
      const ev = new EventClass(this.cardinal);
      info(
        `Loading event handler for \`${ev.event}\` with description \`${ev.description}\``,
      );
      try {
        this.cardinal.client.on(
          ev.event as keyof ClientEvents,
          (...args: unknown[]) => ev.run(...args),
        );
      } catch (e) {
        error(e.message ?? e);
        process.exit(1);
      }
    });
  }
}
