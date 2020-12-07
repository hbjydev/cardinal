import { Message, MessageEmbed, PermissionString } from 'discord.js';
import { Script } from 'vm';
import Command from '../../core/Command';
import fetch from 'node-fetch';

export default class EvalCommand extends Command {
  public name = 'eval';

  public description = 'Evaluates raw JavaScript code.';

  public usage = '[code]';

  public permissions = ['BOT_OWNER'] as (PermissionString & 'BOT_OWNER')[];

  public run = async (message: Message, ...args: string[]) => {
    const { channel } = message;

    const option = args[0];
    let prettify = false;
    if (option === '--pretty') {
      args.shift();
      prettify = true;
    }

    let toEval = args.join(' ');
    const embed = new MessageEmbed();
    embed.setTitle('Evaluation');
    embed.setFooter(
      `eval ran by ${
        message.member
          ? message.member.nickname || message.author.username
          : message.author.username
      }.`,
      message.author.displayAvatarURL({ size: 32, format: 'webp' }),
    );

    // Replace triple backticks if codeblock
    if (toEval.startsWith('```') && toEval.endsWith('```')) {
      toEval = toEval.split('\n').slice(1, -1).join('\n');
    }

    // eslint-disable-next-line
    if (toEval.length > 600) {
      const data = await fetch('https://hasteb.in/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: toEval,
      });
      const json = await data.json();

      if (!json.key) {
        throw new Error('Something went wrong on hasteb.in!');
      }

      const url = `https://hasteb.in/${json.key}.js`;
      embed.addField('Code', url);
    } else {
      embed.addField('Code', `\`\`\`js\n${toEval}\n\`\`\``);
    }

    const context = {
      client: this.cardinal,
      guild: message.guild,
      author: message.author,
      message,
    };
    // eslint-disable-next-line
    const script = new Script(toEval);
    const result = script.runInNewContext(context);
    const resultString = `
\`\`\`js
${JSON.stringify(result, undefined, prettify ? '\n' : '')}
\`\`\``;

    if (resultString.length > 600) {
      const data = await fetch('https://hasteb.in/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: resultString.split('```js\n').join('').split('\n```').join(''),
      });
      const json = await data.json();

      if (!json.key) {
        throw new Error('Something went wrong on hasteb.in!');
      }

      const url = `https://hasteb.in/${json.key}.js`;
      embed.addField('Result', url);
    } else {
      embed.addField('Result', resultString);
    }

    embed.setColor('#00ff00');

    channel.send(embed);
  };
}
