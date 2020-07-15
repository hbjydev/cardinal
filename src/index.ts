import 'dotenv/config';
import * as Sentry from '@sentry/node';
import { info } from './core/Logger';

import Cardinal from "./core";
import HelpCommand from './commands/util/help';
import KickCommand from './commands/mod/kick';
import BanCommand from './commands/mod/ban';
import AnimeCommand from './commands/fun/anime';
import MangaCommand from './commands/fun/manga';
import ShortenCommand from './commands/util/shorten';

if (process.env.SENTRY_DSN !== null) {
  info('Initializing Sentry integration...', 'sentry');
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}

// Create an instance of the bot
const bot = new Cardinal(
  process.env.PREFIX ?? '!',
  process.env.OWNERS.split(',') ?? []);

// Register commands
bot.registry.registerCommands(
  // Utility Commands
  HelpCommand,
  ShortenCommand,

  // Moderation commands
  KickCommand,
  BanCommand,

  // Anime/Manga commands
  AnimeCommand,
  MangaCommand
);

// Authenticate with Discord.
bot.login();

