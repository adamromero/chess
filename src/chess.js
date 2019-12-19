import "./style.scss";
import { boardArray } from "./boardArray.js";

const board = document.getElementById("board");
const BOARD_SIZE = 8;

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
         const htmlPieceClass = piece.getPieceClass();
         board.childNodes[
            i
         ].innerHTML = `<div class="piece ${htmlPieceClass}" draggable="true"></div>`;
      }
   }
};

const bindMovement = () => {
   const pieces = document.querySelectorAll(".piece");

   pieces.forEach(piece => {
      piece.addEventListener("dragstart", function() {
         console.log("drag start");
         this.className += " hold";
      });

      piece.addEventListener("dragend", function() {
         console.log("drag end");
         this.classList.remove("hold");
      });
   });
};

const init = () => {
   createBoard();
   bindMovement();
};

init();
