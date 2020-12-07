import { MessageEmbed } from 'discord.js';
import { truncateString } from './Util';

/**
 * Creates an error notification embed.
 *
 * @param message The error message to create the embed for
 *
 * @returns MessageEmbed
 */
export default function errorEmbed(error: string | Error): MessageEmbed {
  const embed = new MessageEmbed();

  embed.setTitle('Something went wrong!');
  embed.setDescription(typeof error === 'string' ? error : error.message);
  embed.setColor('#ff0000');

  if (process.env.NODE_ENV !== 'production' && typeof error !== 'string') {
    embed.addField(
      'Stack Trace',
      error.stack
        ? `To disable this field, ensure your bot is running with its \`NODE_ENV\` set to \`production\`.\n\`\`\`\n${truncateString(
            error.stack,
            900,
          )}\n\`\`\``
        : 'None provided.',
    );
  }

  return embed;
}
