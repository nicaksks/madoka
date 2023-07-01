import { StringSelectMenuBuilder } from "discord.js";

export default function trackDropdown(track: any): StringSelectMenuBuilder {

  const list = track.detailList.map((track: any) => {
    return {
      label: track.descTitle,
      description: "🌸 " + track.standerdDesc,
      value: track.standerdDesc
    }
  })

  return new StringSelectMenuBuilder()
    .setCustomId(".")
    .setPlaceholder("🚚 Histórico da transportadora.")
    .addOptions(list);
}
