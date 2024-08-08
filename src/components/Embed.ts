import { AttachmentBuilder } from "discord.js";
import { ProgressPointList } from "../interface/iTrack";
import { EMOJI } from "../util/constants";

export default class Embed {

    public static duration(d: string, status: string): string {
        return status === 'Entregue' ? `Produto demorou **${d}** para ser entregue` : `Duranção da viagem até o momento **${d}**`;
    }

    public static routes = (routes: ProgressPointList[]): string =>
        routes
            .map((i: ProgressPointList) => this.validatePoint(i) + i.pointName)
            .join(' ');

    private static validatePoint = (point: ProgressPointList): string =>
        point.light ?
            `${EMOJI.CHICK_BLUSH} ${EMOJI.BLUE_ARROW}` :
            `${EMOJI.CHICK_SLEEPY} ${EMOJI.ROSE_ARROW}`;

    public static get image(): AttachmentBuilder {
        return new AttachmentBuilder('./assets/image/eba.gif');
    }
}