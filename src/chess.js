import "./style.scss";
//import { boardArray } from "./boardArray.js";

const board = document.getElementById("board").childNodes;
const BOARD_SIZE = 8;
let currentPiece;

function isValidMove(piece, cell) {
   let validMove = true;

   console.log(cell.getAttribute("index"));

   if (piece === "wp") {
      validMove = true;
   }

   return validMove && isCellEmpty(cell);
}

function isCellEmpty(cell) {
   return !cell.childNodes.length
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
   const piece = currentPiece.classList[1];
   const cell = this;
   if (isValidMove(piece, cell)) {
      console.log('its valid');
      this.append(currentPiece);
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
