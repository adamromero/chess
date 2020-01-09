const Chess = (function() {
   const board = document.querySelectorAll(".cell");
   const pieces = document.querySelectorAll(".piece");
   const BOARD_SIZE = 8;
   let whiteTurn = true;

   function convertCoordinatesToIndex(x, y) {
      if (coordinatesInBounds(x, y)) {
         return y * BOARD_SIZE + x;
      }
      //returns -1 to represent an out of bounds index
      return -1;
   }

   function coordinatesInBounds(x, y) {
      return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
   }

   function setPawnPositions(position, color) {
      let x = position.cellX,
         y = position.cellY;

      if (color === "w") {
         highlightEmptyCells(convertCoordinatesToIndex(x, y - 1));
         //first move for pawns have option of moving two spaces ahead
         if (y === 6) {
            highlightEmptyCells(convertCoordinatesToIndex(x, y - 2));
         }
      } else if (color === "b") {
         highlightEmptyCells(convertCoordinatesToIndex(x, y + 1));
         //first move for pawns have option of moving two spaces ahead
         if (y === 1) {
            highlightEmptyCells(convertCoordinatesToIndex(x, y + 2));
         }
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
         y--;

         if (!isCellEmpty(board[convertCoordinatesToIndex(x, y)])) {
            break;
         } else {
            highlightEmptyCells(convertCoordinatesToIndex(x, y));
         }
      }

      y = position.cellY;
      while (convertCoordinatesToIndex(x, y) > -1) {
         y++;

         if (!isCellEmpty(board[convertCoordinatesToIndex(x, y)])) {
            break;
         } else {
            highlightEmptyCells(convertCoordinatesToIndex(x, y));
         }
      }

      y = position.cellY;
      while (convertCoordinatesToIndex(x, y) > -1) {
         x--;

         if (!isCellEmpty(board[convertCoordinatesToIndex(x, y)])) {
            break;
         } else {
            highlightEmptyCells(convertCoordinatesToIndex(x, y));
         }
      }

      x = position.cellX;
      while (convertCoordinatesToIndex(x, y) > -1) {
         x++;

         if (!isCellEmpty(board[convertCoordinatesToIndex(x, y)])) {
            break;
         } else {
            highlightEmptyCells(convertCoordinatesToIndex(x, y));
         }
      }
   }

   function setDiagonalPositions(position) {
      let x = position.cellX,
         y = position.cellY;

      //diagonal left up
      while (convertCoordinatesToIndex(x, y) > -1) {
         x--;
         y--;

         if (
            !isCellEmpty(board[convertCoordinatesToIndex(x, y)]) &&
            !isTakenCellOpponent(board[convertCoordinatesToIndex(x, y)])
         ) {
            break;
         } else {
            highlightEmptyCells(convertCoordinatesToIndex(x, y));
         }
      }

      (x = position.cellX), (y = position.cellY);
      //diagonal right up
      while (convertCoordinatesToIndex(x, y) > -1) {
         x++;
         y--;

         if (
            !isCellEmpty(board[convertCoordinatesToIndex(x, y)]) &&
            !isTakenCellOpponent(board[convertCoordinatesToIndex(x, y)])
         ) {
            break;
         } else {
            highlightEmptyCells(convertCoordinatesToIndex(x, y));
         }
      }

      (x = position.cellX), (y = position.cellY);
      //diagonal right down
      while (convertCoordinatesToIndex(x, y) > -1) {
         x++;
         y++;

         if (
            !isCellEmpty(board[convertCoordinatesToIndex(x, y)]) &&
            !isTakenCellOpponent(board[convertCoordinatesToIndex(x, y)])
         ) {
            break;
         } else {
            highlightEmptyCells(convertCoordinatesToIndex(x, y));
         }
      }

      (x = position.cellX), (y = position.cellY);
      //diagonal left down
      while (convertCoordinatesToIndex(x, y) > -1) {
         x--;
         y++;

         if (
            !isCellEmpty(board[convertCoordinatesToIndex(x, y)]) &&
            !isTakenCellOpponent(board[convertCoordinatesToIndex(x, y)])
         ) {
            break;
         } else {
            highlightEmptyCells(convertCoordinatesToIndex(x, y));
         }
      }
   }

   function isTakenCellOpponent(cell) {
      const playerTurn = whiteTurn ? "w" : "b";

      if (typeof cell !== "undefined" && cell.innerHTML.trim().length) {
         //console.log(cell.firstElementChild);
         const color = cell.firstElementChild.classList[1].substring(0, 1);

         console.log("color not equal turn: ", color === playerTurn);
         console.log("color: ", color);

         return color === playerTurn;
      }
      return false;
   }

   function isCellEmpty(cell) {
      if (typeof cell !== "undefined") {
         return !cell.innerHTML.trim().length;
      }
      return false;
   }

   function highlightEmptyCells(index) {
      const cell = board[index];

      if (index > -1 && isCellEmpty(cell)) {
         //cell.classList.add("highlight");
      }

      if (index > -1) {
         cell.classList.add("highlight");
      }
   }

   function clearSelection() {
      board.forEach(function(cell) {
         cell.classList.remove("highlight");
         cell.classList.remove("selected");
      });
   }

   function setPieceMoves(fullPiece, piecePosition, color) {
      const piece = fullPiece.substring(1, fullPiece.length);

      if (piece === "p") {
         setPawnPositions(piecePosition, color);
      }

      if (piece === "kn") {
         setKnightPositions(piecePosition);
      }

      if (piece === "b") {
         setDiagonalPositions(piecePosition);
      }

      if (piece === "r") {
         setHorizontalVerticalPositions(piecePosition);
      }

      if (piece === "q") {
         setDiagonalPositions(piecePosition);
         setHorizontalVerticalPositions(piecePosition);
      }

      if (piece === "kg") {
         setKingPositions(piecePosition);
      }
   }

   function highlightPossibleMoves(currentPiece) {
      const piece = currentPiece.classList[1];
      const pieceIndex = parseInt(
         currentPiece.parentNode.getAttribute("index")
      );

      const piecePosition = {
         cellX: pieceIndex % BOARD_SIZE,
         cellY: Math.floor(pieceIndex / BOARD_SIZE)
      };

      console.log("piece cell x: ", piecePosition.cellX);
      console.log("piece cell y: ", piecePosition.cellY);

      const color = piece.substring(0, 1);

      if (color === "w") {
         setPieceMoves(piece, piecePosition, color);
      } else if (color === "b") {
         setPieceMoves(piece, piecePosition, color);
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

            if (
               this.classList.contains("highlight") &&
               currentPiece.parentNode.classList.contains("selected") &&
               cellIndex !== pieceIndex
            ) {
               this.append(currentPiece);
               clearSelection();
               whiteTurn = !whiteTurn;
            }
         });
      });
   }

   function bindMovement() {
      pieces.forEach(function(piece) {
         piece.addEventListener("click", function() {
            const currentPiece = this;
            const playerTurn = whiteTurn ? "w" : "b";

            if (
               playerTurn === currentPiece.classList[1].substring(0, 1) ||
               true
            ) {
               if (currentPiece.parentNode.classList.contains("selected")) {
                  clearSelection();
               } else {
                  clearSelection();
                  currentPiece.parentNode.classList.add("selected");
                  highlightPossibleMoves(currentPiece);
                  selectMove(currentPiece);
               }
            }
         });

         piece.addEventListener("mouseover", function() {
            const currentPiece = this;
            const playerTurn = whiteTurn ? "w" : "b";
            if (
               playerTurn === currentPiece.classList[1].substring(0, 1) ||
               true
            ) {
               this.parentNode.classList.add("highlight");
            }
         });

         piece.addEventListener("mouseout", function() {
            this.parentNode.classList.remove("highlight");
         });
      });
   }

   function init() {
      bindMovement();
   }

   return { init };
})();

Chess.init();
