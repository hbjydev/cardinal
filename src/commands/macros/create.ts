import Command from "../../core/Command";
import {Message, MessageEmbed} from "discord.js";
import ContextError from "../../core/errors/ContextError";
import MacroService from "../../services/MacroService";
import fetch from 'node-fetch';

export default class CreateMacroCommand extends Command {
  public name = 'macro';
  public description = 'Creates or views a guild macro.';

  public usage = '<name> [content]';

  public async run(message: Message, ...args: string[]): Promise<void> {
    if (!message.guild) {
      throw new ContextError('guild');
    }

    if (args.length == 0) {
      throw new Error(`Invalid arguments. Check \`${this.cardinal.prefix}help\` for command usage info.`);
    }

    const ms = new MacroService(message.guild);

    const [ preName, ...contentArr ] = args;
    const name = preName.toLowerCase();

    if (args.length > 1) {
      const content = contentArr.join(' ');
      const { result } = await ms.createMacro(name, content);

      message.channel.send(new MessageEmbed({
        title: 'Created new macro.',
        fields: [
          { name: 'Name', value: '`' + result.name + '`', inline: true },
          { name: 'Example', value: '`' + this.cardinal.prefix + result.name + '`', inline: true },
          { name: 'Content', value: content }
        ],
        color: '#66ff66'
      }));
    } else {
      const macro = await ms.getMacro(name);

      if (macro == undefined) {
        throw new Error('A macro with that name does not exist.');
      }

      const responses = await macro.responses!!;

      if (responses.length !== 0) {
        const data = await fetch('https://hasteb.in/documents', {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: responses.map(r => `${r.id} => ${r.content}`).join('\n'),
        });
        const json = await data.json();

        if (!json.key) {
          throw new Error('Something went wrong on hasteb.in!');
        }

        const url = `https://hasteb.in/${json.key}.txt`;

        message.channel.send(new MessageEmbed({
          title: 'Found a macro.',
          fields: [
            { name: 'Name', value: '`' + macro.name + '`', inline: true },
            { name: 'Example', value: '`' + this.cardinal.prefix + macro.name + '`', inline: true },
            { name: 'Responses', value: url }
          ]
        }));
      } else {
        throw new Error('A macro with that name does not exist.');
      }
    }
  }
}
