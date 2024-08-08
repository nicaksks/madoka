import GlobalExpress from "../service/GlobalExpress";
import iMessage from "../interface/iMessage";
import Components from "../components/Components";
import { iTrack, ProgressPointList } from "../interface/iTrack";
import { DiscordAPIError, Message } from "discord.js";

let destCountry = false;
let desStatus = false;

export default async ({ code, mentionId, message }: iMessage): Promise<void | DiscordAPIError> => {
  const track = await GlobalExpress.track(code);
  const { content } = new Components(track);

  await message.edit(content);

  destination(track, message, mentionId);
}

function progressPointList(list: Array<ProgressPointList>): Array<string> {
  return list
    .filter((i: ProgressPointList) => i.light)
    .map((i: ProgressPointList) => i.pointName);
}

function destination(track: iTrack, message: any, id: string): void {

  const des = progressPointList(track.processInfo.progressPointList);

  if (des.includes('Entregue')) {
    return message.edit({ content: `${id} seu produto já foi entregue a você. O sistema será finalizado. \nCaso queira adicionar mais código de rastreamento vá até **src > utils > constants > code**`, embeds: [], components: [] })
      .then(() => process.exit(1));
  }

  if (des.includes('Brasil') && !destCountry) {
    destCountry = true;
    message.reply(`${id} seu produto está no **Brasil**!`);
  };

  if (des.includes('Destino') && !desStatus) {
    desStatus = true;
    return message.reply({ content: `${id} seu produto está sendo levado a sua residência.` });
  }

}