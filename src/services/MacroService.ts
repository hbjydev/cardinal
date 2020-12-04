import {Guild, GuildMember} from "discord.js";
import Macro from "../models/Macro.entity";
import GuildService from './GuildService';

export default class MacroService {
  private guildService: GuildService;

  public constructor (guild: Guild) {
    this.guildService = new GuildService(guild);
  }

  public async getOrCreateMacro(name: string, content: string): Promise<(GOCResponse<Macro>)> {
    const { result: guild } = await this.guildService.getOrCreateGuild();
    const existingMacro = await Macro.findOne(undefined, { where: { name, guild: guild } });

    if (existingMacro === undefined) {
      const macro = new Macro();

      macro.name = name;
      macro.content = content;

      macro.guild = guild;

      await macro.save();

      return { existed: false, result: macro };
    } else {
      return { existed: true, result: existingMacro };
    }
  } 

  public async getGuildMacros(): Promise<Macro[]> {
    const { result: guild } = await this.guildService.getOrCreateGuild();
    const macros = await guild.macros!!;
    return macros;
  }

  public async tryDeleteGuildMacro(name: string, member: GuildMember): Promise<{ success: boolean, reason?: 'PERMISSIONS' | 'DBERROR' | 'NOEXISTS'}> {
    if (!member.hasPermission('ADMINISTRATOR')) return { success: false, reason: 'PERMISSIONS' };
    const { result: guild } = await this.guildService.getOrCreateGuild();
    const macros = await guild.macros!!;
    const macro = macros.find(m => m.name == name);
    if (!macro) return { success: false, reason: 'NOEXISTS' };
    
    await macro.remove();

    return { success: true };
  }
}
