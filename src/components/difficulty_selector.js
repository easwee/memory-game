import { Timer } from "./timer";

const DIFFICULTY_SELECTOR_COUNTDOWN_SECONDS = 5;

export class DifficultySelector {
  constructor() {
    this._difficulty = 0;
    this._element = null;
    this._timer = null;
  }

  init() {
    this._render();
  }

  setOnDifficultySelected(onDifficultySelected) {
    this._onDifficultySelected = onDifficultySelected;
  }

  getDifficulty() {
    return this._difficulty;
  }

  setDifficulty(difficulty) {
    if (this._difficulty === 0) {
      this.startTimer();
    }

    this._difficulty = difficulty;
    this._updateDifficultyDisplay();
  }

  startTimer() {
    this._timer.start();
  }

  show() {
    this._element.classList.remove("hidden");
  }

  hide() {
    this._element.classList.add("hidden");
  }

  reset() {
    this.setDifficulty(0);
    this._timer.reset();
    this.show();
  }

  _render() {
    const difficultySelector = document.createElement("div");

    difficultySelector.setAttribute("id", "difficultySelector");
    difficultySelector.setAttribute("class", "difficulty-selector");

    difficultySelector.innerHTML = `
        <h1>Memory game</h1>
        <h3>How to play?</h3>
        <p>
          Say the number of the card you want to flip.<br />
          Say the number of another card that you think will match.<br />
          If they match, they will turn green, otherwise<br />
          say "flip" to turn cards back down and continue guessing.
        </p>
        <p>~</p>
        <p>
          Clap in front of your mic to increase the difficulty.<br />
          Maximum difficulty is 3.<br />
          Clap at least once to start the game.
        </p>
        <h3>Difficulty level:</h3>
        <p id="difficultyDisplay">${this._difficulty}</p>
        <h3>Start in:</h3>
    `;

    document.body.appendChild(difficultySelector);

    this._element = document.getElementById("difficultySelector");
    this._difficultyElement = document.getElementById("difficultyDisplay");

    this._timer = new Timer({
      parent: this._element,
      name: "difficultySelectorCountdown",
      startTime: DIFFICULTY_SELECTOR_COUNTDOWN_SECONDS,
      onTimerEnded: () => this._onDifficultySelected(this._difficulty),
    });
  }

  _updateDifficultyDisplay() {
    this._difficultyElement.innerHTML = this._difficulty;
  }
}
