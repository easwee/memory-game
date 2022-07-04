import { CARD_SET, DIFFICULTY_MAP } from "./constants";
import { Card } from "./card";
import { shuffle, uniqNumberSet } from "./util";
import { Timer } from "./timer";

const GAME_COUNTDOWN_SECONDS = 30;

export class Game {
  constructor() {
    this._cards = [];
    this._current_pair = new Array(2);
    this._timer = null;
    this._onGameStarted = null;
    this._onGameEnded = null;
  }

  generateBoard(difficulty) {
    const uniqueCardSet = uniqNumberSet(
      DIFFICULTY_MAP[difficulty] / 2,
      CARD_SET.length
    );
    const pairCardSet = shuffle(uniqueCardSet.concat(uniqueCardSet));

    // calculate to fit nicely on any screen
    // pad by 1 card space on each side from window border
    const padByCards = 2;
    const cardRadius =
      window.innerWidth > window.innerHeight
        ? (window.innerHeight * 2) / (pairCardSet.length + padByCards)
        : (window.innerWidth * 2) / (pairCardSet.length + padByCards);
    const radius =
      window.innerWidth > window.innerHeight
        ? window.innerHeight / 2 - cardRadius
        : window.innerWidth / 2 - cardRadius;

    // create card objects with props, position in circular pattern
    const angle = 360 / pairCardSet.length;
    let rotation = 0;

    for (let i = 0; i < pairCardSet.length; i++) {
      const x = Math.cos((rotation * Math.PI) / 180) * radius - cardRadius;
      const y = Math.sin((rotation * Math.PI) / 180) * radius - cardRadius;

      rotation += angle;

      this._cards.push(
        new Card({
          index: i,
          value: pairCardSet[i],
          x: x + (window.innerWidth / 2 + cardRadius / 2),
          y: y + window.innerHeight / 2 + cardRadius / 2,
          radius: cardRadius,
          graphic: CARD_SET[pairCardSet[i]],
        })
      );
    }

    this._timer = new Timer({
      name: "boardGameTimer",
      startTime: GAME_COUNTDOWN_SECONDS,
      onTimerEnded: () => {
        if (this._onGameEnded) {
          this._onGameEnded(false);
        }
      },
    });

    this._timer.start();

    if (this._onGameStarted) {
      this._onGameStarted();
    }
  }

  wipeBoard() {
    this._cards.forEach((card) => {
      card.remove();
    });
    this._cards = [];
    this._timer.remove();
  }

  setOnGameStarted(onGameStarted) {
    this._onGameStarted = onGameStarted;
  }

  setOnGameEnded(onGameEnded) {
    this._onGameEnded = onGameEnded;
  }

  win() {
    this._timer.stop();

    this._onGameEnded(true);
  }
}
