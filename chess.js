const Chess = (function() {
   const board = document.querySelectorAll(".cell");
   const pieces = document.querySelectorAll(".piece");
   const BOARD_SIZE = 8;
   let whiteTurn = true;

   function convertCoordinatesToIndex(x, y) {
      if (coordinatesInBounds(x, y)) {
         return y * BOARD_SIZE + x;
      }
      return -1;
   }

   function coordinatesInBounds(x, y) {
      return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
   }

   function setPawnPositions(position, color) {
      let x = position.cellX,
         y = position.cellY;

      if (color === "w") {
         setHighlightOnValidCells(x, y, [0, -1], false);
         //first move for pawns have option of moving two spaces ahead
         if (y === 6) {
            setHighlightOnValidCells(x, y, [0, -2], false);
         }
      } else if (color === "b") {
         setHighlightOnValidCells(x, y, [0, 1], false);
         //first move for pawns have option of moving two spaces ahead
         if (y === 1) {
            setHighlightOnValidCells(x, y, [0, 2], false);
         }
      }
   }

   function setKnightPositions(position) {
      let x = position.cellX,
         y = position.cellY;

      setHighlightOnValidCells(x, y, [1, -2], false);
      setHighlightOnValidCells(x, y, [-1, -2], false);
      setHighlightOnValidCells(x, y, [-2, 1], false);
      setHighlightOnValidCells(x, y, [-2, -1], false);
      setHighlightOnValidCells(x, y, [2, 1], false);
      setHighlightOnValidCells(x, y, [2, -1], false);
      setHighlightOnValidCells(x, y, [1, 2], false);
      setHighlightOnValidCells(x, y, [-1, 2], false);
   }

   function setKingPositions(position) {
      let x = position.cellX,
         y = position.cellY;

      setHighlightOnValidCells(x, y, [-1, -1], false);
      setHighlightOnValidCells(x, y, [0, -1], false);
      setHighlightOnValidCells(x, y, [1, -1], false);
      setHighlightOnValidCells(x, y, [-1, 0], false);
      setHighlightOnValidCells(x, y, [1, 0], false);
      setHighlightOnValidCells(x, y, [-1, 1], false);
      setHighlightOnValidCells(x, y, [0, 1], false);
      setHighlightOnValidCells(x, y, [1, 1], false);
   }

   function setHorizontalVerticalPositions(position) {
      let x = position.cellX,
         y = position.cellY;

      setHighlightOnValidCells(x, y, [0, -1], true);
      setHighlightOnValidCells(x, y, [0, 1], true);
      setHighlightOnValidCells(x, y, [-1, 0], true);
      setHighlightOnValidCells(x, y, [1, 0], true);
   }

   function setDiagonalPositions(position) {
      let x = position.cellX,
         y = position.cellY;

      setHighlightOnValidCells(x, y, [-1, -1], true);
      setHighlightOnValidCells(x, y, [1, -1], true);
      setHighlightOnValidCells(x, y, [1, 1], true);
      setHighlightOnValidCells(x, y, [-1, 1], true);
   }

   function setHighlightOnValidCells(x, y, shiftCoordinates, spanBoard) {
      let pieceBlocking = false;
      while (true) {
         x += shiftCoordinates[0];
         y += shiftCoordinates[1];
         if (coordinatesInBounds(x, y) && !pieceBlocking) {
            if (isCellEmpty(x, y)) {
               setHighlight(y * 8 + x);
            } else {
               pieceBlocking = true;
               if (isTakenCellOpponent(x, y)) {
                  setHighlight(y * 8 + x);
               } else {
                  break;
               }
            }
            if (!spanBoard) {
               break;
            }
         } else {
            break;
         }
      }
   }

   function isTakenCellOpponent(x, y) {
      const cell = board[convertCoordinatesToIndex(x, y)];
      const playerTurn = whiteTurn ? "w" : "b";

      if (typeof cell !== "undefined" && cell.innerHTML.trim().length) {
         const color = cell.firstElementChild.classList[1].substring(0, 1);
         return color !== playerTurn;
      }
      return false;
   }

   function isCellEmpty(x, y) {
      const cell = board[convertCoordinatesToIndex(x, y)];
      if (typeof cell !== "undefined") {
         return !cell.innerHTML.trim().length;
      }
      return false;
   }

   function setHighlight(index) {
      board[index].classList.add("highlight");
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

      const pieceIndex = parseInt(
         currentPiece.parentNode.getAttribute("index")
      );

      const piecePosition = {
         cellX: pieceIndex % BOARD_SIZE,
         cellY: Math.floor(pieceIndex / BOARD_SIZE)
      };

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
               /*
               if (!isCellEmpty(piecePosition.cellX, piecePosition.cellY)) {
                  console.log(this);
                  this.firstElementChild.remove();
               }
*/
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

            if (playerTurn === currentPiece.classList[1].substring(0, 1)) {
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
            if (playerTurn === currentPiece.classList[1].substring(0, 1)) {
               this.parentNode.classList.add("highlight");
            }
         });

         piece.addEventListener("mouseout", function() {
            /*
            if (
               playerTurn ===
               currentPiece.classList[1].substring(0, 1)
            ) {
               */
            this.parentNode.classList.remove("highlight");
            //}
         });
      });
   }

   function init() {
      bindMovement();
   }

   return { init };
})();

Chess.init();
