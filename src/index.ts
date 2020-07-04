import 'dotenv/config';
import Cardinal from "./core";
import HelpCommand from './commands/help';
import KickCommand from './commands/mod/kick';

// Create an instance of the bot
const bot = new Cardinal(process.env.PREFIX ?? '!');

// Register commands
bot.registry.registerCommands(HelpCommand, KickCommand);

// Authenticate with Discord.
bot.login();

