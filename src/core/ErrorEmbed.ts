import { MessageEmbed } from 'discord.js';

/**
 * Creates an error notification embed.
 *
 * @param message The error message to create the embed for
 *
 * @returns MessageEmbed
 */
export default function errorEmbed (message: string): MessageEmbed {
  const embed = new MessageEmbed();

  embed.setTitle('Something went wrong!');
  embed.setDescription(message);
  embed.setColor('#ff0000');

  return embed;
}
