import { Message, MessageEmbed, PermissionString } from 'discord.js';
import Command from '../../core/Command';
import { getUserFromMention } from '../../core/Util';

export default class BanCommand extends Command {
  public name = 'ban';

  public description = 'Bans a user from your guild.';

  public permissions = [
    <const>'BAN_MEMBERS',
  ] as (PermissionString & 'BOT_OWNER')[];

  public usage = '<member> [...reason]';

  public async run(message: Message, ...args: string[]): Promise<void> {
    const [userMention, ...reasonArr] = args;
    if (!userMention.match(/<@!.*>/g)) {
      throw new Error('The first argument in the ban command should be a user mention.');
    }

    const user = getUserFromMention(this.cardinal.client, userMention);
    if (!user) throw new Error('That user either does not exist or is not a member of this guild.');

    const member = message.guild?.member(user);
    if (!member) throw new Error('That user either does not exist or is not a member of this guild.');

    const reason = reasonArr.join(' ').trim();

    await member.ban({ reason: reason ?? 'No reason given.' });

    const embed = new MessageEmbed();
    embed.setTitle('Member banned');
    embed.addField('Member', member.displayName, true);
    embed.addField('Reason', reason ?? 'No reason given.');
    embed.setThumbnail(user.displayAvatarURL({ dynamic: true }));
    embed.setColor('#ff0000');

    await message.channel.send(embed);
  }
}
