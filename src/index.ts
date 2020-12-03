import 'dotenv/config';
import * as Sentry from '@sentry/node';
import { info } from './core/Logger';

import dbConfig from './ormconfig';

import { Cardinal } from './core';
import HelpCommand from './commands/util/help';
import KickCommand from './commands/mod/kick';
import BanCommand from './commands/mod/ban';
import AnimeCommand from './commands/fun/anime';
import MangaCommand from './commands/fun/manga';
import EvalCommand from './commands/util/eval';
import ListMacrosCommand from './commands/macros/list';
import CreateMacroCommand from './commands/macros/create';

if (process.env.SENTRY_DSN !== null) {
  info('Initializing Sentry integration...', 'sentry');
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}

// Create an instance of the bot
const bot = new Cardinal(
  process.env.PREFIX ?? '!',
  (process.env.OWNERS ?? '').split(',') ?? [],
);

// Register commands
bot.registry.registerCommands(
  // Utility Commands
  HelpCommand,
  EvalCommand,

  // Moderation commands
  KickCommand,
  BanCommand,

  // Anime/Manga commands
  AnimeCommand,
  MangaCommand,

  // Macro commands
  ListMacrosCommand,
  CreateMacroCommand
);

bot.connectDatabase(dbConfig);

// Authenticate with Discord.
bot.login();
