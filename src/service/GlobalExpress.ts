import type { Module, iTrack } from '../interface/iTrack';

export default class GlobalExpress {

  public static async track(_code: string): Promise<iTrack> {
    try {
      const response = await fetch(`https://global.cainiao.com/global/detail.json?mailNos=${_code}&lang=pt-BR&language=pt-BR`);
      const data: Module = await response.json();

      const module = data.module[0];
      if (module.mailNoSource === 'EXTERNAL') throw new Error('Adicione apenas código de rastreio de exportação.');

      return module;
    } catch (e) {
      throw new Error('Ocorreu um erro.');
    }
  }

}