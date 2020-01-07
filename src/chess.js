import "./style.scss";
//import { boardArray } from "./boardArray.js";

const board = document.getElementById("board").childNodes;
const BOARD_SIZE = 8;
let currentPiece;




function piecePositionCheck(piece, pieceIndex, cellIndex) {
   let validMove = false;

   const cellPosition = { 
      cellX: cellIndex % 8, 
      cellY: Math.floor(cellIndex / 8)
   };

   const piecePosition = { 
      cellX: pieceIndex % 8, 
      cellY: Math.floor(pieceIndex / 8)
   };

   console.log(piece);

   if (piece === "wp") {
      if (pieceIndex - 8 === cellIndex || pieceIndex - 16 === cellIndex) {
         validMove = true;
      }
   }

   console.log(pieceIndex - 9);

   if (piece === "wb") {
      if (pieceIndex - 7 === cellIndex || pieceIndex - 9 === cellIndex) {
         validMove = true;
      }
   }

   return validMove;
}

function isValidMove(currentPiece, cell) {
   const piece = currentPiece.classList[1] 
   const pieceIndex = parseInt(currentPiece.parentNode.getAttribute("index"));
   const cellIndex = parseInt(cell.getAttribute("index"));

   return isCellEmpty(cell) && piecePositionCheck(piece, pieceIndex, cellIndex);
}

function isCellEmpty(cell) {
   return !cell.innerHTML.trim().length
}


function dragOver(e) {
   e.preventDefault();
}

function dragEnter(e) {
   e.preventDefault();
   this.classList.add("hovered");
}

function dragLeave() {
   this.classList.remove("hovered");
}

function dragDrop() {
   if (isValidMove(currentPiece, this)) {
      console.log('its valid');
      this.append(currentPiece);
   } else {
      this.classList.remove("hovered");
   }
}

const bindMovement = () => {
   const pieces = document.querySelectorAll(".piece");

   pieces.forEach(piece => {
      piece.addEventListener("dragstart", function() {
         currentPiece = this;
      });

      piece.addEventListener("dragend", function() {
         this.parentNode.classList.remove("hovered");
      });
   });

   board.forEach(cell => {
      cell.addEventListener("dragover", dragOver);
      cell.addEventListener("dragenter", dragEnter);
      cell.addEventListener("dragleave", dragLeave);
      cell.addEventListener("drop", dragDrop);
   });
};

const init = () => {
   bindMovement();
};

init();
