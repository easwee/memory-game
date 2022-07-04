import { CLAP_LOUDNESS_THRESHOLD } from "./constants";

export class ClapHandler {
  constructor() {
    this._context = null;
    this._microphone = null;
    this._analyser = null;
    this._soundCheckInterval = null;
    this._dBOverTreshold = false;
    this._onNoiseOverTreshold = null;
  }

  init() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.context = new AudioContext();
        this.microphone = this.context.createMediaStreamSource(stream);
        this.analyser = this.context.createAnalyser();

        this.microphone.connect(this.analyser);

        this.soundCheckInterval = setInterval(() => {
          const data = new Uint8Array(this.analyser.frequencyBinCount);

          this.analyser.getByteFrequencyData(data);

          let sum = 0;

          for (let i = 0; i < data.length; i++) {
            sum += data[i];
          }

          const dB = Math.round(20 * Math.log10(sum));

          if (dB > CLAP_LOUDNESS_THRESHOLD) {
            if (!this.dBOverTreshold) {
              this.dBOverTreshold = true;

              if (this._onNoiseOverTreshold) {
                this._onNoiseOverTreshold();
              }
            }
            console.log("dB", dB);
          } else {
            this.dBOverTreshold = false;
          }
        }, 1000 / 60);
      })
      .catch((error) => {
        alert(error);
      });
  }

  stop() {
    clearInterval(this.soundCheckInterval);
  }

  setOnNoiseOverTreshold(onNoiseOverTreshold) {
    this._onNoiseOverTreshold = onNoiseOverTreshold;
  }
}
