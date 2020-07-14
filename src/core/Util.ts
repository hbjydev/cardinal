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

export const truncateString =
  (str: string, len: number, append = '...') => {
    let newLength;

    if (append.length > 0) {
      append = " " + append;
    }

    if ((str.indexOf(' ') + append).length > len) {
      return str;
    }

    (str.length + append.length) > len ?
      newLength = len-append.length :
      newLength = str.length;

    let tempString = str.substring(0, newLength);  //cut the string at the new length
    tempString = tempString.replace(/\s+\S*$/, ""); //find the last space that appears before the substringed text

    if (append.length > 0) {
      tempString = tempString + append;
    }
    return tempString;
  }
