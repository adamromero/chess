import "./style.scss";
import { boardArray } from "./boardArray.js";

const board = document.getElementById("board");
const BOARD_SIZE = 8;
let currentPiece;

const createBoard = () => {
   for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
         let tile = "";
         if (col % 2 !== row % 2) {
            tile = "black";
         }
         board.innerHTML += `<div class="cell ${tile}"></div>`;
      }
   }
   setBoard();
};

const setBoard = () => {
   for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
      const piece = boardArray[i];
      if (piece !== 0) {
         const htmlPieceSource = piece.getPieceImage();
         board.childNodes[
            i
         ].innerHTML = `<img class="piece" src="./pieces/${htmlPieceSource}.png" draggable="true"></div>`;
      }
   }
};

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
   this.append(currentPiece);
}

const bindMovement = () => {
   const pieces = document.querySelectorAll(".piece");
   const cells = document.querySelectorAll(".cell");

   pieces.forEach(piece => {
      piece.addEventListener("dragstart", function() {
         currentPiece = this;
      });

      piece.addEventListener("dragend", function() {
         this.parentNode.classList.remove("hovered");
      });
   });

   cells.forEach(cell => {
      cell.addEventListener("dragover", dragOver);
      cell.addEventListener("dragenter", dragEnter);
      cell.addEventListener("dragleave", dragLeave);
      cell.addEventListener("drop", dragDrop);
   });
};

const init = () => {
   createBoard();
   bindMovement();
};

init();
