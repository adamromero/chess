import "./style.scss";

const board = document.querySelectorAll(".cell");
const pieces = document.querySelectorAll(".piece");
const BOARD_SIZE = 8;

function highlightPossibleMoves(currentPiece) {
   const piece = currentPiece.classList[1];
   const pieceIndex = parseInt(currentPiece.parentNode.getAttribute("index"));

   const piecePosition = {
      cellX: pieceIndex % BOARD_SIZE,
      cellY: Math.floor(pieceIndex / BOARD_SIZE)
   };

   console.log("piece cell x: ", piecePosition.cellX);
   console.log("piece cell y: ", piecePosition.cellY);

   if (piece === "wp") {
      setPawnPositions(piecePosition);
   }

   if (piece === "wkn") {
      setKnightPositions(piecePosition);
   }

   if (piece === "wb") {
      setDiagonalPositions(piecePosition);
   }

   if (piece === "wr") {
      setHorizontalVerticalPositions(piecePosition);
   }

   if (piece === "wq") {
      setDiagonalPositions(piecePosition);
      setHorizontalVerticalPositions(piecePosition);
   }

   if (piece === "wkg") {
      setKingPositions(piecePosition);
   }

}

function isCellEmpty(cell) {
   return !cell.innerHTML.trim().length;
}

function convertCoordinatesToIndex(x, y) {
   if (coordinatesInBounds(x, y)) {
      return y * BOARD_SIZE + x;
   }
   //returns -1 to represent an out of bounds index
   return -1;
}

function coordinatesInBounds(x, y) {
   return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function highlightEmptyCells(index) {
   const cell = board[index];
   if (index > -1 && isCellEmpty(cell)) {
      cell.classList.add("highlight");
   }
}

function setPawnPositions(position) {
   let x = position.cellX,
      y = position.cellY;

   highlightEmptyCells(convertCoordinatesToIndex(x, y - 1));
   //first move for pawns have option of moving two spaces ahead
   if (y === 6) {
      highlightEmptyCells(convertCoordinatesToIndex(x, y - 2));
   }
}

function setKnightPositions(position) {
   let x = position.cellX,
      y = position.cellY;

   highlightEmptyCells(convertCoordinatesToIndex(x + 1, y - 2));
   highlightEmptyCells(convertCoordinatesToIndex(x - 1, y - 2));
   highlightEmptyCells(convertCoordinatesToIndex(x - 2, y + 1));
   highlightEmptyCells(convertCoordinatesToIndex(x - 2, y - 1));
   highlightEmptyCells(convertCoordinatesToIndex(x + 2, y + 1));
   highlightEmptyCells(convertCoordinatesToIndex(x + 2, y - 1));
   highlightEmptyCells(convertCoordinatesToIndex(x + 1, y + 2));
   highlightEmptyCells(convertCoordinatesToIndex(x - 1, y + 2));
}

function setKingPositions(position) {
   let x = position.cellX,
      y = position.cellY;

   highlightEmptyCells(convertCoordinatesToIndex(x - 1, y - 1));
   highlightEmptyCells(convertCoordinatesToIndex(x, y - 1));
   highlightEmptyCells(convertCoordinatesToIndex(x + 1, y - 1));
   highlightEmptyCells(convertCoordinatesToIndex(x - 1, y));
   highlightEmptyCells(convertCoordinatesToIndex(x + 1, y));
   highlightEmptyCells(convertCoordinatesToIndex(x - 1, y + 1));
   highlightEmptyCells(convertCoordinatesToIndex(x, y + 1));
   highlightEmptyCells(convertCoordinatesToIndex(x + 1, y + 1));
}

function setHorizontalVerticalPositions(position) {
   let x = position.cellX,
      y = position.cellY;

   while (convertCoordinatesToIndex(x, y) > -1) {
      highlightEmptyCells(convertCoordinatesToIndex(x, --y));
   }

   y = position.cellY;
   while (convertCoordinatesToIndex(x, y) > -1) {
      highlightEmptyCells(convertCoordinatesToIndex(x, ++y));
   }

   y = position.cellY;
   while (convertCoordinatesToIndex(x, y) > -1) {
      highlightEmptyCells(convertCoordinatesToIndex(--x, y));
   }

   x = position.cellX;
   while (convertCoordinatesToIndex(x, y) > -1) {
      highlightEmptyCells(convertCoordinatesToIndex(++x, y));
   }
}

function setDiagonalPositions(position) {
   let x = position.cellX,
      y = position.cellY;

   //diagonal left up
   while (convertCoordinatesToIndex(x, y) > -1) {
      highlightEmptyCells(convertCoordinatesToIndex(--x, --y));
   }

   (x = position.cellX), (y = position.cellY);
   //diagonal right up
   while (convertCoordinatesToIndex(x, y) > -1) {
      highlightEmptyCells(convertCoordinatesToIndex(++x, --y));
   }

   (x = position.cellX), (y = position.cellY);
   //diagonal right down
   while (convertCoordinatesToIndex(x, y) > -1) {
      highlightEmptyCells(convertCoordinatesToIndex(++x, ++y));
   }

   (x = position.cellX), (y = position.cellY);
   //diagonal left down
   while (convertCoordinatesToIndex(x, y) > -1) {
      highlightEmptyCells(convertCoordinatesToIndex(--x, ++y));
   }
}

function selectMove(currentPiece) {
   const possibleMoves = document.querySelectorAll(".highlight");

   possibleMoves.forEach(function(target) {
      target.addEventListener("click", function() {
         const cellIndex = parseInt(this.getAttribute("index"));
         const pieceIndex = parseInt(currentPiece.parentNode.getAttribute("index"));

         if (this.classList.contains("highlight") && cellIndex !== pieceIndex) {
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
