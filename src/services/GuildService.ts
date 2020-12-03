import { Guild } from "discord.js";
import CGuild from "../models/Guild.entity";

export default class GuildService {
  public constructor (private guild: Guild) {}

  public async getOrCreateGuild(): Promise<(GOCResponse<CGuild>)> {
    const existingGuild = await CGuild.findOne(undefined, { where: { guildId: this.guild.id } });

    if (existingGuild === undefined) {
      const guild = new CGuild();

      guild.guildId = this.guild.id;

      await guild.save();

      return { existed: false, result: guild };
    } else {
      return { existed: true, result: existingGuild };
    }
  } 
}
