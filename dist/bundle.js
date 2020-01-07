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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n //import { boardArray } from \"./boardArray.js\";\n\nvar board = document.querySelectorAll(\".cell\");\nvar pieces = document.querySelectorAll(\".piece\");\nvar BOARD_SIZE = 8;\nvar currentPiece;\n\nfunction piecePositionCheck(piece, pieceIndex, cellIndex) {\n  var validMove = false;\n  var cellPosition = {\n    cellX: cellIndex % BOARD_SIZE,\n    cellY: Math.floor(cellIndex / BOARD_SIZE)\n  };\n  var piecePosition = {\n    cellX: pieceIndex % BOARD_SIZE,\n    cellY: Math.floor(pieceIndex / BOARD_SIZE)\n  };\n\n  if (piece === \"wp\") {\n    if (pieceIndex - 8 === cellIndex || pieceIndex - 16 === cellIndex) {\n      validMove = true;\n    }\n  }\n\n  if (piece === \"bp\") {\n    if (pieceIndex + 8 === cellIndex || pieceIndex + 16 === cellIndex) {\n      validMove = true;\n    }\n  } //bishop check\n\n\n  if (piece === \"wb\" || piece === \"bb\") {\n    console.log(\"cell y: \", cellPosition.cellY);\n    console.log(\"cell x: \", cellPosition.cellX);\n    console.log(\"piece y: \", piecePosition.cellY);\n    console.log(\"piece x: \", piecePosition.cellX);\n\n    if (cellPosition.cellY !== piecePosition.cellY && cellPosition.cellX !== piecePosition.cellX) {\n      validMove = true;\n    }\n  } //rook check\n\n\n  if (piece === \"wr\" || piece === \"br\") {\n    if (cellPosition.cellY === piecePosition.cellY || cellPosition.cellX === piecePosition.cellX) {\n      validMove = true;\n    }\n  } // queen check\n\n\n  if (piece === \"wq\" || piece === \"bq\") {\n    if (cellPosition.cellY === piecePosition.cellY || cellPosition.cellX === piecePosition.cellX || (cellIndex - pieceIndex) % 9 === 0 || (cellIndex - pieceIndex) % 7 === 0 || (cellIndex + pieceIndex) % 9 === 0 || (cellIndex + pieceIndex) % 7 === 0) {\n      validMove = true;\n    }\n  }\n\n  return validMove;\n}\n\nfunction isValidMove(currentPiece, cell) {\n  var piece = currentPiece.classList[1];\n  var pieceIndex = parseInt(currentPiece.parentNode.getAttribute(\"index\"));\n  var cellIndex = parseInt(cell.getAttribute(\"index\"));\n  return isCellEmpty(cell) && piecePositionCheck(piece, pieceIndex, cellIndex);\n}\n\nfunction isCellEmpty(cell) {\n  return !cell.innerHTML.trim().length;\n}\n\nfunction dragDrop() {\n  if (isValidMove(currentPiece, this)) {\n    console.log(\"its valid\");\n    this.append(currentPiece);\n  } else {\n    this.classList.remove(\"hovered\");\n  }\n} ///////////////////////////////////////////////////////////////////////////\n\n\nfunction getValidMove() {\n  var piece = currentPiece.classList[1];\n  var pieceIndex = parseInt(currentPiece.parentNode.getAttribute(\"index\"));\n\n  if (piece === \"wp\") {\n    board[pieceIndex - 8].classList.add(\"highlight\");\n    board[pieceIndex - 16].classList.add(\"highlight\");\n  }\n}\n\nfunction highlightPossibleMoves() {\n  getValidMove();\n}\n\nfunction clearHighlights() {\n  board.forEach(function (cell) {\n    cell.classList.remove(\"highlight\");\n  });\n}\n\nvar bindMovement = function bindMovement() {\n  pieces.forEach(function (piece) {\n    piece.addEventListener(\"click\", function () {\n      if (piece.classList[2] === \"highlight\") {\n        this.classList.remove(\"highlight\");\n      } else {\n        clearHighlights();\n        currentPiece = this;\n        this.classList.add(\"highlight\");\n        highlightPossibleMoves();\n      }\n    });\n  });\n};\n\nvar init = function init() {\n  bindMovement();\n};\n\ninit();\n\n//# sourceURL=webpack:///./src/chess.js?");

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