import { Message, MessageEmbed } from 'discord.js';
import { captureException } from '@sentry/node';
import errorEmbed from '../ErrorEmbed';
import Event from '../Event';
import { info } from '../Logger';
import MacroService from '../../services/MacroService';

export default class Dispatcher extends Event<'message'> {
  public event = <const>'message';

  public description = 'Handles command dispatching.';

  public async run(message: Message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(this.cardinal.prefix)) return;

    message.channel.startTyping();
    const start = Date.now();

    const [commandName, ...args] = message.content.substring(this.cardinal.prefix.length).split(' ');

    const command = this.cardinal.registry.commands.get(commandName);

    if (!command) {
      if (message.guild) { 
        const ms = new MacroService(message.guild);
        const macro = await ms.getMacro(commandName);

        if (macro !== undefined) {
          const responses = await macro.responses!!;
          if (responses.length == 0) {
            await message.react('❌');
            return;
          }

          const response = responses[Math.floor(Math.random() * responses.length)];
          message.channel.send(new MessageEmbed({
            description: response.content?.startsWith('img:') ? undefined : response.content!!,
            image: response.content?.startsWith('img:') ? { url: response.content?.replace('img:', '') } : undefined,
            footer: { text: `Response ID ${response.id}` }
          }));
          message.channel.stopTyping();
          return;
        }
      }

      await message.react('❌');
      return;
    }

    try {
      const perms = command.permissions ?? [];
      perms.forEach((perm) => {
        if (
          perm === 'BOT_OWNER'
          && !this.cardinal.owners.includes(message.author.id)
        ) {
          throw new Error('This command is restricted to bot owners only.');
        } else if (message.guild) {
          if (!message.member?.hasPermission(perm)) throw new Error('You do not have permission to use this command.');
        }
      });
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

    info(`Finished: ${(Date.now() - start)}ms`, command?.name);
    message.channel.stopTyping();
  }
}
