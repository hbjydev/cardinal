import { Message, MessageEmbed } from 'discord.js';
import Command from '../../core/Command';

export default class HelpCommand extends Command {
  public name = 'help';

  public description = 'Provides information about Cardinal\'s commands.';

  public usage = '[command]';

  public async run(message: Message, ...args: string[]) {
    if (args.length == 0) {
      const commands = this.cardinal.registry.commands.keys();

      const commandNames = [];
      for (const cmd of commands) {
        commandNames.push(cmd);
      }

      const embed = new MessageEmbed();
      embed.setColor('#7fffd4');
      embed.setTitle('Cardinal Help');
      embed.setDescription(`\`${commandNames.join('`, `')}\``);

      await message.channel.send(embed);
    } else {
      const [commandName] = args;
      const command = this.cardinal.registry.commands.get(commandName);

      if (!command) throw 'No such command found, can\'t produce help!';

      const embed = new MessageEmbed();
      embed.setColor('#7fffd4');
      embed.setTitle(`\`${command.name}\``);
      embed.setDescription(
        command.description ?? 'This command has no description',
      );

      if (command.permissions) {
        embed.addField(
          'Permissions Required',
          `\`${
            command.permissions.join('`, `')
          }\``,
        );
      }
      if (command.usage) embed.addField('Usage', command.usage);

      await message.channel.send(embed);
    }
  }
}
