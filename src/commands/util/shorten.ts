import Command from "../../core/Command";
import {Message, MessageEmbed} from "discord.js";
import fetch from "node-fetch";
import {info} from "../../core/Logger";

const linkRegex = /^(?:(?:https?):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i

export default class ShortenCommand extends Command {
  public name = 'shorten';
  public description = 'Shortens a URL given using [linkd.pw](https://linkd.pw).';

  public usage = '<url>';

  public async run(message: Message, ...args: string[]) {
    const url = args[0];

    if (!linkRegex.test(url)) throw 'Please pass a valid HTTP(S) URL.';
    
    const res = await fetch('https://linkd.pw/url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    if (!res.ok) throw 'Something went wrong! Please try again!';

    const data = await res.json();

    info(`URL \`${url}\` shortened to \`${data.url}\`.`, 'shorten');

    const embed = new MessageEmbed()
      .setTitle('URL Shortened!')
      .setDescription(data.url)
      .setColor('#0000ff')
      .setFooter('Link shortening powered by linkd.pw');

    message.channel.send(embed);
  }
}
