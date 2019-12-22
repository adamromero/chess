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

/***/ "./src/boardArray.js":
/*!***************************!*\
  !*** ./src/boardArray.js ***!
  \***************************/
/*! exports provided: boardArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"boardArray\", function() { return boardArray; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Piece =\n/*#__PURE__*/\nfunction () {\n  function Piece(boardId, image, color) {\n    _classCallCheck(this, Piece);\n\n    this.id = Math.random().toString(36).substr(2, 9);\n    this.boardId = boardId;\n    this.image = image;\n    this.color = color;\n  }\n\n  _createClass(Piece, [{\n    key: \"getInfo\",\n    value: function getInfo() {\n      console.log(\"\".concat(this.id, \" and \").concat(this.boardId, \" and \").concat(this.image, \" and \").concat(this.color));\n    }\n  }, {\n    key: \"getBoardId\",\n    value: function getBoardId() {\n      return this.boardId;\n    }\n  }, {\n    key: \"getPieceImage\",\n    value: function getPieceImage() {\n      return this.image;\n    }\n  }]);\n\n  return Piece;\n}();\n\nvar blackRook = new Piece(2, \"br\", \"black\");\nvar blackRook2 = new Piece(2, \"br\", \"black\");\nvar blackKnight = new Piece(3, \"bkn\", \"black\");\nvar blackKnight2 = new Piece(3, \"bkn\", \"black\");\nvar blackBishop = new Piece(4, \"bb\", \"black\");\nvar blackBishop2 = new Piece(4, \"bb\", \"black\");\nvar blackKing = new Piece(5, \"bkg\", \"black\");\nvar blackQueen = new Piece(6, \"bq\", \"black\");\nvar whiteRook = new Piece(2, \"wr\", \"black\");\nvar whiteRook2 = new Piece(2, \"wr\", \"black\");\nvar whiteKnight = new Piece(3, \"wkn\", \"white\");\nvar whiteKnight2 = new Piece(3, \"wkn\", \"white\");\nvar whiteBishop = new Piece(4, \"wb\", \"white\");\nvar whiteBishop2 = new Piece(4, \"wb\", \"white\");\nvar whiteKing = new Piece(5, \"wkg\", \"white\");\nvar whiteQueen = new Piece(6, \"wq\", \"white\");\nvar boardArray = [blackRook, blackKnight, blackBishop, blackKing, blackQueen, blackBishop2, blackKnight2, blackRook2, new Piece(1, \"bp\", \"black\"), new Piece(1, \"bp\", \"black\"), new Piece(1, \"bp\", \"black\"), new Piece(1, \"bp\", \"black\"), new Piece(1, \"bp\", \"black\"), new Piece(1, \"bp\", \"black\"), new Piece(1, \"bp\", \"black\"), new Piece(1, \"bp\", \"black\"), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, new Piece(1, \"wp\", \"white\"), new Piece(1, \"wp\", \"white\"), new Piece(1, \"wp\", \"white\"), new Piece(1, \"wp\", \"white\"), new Piece(1, \"wp\", \"white\"), new Piece(1, \"wp\", \"white\"), new Piece(1, \"wp\", \"white\"), new Piece(1, \"wp\", \"white\"), whiteRook, whiteKnight, whiteBishop, whiteKing, whiteQueen, whiteBishop2, whiteKnight2, whiteRook2];\n\n//# sourceURL=webpack:///./src/boardArray.js?");

/***/ }),

/***/ "./src/chess.js":
/*!**********************!*\
  !*** ./src/chess.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _boardArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./boardArray.js */ \"./src/boardArray.js\");\n\n\nvar board = document.getElementById(\"board\");\nvar BOARD_SIZE = 8;\nvar currentPiece;\n\nvar createBoard = function createBoard() {\n  for (var row = 0; row < BOARD_SIZE; row++) {\n    for (var col = 0; col < BOARD_SIZE; col++) {\n      var tile = \"\";\n\n      if (col % 2 !== row % 2) {\n        tile = \"black\";\n      }\n\n      board.innerHTML += \"<div class=\\\"cell \".concat(tile, \"\\\"></div>\");\n    }\n  }\n\n  setBoard();\n};\n\nvar setBoard = function setBoard() {\n  for (var i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {\n    var piece = _boardArray_js__WEBPACK_IMPORTED_MODULE_1__[\"boardArray\"][i];\n\n    if (piece !== 0) {\n      var htmlPieceSource = piece.getPieceImage();\n      board.childNodes[i].innerHTML = \"<img class=\\\"piece\\\" src=\\\"./pieces/\".concat(htmlPieceSource, \".png\\\" draggable=\\\"true\\\"></div>\");\n    }\n  }\n};\n\nfunction dragOver(e) {\n  e.preventDefault();\n}\n\nfunction dragEnter(e) {\n  e.preventDefault();\n  this.classList.add(\"hovered\");\n}\n\nfunction dragLeave() {\n  this.classList.remove(\"hovered\");\n}\n\nfunction dragDrop() {\n  this.append(currentPiece);\n}\n\nvar bindMovement = function bindMovement() {\n  var pieces = document.querySelectorAll(\".piece\");\n  var cells = document.querySelectorAll(\".cell\");\n  pieces.forEach(function (piece) {\n    piece.addEventListener(\"dragstart\", function () {\n      currentPiece = this;\n    });\n    piece.addEventListener(\"dragend\", function () {\n      this.parentNode.classList.remove(\"hovered\");\n    });\n  });\n  cells.forEach(function (cell) {\n    cell.addEventListener(\"dragover\", dragOver);\n    cell.addEventListener(\"dragenter\", dragEnter);\n    cell.addEventListener(\"dragleave\", dragLeave);\n    cell.addEventListener(\"drop\", dragDrop);\n  });\n};\n\nvar init = function init() {\n  createBoard();\n  bindMovement();\n};\n\ninit();\n\n//# sourceURL=webpack:///./src/chess.js?");

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