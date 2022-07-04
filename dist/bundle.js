/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var easwee;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/card.js":
/*!********************************!*\
  !*** ./src/components/card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Card\": () => (/* binding */ Card)\n/* harmony export */ });\nclass Card {\n  constructor({ index, value, x, y, radius, graphic }) {\n    this._id = `card-${index + 1}`;\n    this._index = index + 1;\n    this._value = value;\n    this._position = {\n      x,\n      y,\n    };\n    this._element = null;\n    this._size = radius;\n    this._name = graphic.name;\n    this._src = graphic.url;\n\n    this._render();\n  }\n\n  remove() {\n    this._element.remove();\n  }\n\n  getIndex() {\n    return this._index;\n  }\n\n  getValue() {\n    return this._value;\n  }\n\n  flip() {\n    this._element.classList.toggle(\"flipped\");\n  }\n\n  matched() {\n    this._element.classList.add(\"matched\");\n  }\n\n  _render() {\n    const card = document.createElement(\"div\");\n\n    card.setAttribute(\"id\", this._id);\n    card.setAttribute(\"class\", \"card\");\n    card.setAttribute(\n      \"style\",\n      `position: fixed;\n         top: ${this._position.y}px;\n         left: ${this._position.x}px;\n         width: ${this._size}px;\n         height: ${this._size}px;\n        `\n    );\n    card.innerHTML = `\n        <div class=\"inner\">\n          <div class=\"front\" style=\"font-size: ${\n            this._size * 0.7\n          }px; border-width: ${this._size * 0.1}px\">${this._index}</div>\n          <div class=\"back\"  style=\"border-width: ${this._size * 0.1}px\">\n            <img src=\"${this._src}\" alt=\"${this._name}\" />\n          </div>\n        </div>\n      `;\n\n    document.body.appendChild(card);\n\n    this._element = document.getElementById(this._id);\n  }\n}\n\n\n//# sourceURL=webpack://easwee/./src/components/card.js?");

/***/ }),

/***/ "./src/components/clap_navigation.js":
/*!*******************************************!*\
  !*** ./src/components/clap_navigation.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ClapHandler\": () => (/* binding */ ClapHandler)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/components/constants.js\");\n\n\nclass ClapHandler {\n  constructor() {\n    this._context = null;\n    this._microphone = null;\n    this._analyser = null;\n    this._soundCheckInterval = null;\n    this._dBOverTreshold = false;\n    this._onNoiseOverTreshold = null;\n  }\n\n  init() {\n    navigator.mediaDevices\n      .getUserMedia({ audio: true })\n      .then((stream) => {\n        this.context = new AudioContext();\n        this.microphone = this.context.createMediaStreamSource(stream);\n        this.analyser = this.context.createAnalyser();\n\n        this.microphone.connect(this.analyser);\n\n        this.soundCheckInterval = setInterval(() => {\n          const data = new Uint8Array(this.analyser.frequencyBinCount);\n\n          this.analyser.getByteFrequencyData(data);\n\n          let sum = 0;\n\n          for (let i = 0; i < data.length; i++) {\n            sum += data[i];\n          }\n\n          const dB = Math.round(20 * Math.log10(sum));\n\n          if (dB > _constants__WEBPACK_IMPORTED_MODULE_0__.CLAP_LOUDNESS_THRESHOLD) {\n            if (!this.dBOverTreshold) {\n              this.dBOverTreshold = true;\n\n              if (this._onNoiseOverTreshold) {\n                this._onNoiseOverTreshold();\n              }\n            }\n            console.log(\"dB\", dB);\n          } else {\n            this.dBOverTreshold = false;\n          }\n        }, 1000 / 60);\n      })\n      .catch((error) => {\n        alert(error);\n      });\n  }\n\n  stop() {\n    clearInterval(this.soundCheckInterval);\n  }\n\n  setOnNoiseOverTreshold(onNoiseOverTreshold) {\n    this._onNoiseOverTreshold = onNoiseOverTreshold;\n  }\n}\n\n\n//# sourceURL=webpack://easwee/./src/components/clap_navigation.js?");

/***/ }),

/***/ "./src/components/constants.js":
/*!*************************************!*\
  !*** ./src/components/constants.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CARD_SET\": () => (/* binding */ CARD_SET),\n/* harmony export */   \"CLAP_LOUDNESS_THRESHOLD\": () => (/* binding */ CLAP_LOUDNESS_THRESHOLD),\n/* harmony export */   \"DICTIONARY\": () => (/* binding */ DICTIONARY),\n/* harmony export */   \"DIFFICULTY_MAP\": () => (/* binding */ DIFFICULTY_MAP),\n/* harmony export */   \"FLIP_KEYWORD\": () => (/* binding */ FLIP_KEYWORD),\n/* harmony export */   \"MAX_DIFFICULTY\": () => (/* binding */ MAX_DIFFICULTY)\n/* harmony export */ });\nconst MAX_DIFFICULTY = 3;\nconst CLAP_LOUDNESS_THRESHOLD = 92;\nconst FLIP_KEYWORD = \"flip\";\n\nconst DICTIONARY = {\n  one: 1,\n  two: 2,\n  three: 3,\n  four: 4,\n  five: 5,\n  six: 6,\n  seven: 7,\n  eight: 8,\n  nine: 9,\n  ten: 10,\n  eleven: 11,\n  twelve: 12,\n  thirteen: 13,\n  fourteen: 14,\n  fifteen: 15,\n  sixteen: 16,\n  seventeen: 17,\n  eighteen: 18,\n  nineteen: 19,\n  twenty: 20,\n};\n\nconst DIFFICULTY_MAP = {\n  1: 8,\n  2: 10,\n  3: 12,\n};\n\nconst CARD_SET = [\n  {\n    name: \"Langston\",\n    url: \"assets/1.png\",\n  },\n  {\n    name: \"Northtun\",\n    url: \"assets/2.png\",\n  },\n  {\n    name: \"Aethelmaer\",\n    url: \"assets/3.png\",\n  },\n  {\n    name: \"Gervase\",\n    url: \"assets/4.png\",\n  },\n  {\n    name: \"Maetthere\",\n    url: \"assets/5.png\",\n  },\n  {\n    name: \"Udolf\",\n    url: \"assets/6.png\",\n  },\n  {\n    name: \"Ealhhard\",\n    url: \"assets/7.png\",\n  },\n  {\n    name: \"Suzanna\",\n    url: \"assets/8.png\",\n  },\n  {\n    name: \"Ryan Reynolds\",\n    url: \"assets/9.png\",\n  },\n  {\n    name: \"Rinnah\",\n    url: \"assets/10.png\",\n  },\n  {\n    name: \"Brougher\",\n    url: \"assets/11.png\",\n  },\n  {\n    name: \"Amsden\",\n    url: \"assets/12.png\",\n  },\n  {\n    name: \"Adkyn\",\n    url: \"assets/13.png\",\n  },\n  {\n    name: \"Waldron\",\n    url: \"assets/14.png\",\n  },\n  {\n    name: \"Caine\",\n    url: \"assets/15.png\",\n  },\n  {\n    name: \"Broderik\",\n    url: \"assets/16.png\",\n  },\n  {\n    name: \"Godwin\",\n    url: \"assets/17.png\",\n  },\n  {\n    name: \"Marlayne\",\n    url: \"assets/18.png\",\n  },\n  {\n    name: \"Gerred\",\n    url: \"assets/19.png\",\n  },\n  {\n    name: \"Ceaster\",\n    url: \"assets/20.png\",\n  },\n];\n\n\n//# sourceURL=webpack://easwee/./src/components/constants.js?");

/***/ }),

/***/ "./src/components/core.js":
/*!********************************!*\
  !*** ./src/components/core.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MemoryGame\": () => (/* binding */ MemoryGame)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/components/constants.js\");\n/* harmony import */ var _difficulty_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./difficulty_selector */ \"./src/components/difficulty_selector.js\");\n/* harmony import */ var _voice_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./voice_manager */ \"./src/components/voice_manager.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game */ \"./src/components/game.js\");\n/* harmony import */ var _game_over__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game_over */ \"./src/components/game_over.js\");\n\n\n\n\n\n\nclass MemoryGame {\n  constructor({ recordTranscribe } = {}) {\n    if (!recordTranscribe) {\n      throw new Error(\"MemoryGame requires 'recordTranscribe'\");\n    }\n\n    this._game = new _game__WEBPACK_IMPORTED_MODULE_3__.Game();\n    this._difficultySelector = new _difficulty_selector__WEBPACK_IMPORTED_MODULE_1__.DifficultySelector();\n    this._voiceManager = new _voice_manager__WEBPACK_IMPORTED_MODULE_2__.VoiceManager();\n    this._voiceManager.setRecordTranscribe(recordTranscribe);\n    this._lastCommand = null;\n    this._activePairs = [];\n    this._matched = [];\n  }\n\n  init() {\n    this._game.setOnGameStarted(() => {\n      this._voiceManager.clapHandler.stop();\n      this._voiceManager.recordTranscribe.start();\n    });\n\n    this._game.setOnGameEnded((hasWon) => {\n      this._voiceManager.recordTranscribe.cancel();\n      this._game.wipeBoard();\n\n      new _game_over__WEBPACK_IMPORTED_MODULE_4__.GameOver(hasWon);\n    });\n\n    this._difficultySelector.setOnDifficultySelected((difficulty) => {\n      this._game.generateBoard(difficulty);\n      this._difficultySelector.hide();\n    });\n\n    this._voiceManager.clapHandler.setOnNoiseOverTreshold(() => {\n      const newDifficulty = this._difficultySelector.getDifficulty() + 1;\n\n      if (newDifficulty > _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_DIFFICULTY) {\n        this._difficultySelector.setDifficulty(1);\n      } else {\n        this._difficultySelector.setDifficulty(newDifficulty);\n      }\n    });\n\n    this._voiceManager.recordTranscribe.setOnStarted(() => {\n      console.log(\"Started recording...\");\n    });\n\n    this._voiceManager.recordTranscribe.setOnPartialResult((result) => {\n      this.parseCommandsIntoPairs(result.words);\n    });\n\n    this._voiceManager.recordTranscribe.setOnError(() => {\n      this._game.wipeBoard();\n      console.log(\"Recording terminated.\");\n    });\n\n    this._voiceManager.clapHandler.init();\n    this._difficultySelector.init();\n  }\n\n  /**\n   * Parses the given words into pairs and checks for a match and win.\n   */\n  parseCommandsIntoPairs(data) {\n    const cleanData = data.filter(({ text }) => !text.match(/[?,.!]/));\n\n    if (cleanData.length === 0) {\n      return;\n    }\n\n    const command = cleanData.pop().text.toLowerCase();\n    const matchByKey = parseInt(_constants__WEBPACK_IMPORTED_MODULE_0__.DICTIONARY[command]);\n    let matchByValue = undefined;\n\n    if (!matchByKey) {\n      matchByValue = Object.keys(_constants__WEBPACK_IMPORTED_MODULE_0__.DICTIONARY).find((key) => {\n        return _constants__WEBPACK_IMPORTED_MODULE_0__.DICTIONARY[key] === parseInt(command);\n      });\n    }\n\n    if (matchByKey || matchByValue || command === _constants__WEBPACK_IMPORTED_MODULE_0__.FLIP_KEYWORD) {\n      this._activePairs;\n\n      if (this._activePairs.length >= 2) {\n        if (\n          this._activePairs[0].getValue() === this._activePairs[1].getValue()\n        ) {\n          this._activePairs.forEach((card) => {\n            card.matched();\n            this._matched.push(card);\n          });\n          this._activePairs = [];\n\n          if (this._matched.length === this._game._cards.length) {\n            this._game.win();\n          }\n        }\n\n        if (command !== _constants__WEBPACK_IMPORTED_MODULE_0__.FLIP_KEYWORD) {\n          return;\n        }\n\n        this._activePairs.forEach((card) => card.flip());\n        this._activePairs = [];\n      }\n\n      const index = matchByKey || _constants__WEBPACK_IMPORTED_MODULE_0__.DICTIONARY[matchByValue];\n      const card = this._game._cards.find((card) => card.getIndex() === index);\n\n      if (card) {\n        if (this._lastCommand !== command) {\n          card.flip();\n          this._activePairs.push(card);\n        }\n      }\n    }\n    this._lastCommand = command;\n  }\n}\n\n\n//# sourceURL=webpack://easwee/./src/components/core.js?");

/***/ }),

/***/ "./src/components/difficulty_selector.js":
/*!***********************************************!*\
  !*** ./src/components/difficulty_selector.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DifficultySelector\": () => (/* binding */ DifficultySelector)\n/* harmony export */ });\n/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ \"./src/components/timer.js\");\n\n\nconst DIFFICULTY_SELECTOR_COUNTDOWN_SECONDS = 5;\n\nclass DifficultySelector {\n  constructor() {\n    this._difficulty = 0;\n    this._element = null;\n    this._timer = null;\n  }\n\n  init() {\n    this._render();\n  }\n\n  setOnDifficultySelected(onDifficultySelected) {\n    this._onDifficultySelected = onDifficultySelected;\n  }\n\n  getDifficulty() {\n    return this._difficulty;\n  }\n\n  setDifficulty(difficulty) {\n    if (this._difficulty === 0) {\n      this.startTimer();\n    }\n\n    this._difficulty = difficulty;\n    this._updateDifficultyDisplay();\n  }\n\n  startTimer() {\n    this._timer.start();\n  }\n\n  show() {\n    this._element.classList.remove(\"hidden\");\n  }\n\n  hide() {\n    this._element.classList.add(\"hidden\");\n  }\n\n  reset() {\n    this.setDifficulty(0);\n    this._timer.reset();\n    this.show();\n  }\n\n  _render() {\n    const difficultySelector = document.createElement(\"div\");\n\n    difficultySelector.setAttribute(\"id\", \"difficultySelector\");\n    difficultySelector.setAttribute(\"class\", \"difficulty-selector\");\n\n    difficultySelector.innerHTML = `\n        <h1>Memory game</h1>\n        <h3>How to play?</h3>\n        <p>\n          Say the number of the card you want to flip.<br />\n          Say the number of another card that you think will match.<br />\n          If they match, they will turn green, otherwise<br />\n          say \"flip\" to turn cards back down and continue guessing.\n        </p>\n        <p>~</p>\n        <p>\n          Clap in front of your mic to increase the difficulty.<br />\n          Maximum difficulty is 3.<br />\n          Clap at least once to start the game.\n        </p>\n        <h3>Difficulty level:</h3>\n        <p id=\"difficultyDisplay\">${this._difficulty}</p>\n        <h3>Start in:</h3>\n    `;\n\n    document.body.appendChild(difficultySelector);\n\n    this._element = document.getElementById(\"difficultySelector\");\n    this._difficultyElement = document.getElementById(\"difficultyDisplay\");\n\n    this._timer = new _timer__WEBPACK_IMPORTED_MODULE_0__.Timer({\n      parent: this._element,\n      name: \"difficultySelectorCountdown\",\n      startTime: DIFFICULTY_SELECTOR_COUNTDOWN_SECONDS,\n      onTimerEnded: () => this._onDifficultySelected(this._difficulty),\n    });\n  }\n\n  _updateDifficultyDisplay() {\n    this._difficultyElement.innerHTML = this._difficulty;\n  }\n}\n\n\n//# sourceURL=webpack://easwee/./src/components/difficulty_selector.js?");

/***/ }),

/***/ "./src/components/game.js":
/*!********************************!*\
  !*** ./src/components/game.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/components/constants.js\");\n/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card */ \"./src/components/card.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ \"./src/components/util.js\");\n/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./timer */ \"./src/components/timer.js\");\n\n\n\n\n\nconst GAME_COUNTDOWN_SECONDS = 30;\n\nclass Game {\n  constructor() {\n    this._cards = [];\n    this._current_pair = new Array(2);\n    this._timer = null;\n    this._onGameStarted = null;\n    this._onGameEnded = null;\n  }\n\n  generateBoard(difficulty) {\n    const uniqueCardSet = (0,_util__WEBPACK_IMPORTED_MODULE_2__.uniqNumberSet)(\n      _constants__WEBPACK_IMPORTED_MODULE_0__.DIFFICULTY_MAP[difficulty] / 2,\n      _constants__WEBPACK_IMPORTED_MODULE_0__.CARD_SET.length\n    );\n    const pairCardSet = (0,_util__WEBPACK_IMPORTED_MODULE_2__.shuffle)(uniqueCardSet.concat(uniqueCardSet));\n\n    // calculate to fit nicely on any screen\n    // pad by 1 card space on each side from window border\n    const padByCards = 2;\n    const cardRadius =\n      window.innerWidth > window.innerHeight\n        ? (window.innerHeight * 2) / (pairCardSet.length + padByCards)\n        : (window.innerWidth * 2) / (pairCardSet.length + padByCards);\n    const radius =\n      window.innerWidth > window.innerHeight\n        ? window.innerHeight / 2 - cardRadius\n        : window.innerWidth / 2 - cardRadius;\n\n    // create card objects with props, position in circular pattern\n    const angle = 360 / pairCardSet.length;\n    let rotation = 0;\n\n    for (let i = 0; i < pairCardSet.length; i++) {\n      const x = Math.cos((rotation * Math.PI) / 180) * radius - cardRadius;\n      const y = Math.sin((rotation * Math.PI) / 180) * radius - cardRadius;\n\n      rotation += angle;\n\n      this._cards.push(\n        new _card__WEBPACK_IMPORTED_MODULE_1__.Card({\n          index: i,\n          value: pairCardSet[i],\n          x: x + (window.innerWidth / 2 + cardRadius / 2),\n          y: y + window.innerHeight / 2 + cardRadius / 2,\n          radius: cardRadius,\n          graphic: _constants__WEBPACK_IMPORTED_MODULE_0__.CARD_SET[pairCardSet[i]],\n        })\n      );\n    }\n\n    this._timer = new _timer__WEBPACK_IMPORTED_MODULE_3__.Timer({\n      name: \"boardGameTimer\",\n      startTime: GAME_COUNTDOWN_SECONDS,\n      onTimerEnded: () => {\n        if (this._onGameEnded) {\n          this._onGameEnded(false);\n        }\n      },\n    });\n\n    this._timer.start();\n\n    if (this._onGameStarted) {\n      this._onGameStarted();\n    }\n  }\n\n  wipeBoard() {\n    this._cards.forEach((card) => {\n      card.remove();\n    });\n    this._cards = [];\n    this._timer.remove();\n  }\n\n  setOnGameStarted(onGameStarted) {\n    this._onGameStarted = onGameStarted;\n  }\n\n  setOnGameEnded(onGameEnded) {\n    this._onGameEnded = onGameEnded;\n  }\n\n  win() {\n    this._timer.stop();\n\n    this._onGameEnded(true);\n  }\n}\n\n\n//# sourceURL=webpack://easwee/./src/components/game.js?");

/***/ }),

/***/ "./src/components/game_over.js":
/*!*************************************!*\
  !*** ./src/components/game_over.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GameOver\": () => (/* binding */ GameOver)\n/* harmony export */ });\nconst RELOAD_INTERVAL = 10000;\n\nclass GameOver {\n  constructor(hasWon) {\n    this._element = null;\n    this._hasWon = hasWon;\n\n    this._render();\n  }\n\n  _render() {\n    const gameOver = document.createElement(\"div\");\n\n    gameOver.setAttribute(\"id\", this._id);\n    gameOver.setAttribute(\"class\", \"game-over\");\n\n    gameOver.innerHTML = `\n      <h3>Game over.</h3>\n      <h1>${this._hasWon ? \"You win!\" : \"You lose.\"}</h1>\n      <p><small>This is just a 30 second demo. Page will reload in 10 seconds.</small></p>\n    `;\n\n    document.body.appendChild(gameOver);\n\n    this._element = document.getElementById(this._id);\n\n    setTimeout(() => {\n      window.location.reload();\n    }, RELOAD_INTERVAL);\n  }\n}\n\n\n//# sourceURL=webpack://easwee/./src/components/game_over.js?");

/***/ }),

/***/ "./src/components/timer.js":
/*!*********************************!*\
  !*** ./src/components/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Timer\": () => (/* binding */ Timer)\n/* harmony export */ });\nclass Timer {\n  constructor({\n    parent = document.body,\n    name,\n    startTime = 30,\n    endTime = 0,\n    onTimerEnded,\n  } = {}) {\n    if (!name) {\n      throw \"Timer name is required.\";\n    }\n\n    this._parent = parent;\n    this._time = startTime;\n    this._start_time = startTime;\n    this._end_time = endTime;\n    this._id = name;\n    this._element = null;\n    this._onTimerEnded = onTimerEnded;\n    this._stopped = true;\n\n    this._render();\n  }\n\n  start() {\n    this._stopped = false;\n    this._countdown();\n  }\n\n  stop() {\n    this._stopped = true;\n  }\n\n  reset() {\n    this._time = this._start_time;\n    this._update();\n  }\n\n  remove() {\n    this._element.remove();\n  }\n\n  getTime() {\n    return this._time;\n  }\n\n  _render() {\n    const timer = document.createElement(\"div\");\n\n    timer.setAttribute(\"id\", this._id);\n    timer.setAttribute(\"class\", \"timer\");\n\n    timer.innerHTML = this._time;\n\n    this._parent.appendChild(timer);\n\n    this._element = document.getElementById(this._id);\n  }\n\n  _update() {\n    this._element.innerHTML = this._time;\n  }\n\n  _countdown() {\n    setTimeout(() => {\n      if (this._stopped) {\n        return;\n      }\n      if (this._time === this._end_time) {\n        if (this._onTimerEnded) {\n          this._onTimerEnded();\n        }\n        return;\n      }\n\n      this._time -= 1;\n      this._update();\n      this._countdown();\n    }, 1000);\n  }\n}\n\n\n//# sourceURL=webpack://easwee/./src/components/timer.js?");

/***/ }),

/***/ "./src/components/util.js":
/*!********************************!*\
  !*** ./src/components/util.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isCommandsSequenceEqual\": () => (/* binding */ isCommandsSequenceEqual),\n/* harmony export */   \"shuffle\": () => (/* binding */ shuffle),\n/* harmony export */   \"uniqNumberSet\": () => (/* binding */ uniqNumberSet)\n/* harmony export */ });\nfunction uniqNumberSet(amount, max) {\n  const set = new Set();\n\n  while (set.size !== amount) {\n    set.add(Math.floor(Math.random() * max));\n  }\n\n  return [...set];\n}\n\nfunction shuffle(array) {\n  let count = array.length,\n    randomnumber,\n    temp;\n\n  while (count) {\n    randomnumber = (Math.random() * count--) | 0;\n    temp = array[count];\n    array[count] = array[randomnumber];\n    array[randomnumber] = temp;\n  }\n\n  return array;\n}\n\nfunction isCommandsSequenceEqual(a, b) {\n  for (let i = 0; i < a.length; i++) {\n    if (!b[i] || a[i].text !== b[i].text) {\n      return false;\n    }\n  }\n\n  return true;\n}\n\n\n//# sourceURL=webpack://easwee/./src/components/util.js?");

/***/ }),

/***/ "./src/components/voice_manager.js":
/*!*****************************************!*\
  !*** ./src/components/voice_manager.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"VoiceManager\": () => (/* binding */ VoiceManager)\n/* harmony export */ });\n/* harmony import */ var _clap_navigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clap_navigation */ \"./src/components/clap_navigation.js\");\n\n\nclass VoiceManager {\n  constructor() {\n    this.recordTranscribe = null;\n    this.clapHandler = new _clap_navigation__WEBPACK_IMPORTED_MODULE_0__.ClapHandler();\n  }\n\n  setRecordTranscribe(rt) {\n    this.recordTranscribe = rt;\n    this.recordTranscribe.setIncludeNonFinal(true);\n  }\n}\n\n\n//# sourceURL=webpack://easwee/./src/components/voice_manager.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MemoryGame\": () => (/* reexport safe */ _components_core_js__WEBPACK_IMPORTED_MODULE_0__.MemoryGame)\n/* harmony export */ });\n/* harmony import */ var _components_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/core.js */ \"./src/components/core.js\");\n\n\n\n//# sourceURL=webpack://easwee/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	easwee = __webpack_exports__;
/******/ 	
/******/ })()
;