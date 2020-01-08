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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/chess.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/chess.js":
/*!**********************!*\
  !*** ./src/chess.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n\nvar board = document.querySelectorAll(\".cell\");\nvar pieces = document.querySelectorAll(\".piece\");\nvar BOARD_SIZE = 8;\n\nfunction isCellEmpty(cell) {\n  return !cell.innerHTML.trim().length;\n}\n\nfunction highlightPossibleMoves(currentPiece) {\n  var piece = currentPiece.classList[1];\n  var pieceIndex = parseInt(currentPiece.parentNode.getAttribute(\"index\"));\n  var piecePosition = {\n    cellX: pieceIndex % BOARD_SIZE,\n    cellY: Math.floor(pieceIndex / BOARD_SIZE)\n  };\n  console.log(\"piece cell x: \", piecePosition.cellX);\n  console.log(\"piece cell y: \", piecePosition.cellY);\n\n  if (piece === \"wp\") {\n    if (isCellEmpty(board[pieceIndex - 8])) {\n      board[pieceIndex - 8].classList.add(\"highlight\");\n\n      if (isCellEmpty(board[pieceIndex - 16])) {\n        board[pieceIndex - 16].classList.add(\"highlight\");\n      }\n    }\n  }\n\n  if (piece === \"wkn\") {}\n\n  if (piece === \"wb\") {\n    setDiagonalPositions(piecePosition);\n  }\n\n  if (piece === \"wr\") {\n    setHorizontalVerticalPositions(piecePosition);\n  }\n\n  if (piece === \"wq\") {\n    setDiagonalPositions(piecePosition);\n    setHorizontalVerticalPositions(piecePosition);\n  }\n\n  if (piece === \"wkg\") {\n    setKingPositions(piecePosition);\n  }\n}\n\nfunction setKingPositions(position) {\n  var x = position.cellX,\n      y = position.cellY;\n  if (x >= 0 && x < 8 && y >= 0 && y < 8) board[(y - 1) * 8 + (x - 1)].classList.add(\"highlight\");\n  if (x >= 0 && x < 8 && y >= 0 && y < 8) board[(y - 1) * 8 + x].classList.add(\"highlight\");\n  if (x >= 0 && x < 8 && y >= 0 && y < 8) board[(y - 1) * 8 + (x + 1)].classList.add(\"highlight\");\n  if (x >= 0 && x < 8 && y >= 0 && y < 8) board[y * 8 + (x - 1)].classList.add(\"highlight\");\n  if (x >= 0 && x < 8 && y >= 0 && y < 8) board[y * 8 + (x + 1)].classList.add(\"highlight\");\n  if (y < 7) board[(y + 1) * 8 + (x - 1)].classList.add(\"highlight\");\n  if (y < 7) board[(y + 1) * 8 + x].classList.add(\"highlight\");\n  if (y < 7) board[(y + 1) * 8 + (x + 1)].classList.add(\"highlight\");\n}\n\nfunction setHorizontalVerticalPositions(position) {\n  var x = position.cellX,\n      y = position.cellY;\n\n  while (x >= 0 && x < 8 && y >= 0 && y < 8) {\n    y--;\n\n    if (x >= 0 && x < 8 && y >= 0 && y < 8) {\n      board[y * 8 + x].classList.add(\"highlight\");\n    }\n  }\n\n  x = position.cellX, y = position.cellY;\n\n  while (x >= 0 && x < 8 && y >= 0 && y < 8) {\n    y++;\n\n    if (x >= 0 && x < 8 && y >= 0 && y < 8) {\n      board[y * 8 + x].classList.add(\"highlight\");\n    }\n  }\n\n  x = position.cellX, y = position.cellY;\n\n  while (x >= 0 && x < 8 && y >= 0 && y < 8) {\n    x--;\n\n    if (x >= 0 && x < 8 && y >= 0 && y < 8) {\n      board[y * 8 + x].classList.add(\"highlight\");\n    }\n  }\n\n  x = position.cellX, y = position.cellY;\n\n  while (x >= 0 && x < 8 && y >= 0 && y < 8) {\n    x++;\n\n    if (x >= 0 && x < 8 && y >= 0 && y < 8) {\n      board[y * 8 + x].classList.add(\"highlight\");\n    }\n  }\n}\n\nfunction setDiagonalPositions(position) {\n  var x = position.cellX,\n      y = position.cellY; //diagonal left up\n\n  while (x >= 0 && y >= 0) {\n    x--;\n    y--;\n\n    if (x >= 0 && y >= 0) {\n      board[y * 8 + x].classList.add(\"highlight\");\n    }\n  }\n\n  x = position.cellX, y = position.cellY; //diagonal right up\n\n  while (x < 8 && y >= 0) {\n    x++;\n    y--;\n\n    if (x < 8 && y >= 0) {\n      board[y * 8 + x].classList.add(\"highlight\");\n    }\n  }\n\n  x = position.cellX, y = position.cellY; //diagonal right down\n\n  while (x < 8 && y < 8) {\n    x++;\n    y++;\n\n    if (x < 8 && y < 8) {\n      board[y * 8 + x].classList.add(\"highlight\");\n    }\n  }\n\n  x = position.cellX, y = position.cellY; //diagonal left down\n\n  while (x >= 0 && y < 8) {\n    x--;\n    y++;\n\n    if (x >= 0 && y < 8) {\n      board[y * 8 + x].classList.add(\"highlight\");\n    }\n  }\n}\n\nfunction selectMove(currentPiece) {\n  var possibleMoves = document.querySelectorAll(\".highlight\");\n  possibleMoves.forEach(function (target) {\n    target.addEventListener(\"click\", function () {\n      var cellIndex = parseInt(this.getAttribute(\"index\"));\n      var pieceIndex = parseInt(currentPiece.parentNode.getAttribute(\"index\"));\n\n      if (cellIndex !== pieceIndex) {\n        this.append(currentPiece);\n        clearSelection();\n      }\n    });\n  });\n}\n\nfunction clearSelection() {\n  board.forEach(function (cell) {\n    cell.classList.remove(\"highlight\");\n    cell.classList.remove(\"selected\");\n  });\n}\n\nvar bindMovement = function bindMovement() {\n  pieces.forEach(function (piece) {\n    piece.addEventListener(\"click\", function () {\n      var currentPiece = this;\n\n      if (currentPiece.parentNode.classList.contains(\"selected\")) {\n        clearSelection();\n      } else {\n        clearSelection();\n        currentPiece.parentNode.classList.add(\"selected\");\n        highlightPossibleMoves(currentPiece);\n        selectMove(currentPiece);\n      }\n    });\n    piece.addEventListener(\"mouseover\", function () {\n      this.parentNode.classList.add(\"highlight\");\n    });\n    piece.addEventListener(\"mouseout\", function () {\n      this.parentNode.classList.remove(\"highlight\");\n    });\n  });\n};\n\nvar init = function init() {\n  bindMovement();\n};\n\ninit();\n\n//# sourceURL=webpack:///./src/chess.js?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/style.scss?");

/***/ })

/******/ });