// Copyright 2021 Hayden Young. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import Command from '../../core/Command';
import { Message, MessageEmbed } from 'discord.js';
import ContextError from '../../core/errors/ContextError';
import MacroService from '../../services/MacroService';
import Macro from '../../models/Macro.entity';

export default class ListMacrosCommand extends Command {
  public name = 'macros';
  public description = 'Lists all server macros.';

  public usage = '';

  public async run(message: Message, ...args: string[]): Promise<void> {
    if (!message.guild) {
      throw new ContextError('guild');
    }

    const ms = new MacroService(message.guild);

    const macros = await ms.getGuildMacros();

    const embed = new MessageEmbed({
      title: `Macros for ${message.guild.name}`,
      description:
        macros.length == 0 ? 'No macros available.' : buildList(macros),
    });

    message.channel.send(embed);
  }
}

const buildList = (macros: Macro[]): string =>
  '`' + macros.map((m) => m.name).join('`, `') + '`';
