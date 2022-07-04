import { ClapHandler } from "./clap_navigation";

export class VoiceManager {
  constructor() {
    this.recordTranscribe = null;
    this.clapHandler = new ClapHandler();
  }

  setRecordTranscribe(rt) {
    this.recordTranscribe = rt;
    this.recordTranscribe.setIncludeNonFinal(true);
  }
}
