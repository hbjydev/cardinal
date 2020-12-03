import Command from "../../core/Command";
import {Message, MessageEmbed} from "discord.js";
import ContextError from "../../core/errors/ContextError";
import MacroService from "../../services/MacroService";

export default class CreateMacroCommand extends Command {
  public name = 'macro';
  public description = 'Creates or views a guild macro.';

  public usage = '<name> [content]';

  public async run(message: Message, ...args: string[]): Promise<void> {
    if (!message.guild) {
      throw new ContextError('guild');
    }

    const ms = new MacroService(message.guild);

    const [ preName, ...contentArr ] = args;
    const name = preName.toLowerCase();

    if (args.length > 1) {
      const content = contentArr.join(' ');
      const { existed, result } = await ms.getOrCreateMacro(name, content);

      if (existed == false) {
        message.channel.send(new MessageEmbed({
          title: 'Created new macro.',
          fields: [
            { name: 'Name', value: '`' + result.name + '`', inline: true },
            { name: 'Example', value: '`' + this.cardinal.prefix + result.name + '`', inline: true },
            { name: 'Content', value: content }
          ],
          color: '#66ff66'
        }));
        return;
      } else {
        throw new Error('A macro with that name already exists, so no action has been taken.');
      }
    } else {
      const macros = await ms.getGuildMacros();
      const macro = macros.find(m => m.name == name);
      if (macro !== undefined) {
        message.channel.send(new MessageEmbed({
          title: 'Found a macro.',
          fields: [
            { name: 'Name', value: '`' + macro.name + '`', inline: true },
            { name: 'Example', value: '`' + this.cardinal.prefix + macro.name + '`', inline: true },
            { name: 'Content', value: macro.content }
          ]
        }));
      } else {
        throw new Error('A macro with that name does not exist.');
      }
    }
  }
}
