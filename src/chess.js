import "./style.scss";

const board = document.querySelectorAll(".cell");
const pieces = document.querySelectorAll(".piece");
const BOARD_SIZE = 8;

function isCellEmpty(cell) {
   return !cell.innerHTML.trim().length;
}

function highlightPossibleMoves(currentPiece) {
   const piece = currentPiece.classList[1];
   const pieceIndex = parseInt(currentPiece.parentNode.getAttribute("index"));

   /*
   const cellPosition = {
      cellX: cellIndex % BOARD_SIZE,
      cellY: Math.floor(cellIndex / BOARD_SIZE)
   };*/

   const piecePosition = {
      cellX: pieceIndex % BOARD_SIZE,
      cellY: Math.floor(pieceIndex / BOARD_SIZE)
   };

   //console.log("pieceindex: ", pieceIndex);

   if (piece === "wp") {
      if (isCellEmpty(board[pieceIndex - 8])) {
         board[pieceIndex - 8].classList.add("highlight");

         if (isCellEmpty(board[pieceIndex - 16])) {
            board[pieceIndex - 16].classList.add("highlight");
         }
      }
   }

   //console.log("cell x: ", cellPosition.cellX);
   //console.log("cell y: ", cellPosition.cellY);
   console.log("piece cell x: ", piecePosition.cellX);
   console.log("piece cell y: ", piecePosition.cellY);

   if (piece === "wb") {
      console.log(piecePosition.cellX - 1);
      console.log(piecePosition.cellY - 1);

      setDiagonalPositions(piecePosition);
   }

   if (piece === "wr") {
      setHorizontalVerticalPositions(piecePosition);
   }
}

function setHorizontalVerticalPositions(position) {
   let x = position.cellX,
      y = position.cellY;

   while (x >= 0 && x < 8 && y >= 0 && y < 8) {
      y--;
      if (x >= 0 && x < 8 && y >= 0 && y < 8) {
         board[y * 8 + x].classList.add("highlight");
      }
   }

   (x = position.cellX), (y = position.cellY);

   while (x >= 0 && x < 8 && y >= 0 && y < 8) {
      y++;
      if (x >= 0 && x < 8 && y >= 0 && y < 8) {
         board[y * 8 + x].classList.add("highlight");
      }
   }

   (x = position.cellX), (y = position.cellY);

   while (x >= 0 && x < 8 && y >= 0 && y < 8) {
      x--;
      if (x >= 0 && x < 8 && y >= 0 && y < 8) {
         board[y * 8 + x].classList.add("highlight");
      }
   }

   (x = position.cellX), (y = position.cellY);

   while (x >= 0 && x < 8 && y >= 0 && y < 8) {
      x++;
      if (x >= 0 && x < 8 && y >= 0 && y < 8) {
         board[y * 8 + x].classList.add("highlight");
      }
   }
}

function setDiagonalPositions(position) {
   let x = position.cellX,
      y = position.cellY;

   //diagonal left up
   while (x >= 0 && y >= 0) {
      x--;
      y--;
      if (x >= 0 && y >= 0) {
         board[y * 8 + x].classList.add("highlight");
      }
   }

   (x = position.cellX), (y = position.cellY);

   //diagonal right up
   while (x < 8 && y >= 0) {
      x++;
      y--;

      if (x < 8 && y >= 0) {
         board[y * 8 + x].classList.add("highlight");
      }
   }

   (x = position.cellX), (y = position.cellY);

   //diagonal right down
   while (x < 8 && y < 8) {
      x++;
      y++;
      if (x < 8 && y < 8) {
         board[y * 8 + x].classList.add("highlight");
      }
   }

   (x = position.cellX), (y = position.cellY);

   //diagonal left down
   while (x >= 0 && y < 8) {
      x--;
      y++;
      if (x >= 0 && y < 8) {
         board[y * 8 + x].classList.add("highlight");
      }
   }
}

function selectMove(currentPiece) {
   const possibleMoves = document.querySelectorAll(".highlight");

   possibleMoves.forEach(function(target) {
      target.addEventListener("click", function() {
         const cellIndex = parseInt(this.getAttribute("index"));
         const pieceIndex = parseInt(
            currentPiece.parentNode.getAttribute("index")
         );

         if (cellIndex !== pieceIndex) {
            this.append(currentPiece);
            clearSelection();
         }
      });
   });
}

function clearSelection() {
   board.forEach(function(cell) {
      cell.classList.remove("highlight");
      cell.classList.remove("selected");
   });
}

const bindMovement = () => {
   pieces.forEach(function(piece) {
      piece.addEventListener("click", function() {
         const currentPiece = this;
         if (currentPiece.parentNode.classList.contains("selected")) {
            clearSelection();
         } else {
            clearSelection();
            currentPiece.parentNode.classList.add("selected");
            highlightPossibleMoves(currentPiece);
            selectMove(currentPiece);
         }
      });

      piece.addEventListener("mouseover", function() {
         this.parentNode.classList.add("highlight");
      });

      piece.addEventListener("mouseout", function() {
         this.parentNode.classList.remove("highlight");
      });
   });
};

const init = () => {
   bindMovement();
};

init();
