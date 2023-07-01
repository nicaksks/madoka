import axios, { AxiosInstance } from 'axios';
import Track from '../interface/track';

export default class GlobalExpress {

  private readonly _instance: AxiosInstance;
  private readonly _code: string;

  constructor(code: string) {
    this._code = code;
    this._instance = axios.create({
      baseURL: `https://global.cainiao.com/global`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 OPR/99.0.0.0',
        'Cookie': 'XSRF-TOKEN=2ac44a70-2443-49c4-aa19-9938f45df67d; grayVersion=1; serverGray=1; arms_uid=ae699e1f-bbc1-4d99-993b-ed3ec3d70588; x-hng=lang=zh-CN&language=zh-CN; _lang=pt-BR; lang=en; userSelectTag=1; x5sec=7b2261656272696467653b32223a223233626138616639613435326134626331376535633362313338656665623736434c656d2f715147454a44376e5062506a66366c4d6a43526a2b7568426b4144227d; isg=BCkpBmN1acdjzFVx6HDSZnAwKNWD9h0opzXKIMseV5BPkkqkEkQu-LDDUC6kCrVg; l=fBaUUuqVN4i0B901BO5alurza779XIJf1sPzaNbMiIEGa69CtFaqXNC1KfvMSdtjQT5mBeKzdsSd-dUp5SaLRAkDBeYInrGABb96JeM3N7AN.',
        'Referer': `https://global.cainiao.com/detail.htm?spm=a2d0j.7922267.0.0.67b93c56skOF19&mailNoList=${this._code}`
      }
    })
  }

  async get() {
    const { data } = await this._instance.get(`/detail.json?mailNos=${this._code}&lang=pt-BR&language=pt-BR`);
    const { module } = data;
    return module[0];
  }

}