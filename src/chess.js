import "./style.scss";
//import { boardArray } from "./boardArray.js";

const board = document.querySelectorAll(".cell");
const pieces = document.querySelectorAll(".piece");
const BOARD_SIZE = 8;
let currentPiece;

function piecePositionCheck(piece, pieceIndex, cellIndex) {
   let validMove = false;

   const cellPosition = {
      cellX: cellIndex % BOARD_SIZE,
      cellY: Math.floor(cellIndex / BOARD_SIZE)
   };

   const piecePosition = {
      cellX: pieceIndex % BOARD_SIZE,
      cellY: Math.floor(pieceIndex / BOARD_SIZE)
   };

   if (piece === "wp") {
      if (pieceIndex - 8 === cellIndex || pieceIndex - 16 === cellIndex) {
         validMove = true;
      }
   }

   if (piece === "bp") {
      if (pieceIndex + 8 === cellIndex || pieceIndex + 16 === cellIndex) {
         validMove = true;
      }
   }

   //bishop check
   if (piece === "wb" || piece === "bb") {
      console.log("cell y: ", cellPosition.cellY);
      console.log("cell x: ", cellPosition.cellX);
      console.log("piece y: ", piecePosition.cellY);
      console.log("piece x: ", piecePosition.cellX);
      if (
         cellPosition.cellY !== piecePosition.cellY &&
         cellPosition.cellX !== piecePosition.cellX
      ) {
         validMove = true;
      }
   }

   //rook check
   if (piece === "wr" || piece === "br") {
      if (
         cellPosition.cellY === piecePosition.cellY ||
         cellPosition.cellX === piecePosition.cellX
      ) {
         validMove = true;
      }
   }

   // queen check
   if (piece === "wq" || piece === "bq") {
      if (
         cellPosition.cellY === piecePosition.cellY ||
         cellPosition.cellX === piecePosition.cellX ||
         (cellIndex - pieceIndex) % 9 === 0 ||
         (cellIndex - pieceIndex) % 7 === 0 ||
         (cellIndex + pieceIndex) % 9 === 0 ||
         (cellIndex + pieceIndex) % 7 === 0
      ) {
         validMove = true;
      }
   }

   return validMove;
}

function isValidMove(currentPiece, cell) {
   const piece = currentPiece.classList[1];
   const pieceIndex = parseInt(currentPiece.parentNode.getAttribute("index"));
   const cellIndex = parseInt(cell.getAttribute("index"));

   return isCellEmpty(cell) && piecePositionCheck(piece, pieceIndex, cellIndex);
}

function isCellEmpty(cell) {
   return !cell.innerHTML.trim().length;
}

function dragDrop() {
   if (isValidMove(currentPiece, this)) {
      console.log("its valid");
      this.append(currentPiece);
   } else {
      this.classList.remove("hovered");
   }
}

///////////////////////////////////////////////////////////////////////////

function getValidMove() {
   const piece = currentPiece.classList[1];
   const pieceIndex = parseInt(currentPiece.parentNode.getAttribute("index"));

   if (piece === "wp") {
      board[pieceIndex - 8].classList.add("highlight");
      board[pieceIndex - 16].classList.add("highlight");
   }
}

function highlightPossibleMoves() {
   getValidMove();
}

function clearHighlights() {
   board.forEach(function(cell) {
      cell.classList.remove("highlight");
   });
}

const bindMovement = () => {
   pieces.forEach(function(piece) {
      piece.addEventListener("click", function() {
         if (piece.classList[2] === "highlight") {
            this.classList.remove("highlight");
         } else {
            clearHighlights();
            currentPiece = this;
            this.classList.add("highlight");
            highlightPossibleMoves();
         }
      });
   });
};

const init = () => {
   bindMovement();
};

init();
