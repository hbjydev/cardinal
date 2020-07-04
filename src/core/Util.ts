import { Client, User } from 'discord.js';

export const getUserFromMention =
  (client: Client, mention: string): User | undefined => {
    if (!mention) return undefined;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
      mention = mention.slice(2, -1);

      if (mention.startsWith('!')) {
        mention = mention.slice(1);
      }

      const user = client.users.cache.get(mention);

      return user;
    }

    return undefined;
  }
