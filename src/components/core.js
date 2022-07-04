import { DICTIONARY, FLIP_KEYWORD, MAX_DIFFICULTY } from "./constants";
import { DifficultySelector } from "./difficulty_selector";
import { VoiceManager } from "./voice_manager";
import { Game } from "./game";
import { GameOver } from "./game_over";

export class MemoryGame {
  constructor({ recordTranscribe } = {}) {
    if (!recordTranscribe) {
      throw new Error("MemoryGame requires 'recordTranscribe'");
    }

    this._game = new Game();
    this._difficultySelector = new DifficultySelector();
    this._voiceManager = new VoiceManager();
    this._voiceManager.setRecordTranscribe(recordTranscribe);
    this._lastCommand = null;
    this._activePairs = [];
    this._matched = [];
  }

  /**
   * Initialize all callbacks
   */
  init() {
    this._game.setOnGameStarted(() => {
      this._voiceManager.clapHandler.stop();
      this._voiceManager.recordTranscribe.start();
    });

    this._game.setOnGameEnded((hasWon) => {
      this._voiceManager.recordTranscribe.cancel();
      this._game.wipeBoard();

      new GameOver(hasWon);
    });

    this._difficultySelector.setOnDifficultySelected((difficulty) => {
      this._game.generateBoard(difficulty);
      this._difficultySelector.hide();
    });

    this._voiceManager.clapHandler.setOnNoiseOverTreshold(() => {
      const newDifficulty = this._difficultySelector.getDifficulty() + 1;

      if (newDifficulty > MAX_DIFFICULTY) {
        this._difficultySelector.setDifficulty(1);
      } else {
        this._difficultySelector.setDifficulty(newDifficulty);
      }
    });

    this._voiceManager.recordTranscribe.setOnStarted(() => {
      console.log("Started recording...");
    });

    this._voiceManager.recordTranscribe.setOnPartialResult((result) => {
      this.parseCommandsIntoPairs(result.words);
    });

    this._voiceManager.recordTranscribe.setOnError(() => {
      this._game.wipeBoard();
      console.log("Recording terminated.");
    });

    this._voiceManager.clapHandler.init();
    this._difficultySelector.init();
  }

  /**
   * Parses the given words into pairs and checks for a match and win.
   */
  parseCommandsIntoPairs(data) {
    const cleanData = data.filter(({ text }) => !text.match(/[?,.!]/));

    if (cleanData.length === 0) {
      return;
    }

    const command = cleanData.pop().text.toLowerCase();
    const matchByKey = parseInt(DICTIONARY[command]);
    let matchByValue = undefined;

    if (!matchByKey) {
      matchByValue = Object.keys(DICTIONARY).find((key) => {
        return DICTIONARY[key] === parseInt(command);
      });
    }

    if (matchByKey || matchByValue || command === FLIP_KEYWORD) {
      this._activePairs;

      if (this._activePairs.length >= 2) {
        if (
          this._activePairs[0].getValue() === this._activePairs[1].getValue()
        ) {
          this._activePairs.forEach((card) => {
            card.matched();
            this._matched.push(card);
          });
          this._activePairs = [];

          if (this._matched.length === this._game._cards.length) {
            this._game.win();
          }
        }

        if (command !== FLIP_KEYWORD) {
          return;
        }

        this._activePairs.forEach((card) => card.flip());
        this._activePairs = [];
      }

      const index = matchByKey || DICTIONARY[matchByValue];
      const card = this._game._cards.find((card) => card.getIndex() === index);

      if (card) {
        if (this._lastCommand !== command) {
          card.flip();
          this._activePairs.push(card);
        }
      }
    }
    this._lastCommand = command;
  }
}
