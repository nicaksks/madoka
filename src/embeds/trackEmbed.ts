import { EmbedBuilder } from "discord.js";

export default function trackEmbed(track: any): EmbedBuilder {

  const routes = track.processInfo.progressPointList.map((i: any) => (i.light ? "<:chickblush:1124752568170590358> <a:bouncyarrow1:1124752388352376962> " : "<:chicksleepy:1124765966795018250> <a:bouncyarrow:1124752391024152720> ") + i.pointName);
  let time = (track.globalEtaInfo.deliveryMinTime === track.globalEtaInfo.deliveryMaxTime) ? `O produto será entrega **<t:${Math.floor(track.globalEtaInfo.deliveryMinTime / 1000)}:R>**` : `O produto será entrega **<t:${Math.floor(track.globalEtaInfo.deliveryMinTime / 1000)}:R>** (porém pode ser entregue **<t:${Math.floor(track.globalEtaInfo.deliveryMaxTime / 1000)}:R>**)`;

  return new EmbedBuilder()
    .setTitle(`<:happy:1124751753028587611> Resultado do código: ${track.mailNo}`)
    .setDescription(`
  Origem: **${track.originCountry}**, Destino: **${track.destCountry}** 
  Duranção da viagem até o momento **${track.daysNumber}** 
  Status: **${track.status}** <:chicksprout:1124751750549753998>
  
  **PROGRESSO** <a:loading_spinner_teal:1124751255768666263>
  **${routes.join(' ')}**

  **DATA PARA O PRODUTO SER ENTREGUE**
  ${time}

  **ÚLTIMA ATUALIZAÇÃO <t:${Math.floor(parseInt(track.latestTrace.time) / 1000)}:R>** <a:mimu_love_throw:1124750968026832938>
  ${track.latestTrace.standerdDesc} <:mimu_squish:1124750765114802317>
  ${track.latestTrace.descTitle} **${track.latestTrace.group.nodeDesc}** <a:mimu_lovers:1124750253636206622>`)
    .setColor(0xFFD1DC)
    .setThumbnail(track.latestTrace.group.historyIconUrl)
    .setImage('https://cdn.discordapp.com/attachments/1047293828262023190/1124740619252797500/tumblr_36b9d49ac02a3467ead2f6df532fedc3_ded136c5_540.gif')
    .setTimestamp()
    .setFooter({ text: 'Última atualização da embed' })
}