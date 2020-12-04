import Command from "../../core/Command";
import {Message, MessageEmbed, PermissionString} from "discord.js";
import ContextError from "../../core/errors/ContextError";
import MacroService from "../../services/MacroService";

export default class DeleteMacroCommand extends Command {
  public name = 'delmacro';
  public description = 'Deletes a guild macro.';

  public usage = '<name>';

  public permissions = [ <const>'ADMINISTRATOR' ] as (PermissionString & 'BOT_OWNER')[];

  public async run(message: Message, ...args: string[]): Promise<void> {
    if (!message.guild) {
      throw new ContextError('guild');
    }

    const ms = new MacroService(message.guild);

    const [ preName ] = args;
    const name = preName.toLowerCase();

    const { success, reason } = await ms.tryDeleteGuildMacro(name, message.member!!);

    if (success !== false) {
      message.channel.send(new MessageEmbed({
        title: 'Deleted a macro.',
        fields: [
          { name: 'Name', value: '`' + name + '`', inline: true },
        ],
        color: '#ff6666'
      }));
      return;
    } else {
      switch (reason) {
        case 'DBERROR':
          throw new Error('Something went wrong on our end. We\'ll look into this once we can.');

        case 'NOEXISTS':
          throw new Error('A macro by that name does not exist in this guild.');

        case 'PERMISSIONS':
          throw new Error('You do not have permission to delete that macro.');
      }
    }
  }
}
