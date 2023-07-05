import { ActionRowBuilder } from "discord.js";
import trackDropdown from "../components/trackDropdown";
import trackEmbed from "../embeds/trackEmbed";
import GlobalExpress from "../services/GlobalExpress";

let status = false;
let destinyStatus = false;

export default async function track(code: string, mentionId: string, message: any) {

  if (!code) throw new Error('Adicione um código.');
  const track = await new GlobalExpress(code).get();

  const history = new ActionRowBuilder()
    .addComponents(trackDropdown(track));

  let destiny: string[] = [];
  track.processInfo.progressPointList.map((i: any) => i.light ? destiny.push(i.pointName) : "");

  message.edit({ content: '', embeds: [trackEmbed(track)], components: [history] });
  trackRoute(destiny, message, mentionId);

}

function trackRoute(destiny: string[], message: any, mentionId: string) {
  if (destiny.includes('Entregue')) {
    message.edit({ content: `${mentionId} seu produto já foi entregue a você. O sistema será finalizado. \nCaso queira adicionar mais código de rastreamento vá até **src > utils > constants > code**`, embeds: [], components: [] })
      .then(() => process.exit(1));
  } else if (destiny.includes('Destino') && !destinyStatus) {
    destinyStatus = true;
    return message.reply({ content: `${mentionId} seu produto está sendo levado a sua residência.` });
  } else if (destiny.includes('Brasil') && !status) {
    status = true;
    return message.reply(`${mentionId} seu produto está no **Brasil**!`);
  };
}