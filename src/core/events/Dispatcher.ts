import { Message } from "discord.js";
import errorEmbed from "../ErrorEmbed";
import Event from "../Event";
import {captureException} from "@sentry/node";

export default class Dispatcher extends Event<'message'> {
  public event = <const>'message';
  public description = "Handles command dispatching.";

  public async run(message: Message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(this.cardinal.prefix)) return;

    const [ commandName, ...args ] =
      message.content.substring(this.cardinal.prefix.length).split(' ');

    const command = this.cardinal.registry.commands.get(commandName);

    if(!command) {
      await message.react('❌');
      return;
    }

    try {
      if(message.guild) {
        const perms = command.permissions ?? [];
        perms.forEach((perm) => {
          if(!message.member?.hasPermission(perm))
            throw 'You do not have permission to use this command.';
        });
      }
    } catch (e) {
      const embed = errorEmbed(e);
      if (typeof e !== 'string' && process.env.SENTRY_DSN !== null) {
        captureException(e as Error);
      }
      message.channel.send(embed);
      await message.react('❌');
      return;
    }

    await command?.call(message, ...args);
  }
}

