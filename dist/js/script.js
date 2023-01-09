/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Menu
const navSlide = () => {
  const burger = document.querySelector('.burger');
  const navMenu = document.querySelector('.nav__menu');
  const navlinks = document.querySelectorAll('.nav__menu li');
  burger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navlinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinksFade 0.5s ease forwards ${index / 5 + 0.5}s`;
      }
    });
    burger.classList.toggle('active');
  });
};

navSlide(); //Tic Tac Toe

(function () {
  let fields = document.querySelectorAll(".game__field");
  let computerScoreDOM = document.querySelector("[data-computerScore]");
  let playerScoreDOM = document.querySelector("[data-playerScore]");
  let gamesNumberDOM = document.querySelector("[data-gamesNumber]");
  let board = ["", "", "", "", "", "", "", "", ""];
  let numberOfGames = 0;
  let playerScore = 0;
  let computerScore = 0;
  let computerStart = true;
  let ui = {
    squares: document.querySelectorAll(".game__field"),
    computerScore: document.querySelector("[data-computerScore]"),
    playerScore: document.querySelector("[data-playerScore]"),
    computerScoreHeader: document.querySelector("[data-computer]"),
    playerScoreHeader: document.querySelector("[data-player]"),
    gamesNumber: document.querySelector("[data-gamesNumber]")
  };
  let playing;
  let playerChance;
  let userMark = "O";
  let computerMark = "X";
  let score = {
    player: 0,
    computer: 0,
    games: 0
  };
  let userTurn = true;
  const delay = 500;
  const blinkBordersDelay = 500;
  let bordersBlinking = false;
  init();

  function init() {
    for (let i = ui.squares.length; i--;) {
      fields[i].addEventListener("mousedown", selectSquare);
    }

    document.querySelector('[data-tag="o"]').addEventListener("click", chooseMark);
    document.querySelector('[data-tag="x"]').addEventListener("click", chooseMark);
    document.querySelector(".game__reset").addEventListener("click", reset);
    document.querySelector('.game__end').addEventListener("click", start);
    playing = true;
    updateScoreBoard();
    updateTurn();
  }

  function selectSquare() {
    if (bordersBlinking) return;

    if (!playing) {
      start();
      return;
    }

    if (board[this.dataset.index] === "" && playing && userTurn) {
      board[this.dataset.index] = userMark;
      updateBoard(userTurn, this.dataset.index);
      changeTurn();
    }
  }

  function updateBoard(user, index) {
    ui.squares[index].innerHTML = board[index] = user ? userMark : computerMark;
    ui.squares[index].classList.add("game__animated");
    setTimeout(() => ui.squares[index].classList.remove("game__animated"), 200);
  }

  function changeTurn() {
    if (userTurn) {
      userTurn = false;
      if (isGameOver(userMark)) return;
      updateTurn();
    }

    setTimeout(() => {
      computerMove();
      userTurn = true;
      if (isGameOver(computerMark)) return;
      updateTurn();
    }, delay);
  }

  function isGameOver(mark) {
    winningComb = won(mark);

    if (winningComb) {
      endGame(winningComb);
      return true;
    }

    if (possibleMoves().length === 0) {
      endGame();
      return true;
    }

    return false;
  }

  function computerMove() {
    let possible = possibleMoves();
    let randomMove = possible[Math.floor(Math.random() * possible.length)];
    let move = Math.random() > playerChance ? findBestMove(board) : randomMove;
    board[move] = computerMark;
    updateBoard(userTurn, move);
  }

  function updateTurn() {
    if (userTurn) {
      ui.playerScoreHeader.classList.add("score__header--active");
      ui.computerScoreHeader.classList.remove("score__header--active");
    } else {
      ui.playerScoreHeader.classList.remove("score__header--active");
      ui.computerScoreHeader.classList.add("score__header--active");
    }
  }

  function endGame(winComb) {
    playing = false;

    if (winComb) {
      board[winComb[0]] === userMark ? playerScore++ : computerScore++;
      winComb.forEach(el => {
        ui.squares[el].classList.add("game__win");
      });
    } else {
      blinkBorders();
    }

    numberOfGames++;
    updateScoreBoard();
  }

  function blinkBorders() {
    let interval;
    let blinkCount = 0;
    let color;
    bordersBlinking = true;
    interval = setInterval(() => {
      for (let i = ui.squares.length; i--;) {
        color = blinkCount % 2 === 0 ? "2px 2px 10px #fff" : "";
        ui.squares[i].style.boxShadow = color;
      }

      if (++blinkCount === 4) {
        clearInterval(interval);
        bordersBlinking = false;
      }
    }, blinkBordersDelay);
  }

  function updateScoreBoard() {
    ui.playerScore.innerHTML = playerScore;
    ui.computerScore.innerHTML = computerScore;
    ui.gamesNumber.innerHTML = numberOfGames;
  }

  function start() {
    board = ["", "", "", "", "", "", "", "", ""];
    board.forEach((_, i) => {
      ui.squares[i].innerHTML = "";
      ui.squares[i].classList.remove("game__win");
    });
    updateTurn();
    playing = true;

    if (!userTurn) {
      changeTurn();
    }
  }

  function won(mark) {
    if (board[0] === mark && board[1] === mark && board[2] === mark) return [0, 1, 2];
    if (board[3] === mark && board[4] === mark && board[5] === mark) return [3, 4, 5];
    if (board[6] === mark && board[7] === mark && board[8] === mark) return [6, 7, 8];
    if (board[0] === mark && board[3] === mark && board[6] === mark) return [0, 3, 6];
    if (board[1] === mark && board[4] === mark && board[7] === mark) return [1, 4, 7];
    if (board[2] === mark && board[5] === mark && board[8] === mark) return [2, 5, 8];
    if (board[0] === mark && board[4] === mark && board[8] === mark) return [0, 4, 8];
    if (board[2] === mark && board[4] === mark && board[6] === mark) return [2, 4, 6];
    return false;
  }

  function movesLeft() {
    return board.some(el => {
      return el === "";
    });
  }

  function possibleMoves() {
    let possible = [];
    board.forEach((el, i) => {
      if (el === "") {
        possible.push(i);
      }
    });
    return possible;
  }

  function chooseMark(event) {
    userMark = event.target.dataset.tag === "o" ? "O" : "X";
    computerMark = event.target.dataset.tag === "o" ? "X" : "O";
    document.querySelector(".game__choose").classList.add("hidden");
    document.querySelector(".game__score").classList.remove("hidden");
    document.querySelector(".game__board").classList.remove("hidden");

    switch (document.querySelector('input[name="difficulty"]:checked').value) {
      case "easy":
        playerChance = 0.9;
        break;

      case "medium":
        playerChance = 0.5;
        break;

      default:
        playerChance = 0;
    }
  }

  function reset() {
    document.querySelector(".game__choose").classList.remove("hidden");
    document.querySelector(".game__score").classList.add("hidden");
    document.querySelector(".game__board").classList.add("hidden");
    numberOfGames = 0;
    playerScore = 0;
    computerScore = 0;
    userTurn = true;
    updateScoreBoard();
    start();
  }

  function findBestMove(board) {
    let bestMove, currVal;
    let bestVal = -100;
    let bestMovesList = [];
    possibleMoves(board).forEach(move => {
      board[move] = computerMark;
      currVal = minimax(board, 0, false);
      board[move] = "";

      if (currVal > bestVal) {
        bestVal = currVal;
        bestMovesList = [move];
      } else if (currVal === bestVal) {
        bestMovesList.push(move);
      }
    });
    bestMove = bestMovesList[Math.floor(Math.random() * bestMovesList.length)];
    return bestMove;
  }

  function minimax(board, depth, isComputer) {
    if (depth > 10) return null;
    let tag, bestVal, value, oponnentTag;

    if (won(isComputer ? userMark : computerMark)) {
      if (isComputer) {
        return -10 + depth;
      } else {
        return 10 - depth;
      }
    } else if (!movesLeft(board)) {
      return 0;
    }

    if (isComputer) {
      bestVal = -100;
      possibleMoves(board).forEach(move => {
        board[move] = computerMark;
        value = minimax(board, depth + 1, false);
        board[move] = "";
        bestVal = Math.max(value, bestVal);
      });
    } else {
      bestVal = 100;
      possibleMoves(board).forEach(move => {
        board[move] = userMark;
        value = minimax(board, depth + 1, true);
        board[move] = "";
        bestVal = Math.min(value, bestVal);
      });
    }

    return bestVal;
  }
})(); // Carousel


const state = {};
const carouselList = document.querySelector('.carousel__list');
const carouselItems = document.querySelectorAll('.carousel__item');
const elems = Array.from(carouselItems);
carouselList.addEventListener('click', function (event) {
  var newActive = event.target;
  var isItem = newActive.closest('.carousel__item');

  if (!isItem || newActive.classList.contains('carousel__item_active')) {
    return;
  }

  ;
  update(newActive);
});

const update = function (newActive) {
  const newActivePos = newActive.dataset.pos;
  const current = elems.find(elem => elem.dataset.pos == 0);
  const prev = elems.find(elem => elem.dataset.pos == -1);
  const next = elems.find(elem => elem.dataset.pos == 1);
  const second = elems.find(elem => elem.dataset.pos == -2);
  const fifth = elems.find(elem => elem.dataset.pos == 2);
  const first = elems.find(elem => elem.dataset.pos == -3);
  const last = elems.find(elem => elem.dataset.pos == 3);
  current.classList.remove('carousel__item_active');
  [current, prev, next, second, fifth, first, last].forEach(item => {
    let itemPos = item.dataset.pos;
    item.dataset.pos = getPos(itemPos, newActivePos);
  });
};

const getPos = function (current, active) {
  const diff = current - active;

  if (Math.abs(current - active) > 3) {
    return -current;
  }

  return diff;
}; // init Swiper:


let swiper = new Swiper('.training', {
  spaceBetween: 30,
  effect: 'fade',
  loop: true,
  mousewheel: {
    invert: false
  },
  // autoHeight: true,
  pagination: {
    el: '.training__pagination',
    clickable: true
  }
}); //Own lightbox

const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const images = [];
lightboxTriggers.forEach(trigger => {
  images.push({
    url: trigger.href,
    title: trigger.querySelector('img').alt
  });
});
lightboxTriggers.forEach((trigger, index) => {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    openLightbox(index);
  });
});

function openLightbox(index) {
  lightboxImg.src = images[index].url;
  lightboxImg.alt = images[index].title;
  lightbox.dataset.index = index;
  lightbox.classList.add('open');
}

lightboxClose.addEventListener('click', event => {
  event.preventDefault();
  lightbox.classList.remove('open');
});
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) {
    lightbox.classList.remove('open');
  }
}); //Top button

const btnTop = document.querySelector('.go-top');

const btnReveal = function () {
  if (window.scrollY > 300) {
    btnTop.classList.add('visible');
  } else {
    btnTop.classList.remove('visible');
  }
};

window.addEventListener('scroll', btnReveal);

/***/ })

/******/ });
//# sourceMappingURL=script.js.map