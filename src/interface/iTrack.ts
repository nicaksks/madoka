export interface Module {
  module: Array<iTrack>
}

export interface iTrack {
  mailNo: string;
  daysNumber: string,
  originCountry: string;
  destCountry: string;
  destCpInfo?: DestCpfInfo; 
  status: string;
  statusDesc: string;
  mailNoSource: string;
  processInfo: ProcessInfo;
  globalCombinedLogisticsTraceDTO: Trace;
  globalCurrentCardInfo: GlobalCurrentCardInfo;
  latestTrace: Trace;
  detailList: Array<Trace>;
}

export interface GlobalCurrentCardInfo {
  title: string;
  type: string;
  globalCpInfo?: DestCpfInfo;
  carrierNote: string;
}

export interface DestCpfInfo {
  cpName: string;
  phone: string;
  url: string;
  cpcode?: string;
  mdsName?: string;
}

export interface ProcessInfo {
  progressStatus: string;
  progressRate: number;
  type: string;
  progressPointList: Array<ProgressPointList>
}

export interface ProgressPointList {
  pointName: string;
  reload?: boolean;
  light?: boolean
}

export interface Trace {
  time: number;
  timeStr: string;
  desc: string;
  standerdDesc: string;
  descTitle: string;
  timeZone: string;
  actionCode: string;
  image: string;
  group: Group;
}

export interface Group {
  nodeCode: string;
  nodeDesc: string;
  currentIconUrl: string;
  historyIconUrl: string;
}
