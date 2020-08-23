import { Message, MessageEmbed, PermissionString } from 'discord.js';
import Command from '../../core/Command';
import { getUserFromMention } from '../../core/Util';

export default class KickCommand extends Command {
  public name = 'kick';

  public description = 'Kicks a user from your guild.';

  public permissions = [
    <const>'KICK_MEMBERS',
  ] as (PermissionString & 'BOT_OWNER')[];

  public usage = '<member> [...reason]';

  public async run(message: Message, ...args: string[]): Promise<void> {
    const [userMention, ...reasonArr] = args;
    if (!userMention.match(/<@!.*>/g)) {
      throw 'The first argument in the kick command should be a user mention.';
    }

    const user = getUserFromMention(this.cardinal.client, userMention);
    if (!user) throw 'That user either does not exist or is not a member of this guild.';

    const member = message.guild?.member(user);
    if (!member) throw 'That user either does not exist or is not a member of this guild.';

    const reason = reasonArr.join(' ').trim();

    await member.kick(reason ?? 'No reason given.');

    const embed = new MessageEmbed();
    embed.setTitle('Member kicked');
    embed.addField('Member', member.displayName, true);
    embed.addField('Reason', reason ?? 'No reason given.');
    embed.setThumbnail(user.displayAvatarURL({ dynamic: true }));
    embed.setColor('#ff0000');

    await message.channel.send(embed);
  }
}
