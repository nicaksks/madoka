import { ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import type { Trace } from "../interface/iTrack";

interface Label {
  label: string;
  description: string;
  value: string;
}

export default class SelectMenu {

  public static actionRow(component: StringSelectMenuBuilder): ActionRowBuilder {
    return new ActionRowBuilder()
      .addComponents(component);
  }

  public static detailList = (detail: Trace[]): Array<Label> =>
    detail.map(({ descTitle, standerdDesc, timeStr }: Trace) => {
      return {
        label: descTitle,
        description: '🌸 ' + standerdDesc,
        value: timeStr
      }
    })

}