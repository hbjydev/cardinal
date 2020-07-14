import { Message } from "discord.js";
import Cardinal from "./Cardinal";
import errorEmbed from "./ErrorEmbed";

const onMessage: (cardinal: Cardinal) => ((message: Message) => Promise<void>) = 
  (cardinal) => {
    return async (message: Message) => {
      if (message.author.bot) return;
      if (!message.content.startsWith(cardinal.prefix)) return;

      const [ commandName, ...args ] =
        message.content.substring(cardinal.prefix.length).split(' ');

      const command = cardinal.registry.commands.get(commandName);

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
        message.channel.send(embed);
        await message.react('❌');
        return;
      }

      await command?.call(message, ...args);
    };
  };

export default onMessage;
