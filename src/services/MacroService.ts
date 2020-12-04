import {Guild, GuildMember} from "discord.js";
import Macro from "../models/Macro.entity";
import GuildService from './GuildService';
import MacroResponse from "../models/MacroResponse.entity";
import { GOCResponse } from '../GOCResponse';

export default class MacroService {
  private guildService: GuildService;

  public constructor (guild: Guild) {
    this.guildService = new GuildService(guild);
  }

  public async getMacro(name: string): Promise<Macro | undefined> {
    const { result: guild } = await this.guildService.getOrCreateGuild();
    const macros = await Macro.find({ where: { name, guild } });

    if (macros.length == 0) {
      return undefined;
    }

    const macro = macros[Math.floor(Math.random() * macros.length)];

    return macro;
  }

  public async createMacro(name: string, content: string): Promise<(GOCResponse<Macro>)> {
    const { result: guild } = await this.guildService.getOrCreateGuild();
    const existingMacro = await Macro.findOne(undefined, { where: { name, guild: guild } });

    if (existingMacro === undefined) {
      const macro = new Macro();
      macro.name = name;
      macro.guild = Promise.resolve(guild);
      await macro.save();

      const response = new MacroResponse();
      response.macro = Promise.resolve(macro);
      response.content = content;
      await response.save();

      return { existed: false, result: macro };
    } else {
      const response = new MacroResponse();
      response.macro = Promise.resolve(existingMacro);
      response.content = content;
      await response.save();

      return { existed: true, result: existingMacro };
    }
  }

  public async getGuildMacros(name?: string): Promise<Macro[]> {
    const { result: guild } = await this.guildService.getOrCreateGuild();
    const macros = await guild.macros;

    if (macros == undefined) return [];

    if (name !== undefined) {
      return macros.filter(m => m.name == name);
    }

    return macros;
  }

  public async tryDeleteGuildMacro(id: string | number, member: GuildMember): Promise<{ success: boolean, reason?: 'PERMISSIONS' | 'DBERROR' | 'NOEXISTS'}> {
    if (!member.hasPermission('ADMINISTRATOR')) return { success: false, reason: 'PERMISSIONS' };
    const { result: guild } = await this.guildService.getOrCreateGuild();

    const response = await MacroResponse.findOne(typeof id == 'string' ? parseInt(id) : id);
    if (!response) return { success: false, reason: 'NOEXISTS' };

    const macro = await response.macro!;
    if ((await macro.guild!).guildId! !== guild.guildId) return { success: false, reason: 'NOEXISTS' }

    await response.remove();
    if ((await macro.responses!).length == 0) await macro.remove();

    return { success: true };
  }
}
