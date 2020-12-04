import { Message, PermissionString } from "discord.js";
import errorEmbed from "./ErrorEmbed";
import Cardinal from "./Cardinal";
import { error, warn, debug } from "./Logger";

export type Permission = (PermissionString & "BOT_OWNER")[];

export default class Command {
  public name!: string;

  public description!: string | undefined;

  public permissions!: Permission;

  public usage!: string | undefined;

  public constructor(protected cardinal: Cardinal) {}

  // eslint-disable-next-line
  public async run(message: Message, ...args: string[]): Promise<void> {
    warn("Command has no run function.", this.name);
    throw new Error("That command hasn't been implemented yet!");
  }

  public async init(): Promise<void> {
    debug(`Command \`${this.name}\` has no init function.`, "init");
  }

  public async call(message: Message, ...args: string[]): Promise<void> {
    debug(
      `Called: ${message.author.username}#${message.author.discriminator} (ID ${message.author.id})`,
      this.name,
    );
    if (message.guild) {
      debug(`Command called from guild ${message.guild.id}`, this.name);
    } else {
      debug("Command called from DMs");
    }
    try {
      await this.run(message, ...args);
    } catch (e) {
      error(e.message ?? e, this.name);
      const embed = errorEmbed(e);
      message.channel.send(embed);
      await message.react("❌");
    }

    await message.react("✅");
  }
}
