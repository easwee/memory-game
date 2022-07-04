export class Timer {
  constructor({
    parent = document.body,
    name,
    startTime = 30,
    endTime = 0,
    onTimerEnded,
  } = {}) {
    if (!name) {
      throw "Timer name is required.";
    }

    this._parent = parent;
    this._time = startTime;
    this._start_time = startTime;
    this._end_time = endTime;
    this._id = name;
    this._element = null;
    this._onTimerEnded = onTimerEnded;
    this._stopped = true;

    this._render();
  }

  start() {
    this._stopped = false;
    this._countdown();
  }

  stop() {
    this._stopped = true;
  }

  reset() {
    this._time = this._start_time;
    this._update();
  }

  remove() {
    this._element.remove();
  }

  getTime() {
    return this._time;
  }

  _render() {
    const timer = document.createElement("div");

    timer.setAttribute("id", this._id);
    timer.setAttribute("class", "timer");

    timer.innerHTML = this._time;

    this._parent.appendChild(timer);

    this._element = document.getElementById(this._id);
  }

  _update() {
    this._element.innerHTML = this._time;
  }

  _countdown() {
    setTimeout(() => {
      if (this._stopped) {
        return;
      }
      if (this._time === this._end_time) {
        if (this._onTimerEnded) {
          this._onTimerEnded();
        }
        return;
      }

      this._time -= 1;
      this._update();
      this._countdown();
    }, 1000);
  }
}
