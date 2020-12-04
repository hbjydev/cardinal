import { Client, User } from 'discord.js';

export const truncateString = (str: string, len: number, append = '...'): string => {
  let newLength;
  const toAppend = ` ${append}`;

  if ((str.indexOf(' ') + append).length > len) {
    return str;
  }

  if ((str.length + toAppend.length) > len) {
    newLength = len - toAppend.length;
  } else {
    newLength = str.length;
  }

  let tempString = str.substring(0, newLength); // cut the string at the new length
  tempString = tempString.replace(/\s+\S*$/, ''); // find the last space that appears before the substringed text

  if (append.length > 0) {
    tempString += append;
  }
  return tempString;
};

interface FuzzyDate {
  year: string;
  month: string;
  day: string;
}
export const parseFuzzyDate = ({ year, month, day }: FuzzyDate): string => `${year}/${month}/${day}`;
export const getUserFromMention = (client: Client, mention: string): User | undefined => {
  if (!mention) return undefined;

  let userId = '';
  if (mention.startsWith('<@') && mention.endsWith('>')) {
    userId = mention.slice(2, -1);

    if (mention.startsWith('!')) {
      userId = userId.slice(1);
    }

    const user = client.users.cache.get(userId);

    return user;
  }

  return undefined;
};
