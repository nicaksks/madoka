import { ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, type MessageEditOptions, type MessagePayload } from "discord.js";
import type { iTrack } from "../interface/iTrack";
import Embed from "./Embed";
import { EMOJI } from "../util/constants";
import SelectMenu from "./SelectMenu";

export default class Components {

    constructor(private readonly _Track: iTrack) { }

    public get content(): (string | MessageEditOptions | MessagePayload) {
        return {
            content: '',
            embeds: [this.embed],
            components: [this.selectMenu],
            files: [Embed.image]
        }
    }

    private get embed(): EmbedBuilder {
        
        /*
            const time = this._Track.globalCombinedLogisticsTraceDTO && (track.globalEtaInfo.deliveryMinTime) ? `O produto será entrega **<t:${Math.floor(track.globalEtaInfo.deliveryMinTime / 1000)}:R>**` : 'Aguardando o **Correios do Brasil** estimar o tempo de entrega.';
            **DATA PARA O PRODUTO SER ENTREGUE**
            ${time}
        */

        return new EmbedBuilder()
            .setTitle(`${EMOJI.HAPPY} Resultado do código: ${this._Track.mailNo}`)
            .setDescription(`
          Origem: **${this._Track.originCountry}**, Destino: **${this._Track.destCountry}** 
          ${Embed.duration(this._Track.daysNumber, this._Track.latestTrace.group.nodeDesc)}
          Status: **${this._Track.statusDesc}** ${EMOJI.CHICK_SPROUT}
          
          **PROGRESSO** ${EMOJI.SPINNER}
          **${Embed.routes(this._Track.processInfo.progressPointList)}**
        
          **ÚLTIMA ATUALIZAÇÃO <t:${Math.floor((this._Track.latestTrace.time) / 1000)}:R>** ${EMOJI.MIMU_LOVE}
          ${this._Track.latestTrace.standerdDesc} ${EMOJI.MIMU_SQUISH}
          ${this._Track.latestTrace.descTitle} **${this._Track.latestTrace.group.nodeDesc}** ${EMOJI.MIMU_LOVERS}`)
            .setColor(0xFFD1DC)
            .setThumbnail(this._Track.latestTrace.group.historyIconUrl)
            .setImage('attachment://eba.gif')
            .setTimestamp()
            .setFooter({ text: 'Última atualização' })
    }

    private get selectMenu(): ActionRowBuilder<any> {
        return SelectMenu.actionRow(
            new StringSelectMenuBuilder()
                .setCustomId('detailList')
                .setPlaceholder("🚚 Histórico da transportadora.")
                .addOptions(SelectMenu.detailList(this._Track.detailList))
        )
    }
}