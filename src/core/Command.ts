import { Message, PermissionString } from "discord.js";
import errorEmbed from "./ErrorEmbed";
import Cardinal from "./Cardinal";
import {error, info, warn} from "./Logger";

export default class Command {

  public name!: string;
  public description!: string | undefined;
  public permissions!: (PermissionString & 'BOT_OWNER')[];
  public usage!: string | undefined;

  public constructor(protected cardinal: Cardinal) {}

  public async run(message: Message, ...args: string[]): Promise<void> {
    warn(`Command has no run function.`, this.name);
    throw 'That command hasn\'t been implemented yet!';
  };
  public async init(): Promise<void> {
    info(`Command has no init function.`, 'init');
  };

  public async call(message: Message, ...args: string[]): Promise<void> {
    info(`Called: ${message.author.username}#${message.author.discriminator} (ID ${message.author.id})`, this.name);
    if(message.guild) {
      info(`Command called from guild ${message.guild.id}`, this.name);
    } else {
      info(`Command called from DMs`);
    }
    try {
      await this.run(message, ...args);
    } catch(e) {
      error(e.message ?? e, this.name);
      const embed = errorEmbed(e);
      message.channel.send(embed);
      await message.react('❌');
    }

    await message.react('✅');
  }
}
