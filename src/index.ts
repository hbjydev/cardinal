import 'dotenv/config';
import Cardinal from "./core";
import HelpCommand from './commands/help';

// Create an instance of the bot
const bot = new Cardinal;

// Register commands
bot.registry.registerCommands(HelpCommand);

// Authenticate with Discord.
bot.login();

