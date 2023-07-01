export default interface Track {
  code: string;
  daysNumber: string,
  origin: string;
  destiny: string;
  status: string;
  globalInfo: {
    desc: string;
    min: number;
    max: number;
  };
  latestTrace: {
    time: string;
    title: string;
    desc: string;
    nodeDesc: string;
    image: string;
  };
  progress: [];
  history: [];
}