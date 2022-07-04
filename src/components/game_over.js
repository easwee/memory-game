const RELOAD_INTERVAL = 10000;

export class GameOver {
  constructor(hasWon) {
    this._element = null;
    this._hasWon = hasWon;

    this._render();
  }

  _render() {
    const gameOver = document.createElement("div");

    gameOver.setAttribute("id", this._id);
    gameOver.setAttribute("class", "game-over");

    gameOver.innerHTML = `
      <h3>Game over.</h3>
      <h1>${this._hasWon ? "You win!" : "You lose."}</h1>
      <p><small>This is just a 30 second demo. Page will reload in 10 seconds.</small></p>
    `;

    document.body.appendChild(gameOver);

    this._element = document.getElementById(this._id);

    setTimeout(() => {
      window.location.reload();
    }, RELOAD_INTERVAL);
  }
}
