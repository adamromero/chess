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

   //TODO: block 2 tile jump when a piece is in front of it
   function setPawnPositions(x, y, color) {
      if (color === "w") {
         if (!cellIsTakenByOpponent(x, y - 1)) {
            setHighlightOnValidCells(x, y, [0, -1], false);
         }
         //first move for pawns have option of moving two spaces ahead
         if (y === 6) {
            setHighlightOnValidCells(x, y, [0, -2], false);

            if (cellIsTakenByOpponent(x - 1, y - 1)) {
               setHighlightOnValidCells(x, y, [-1, -1], false);
            }
            if (cellIsTakenByOpponent(x + 1, y - 1)) {
               setHighlightOnValidCells(x, y, [1, -1], false);
            }
         } else {
            if (cellIsTakenByOpponent(x - 1, y - 1)) {
               setHighlightOnValidCells(x, y, [-1, -1], false);
            }
            if (cellIsTakenByOpponent(x + 1, y - 1)) {
               setHighlightOnValidCells(x, y, [1, -1], false);
            }
         }
      } else if (color === "b") {
         if (!cellIsTakenByOpponent(x, y + 1)) {
            setHighlightOnValidCells(x, y, [0, 1], false);
         }
         //first move for pawns have option of moving two spaces ahead
         if (y === 1) {
            setHighlightOnValidCells(x, y, [0, 2], false);
            if (cellIsTakenByOpponent(x - 1, y + 1)) {
               setHighlightOnValidCells(x, y, [-1, 1], false);
            }
            if (cellIsTakenByOpponent(x + 1, y + 1)) {
               setHighlightOnValidCells(x, y, [1, 1], false);
            }
         } else {
            if (cellIsTakenByOpponent(x - 1, y + 1)) {
               setHighlightOnValidCells(x, y, [-1, 1], false);
            }
            if (cellIsTakenByOpponent(x + 1, y + 1)) {
               setHighlightOnValidCells(x, y, [1, 1], false);
            }
         }
      }
   }

   function setKnightPositions(x, y) {
      setHighlightOnValidCells(x, y, [1, -2], false);
      setHighlightOnValidCells(x, y, [-1, -2], false);
      setHighlightOnValidCells(x, y, [-2, 1], false);
      setHighlightOnValidCells(x, y, [-2, -1], false);
      setHighlightOnValidCells(x, y, [2, 1], false);
      setHighlightOnValidCells(x, y, [2, -1], false);
      setHighlightOnValidCells(x, y, [1, 2], false);
      setHighlightOnValidCells(x, y, [-1, 2], false);
   }

   function setKingPositions(x, y) {
      setHighlightOnValidCells(x, y, [-1, -1], false);
      setHighlightOnValidCells(x, y, [0, -1], false);
      setHighlightOnValidCells(x, y, [1, -1], false);
      setHighlightOnValidCells(x, y, [-1, 0], false);
      setHighlightOnValidCells(x, y, [1, 0], false);
      setHighlightOnValidCells(x, y, [-1, 1], false);
      setHighlightOnValidCells(x, y, [0, 1], false);
      setHighlightOnValidCells(x, y, [1, 1], false);
   }

   function setHorizontalVerticalPositions(x, y) {
      setHighlightOnValidCells(x, y, [0, -1], true);
      setHighlightOnValidCells(x, y, [0, 1], true);
      setHighlightOnValidCells(x, y, [-1, 0], true);
      setHighlightOnValidCells(x, y, [1, 0], true);
   }

   function setDiagonalPositions(x, y) {
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
            if (cellIsEmpty(x, y)) {
               setHighlight(y * 8 + x);
            } else {
               pieceBlocking = true;
               if (cellIsTakenByOpponent(x, y)) {
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

   function cellIsTakenByOpponent(x, y) {
      const cell = board[convertCoordinatesToIndex(x, y)];
      const playerTurn = whiteTurn ? "w" : "b";

      if (typeof cell !== "undefined" && cell.innerHTML.trim().length) {
         const color = cell.firstElementChild.classList[1].substring(0, 1);
         return color !== playerTurn;
      }
      return false;
   }

   function cellIsEmpty(x, y) {
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

   function setMovesForPieces(fullPiece, x, y, color) {
      const piece = fullPiece.substring(1, fullPiece.length);

      if (piece === "p") {
         setPawnPositions(x, y, color);
      }

      if (piece === "kn") {
         setKnightPositions(x, y);
      }

      if (piece === "b") {
         setDiagonalPositions(x, y);
      }

      if (piece === "r") {
         setHorizontalVerticalPositions(x, y);
      }

      if (piece === "q") {
         setDiagonalPositions(x, y);
         setHorizontalVerticalPositions(x, y);
      }

      if (piece === "kg") {
         setKingPositions(x, y);
      }
   }

   function highlightPossibleMoves(currentPiece) {
      //get the class of the current piece
      const piece = currentPiece.classList[1];
      //get index of the current piece selected
      const pieceIndex = parseInt(
         currentPiece.parentNode.getAttribute("index")
      );
      //convert the piece index into x and y coordinates
      const x = pieceIndex % BOARD_SIZE;
      const y = Math.floor(pieceIndex / BOARD_SIZE);

      const color = piece.substring(0, 1);
      if (color === "w") {
         setMovesForPieces(piece, x, y, color);
      } else if (color === "b") {
         setMovesForPieces(piece, x, y, color);
      }
   }

   function moveSelectedPiece(currentPiece) {
      const possibleMoves = document.querySelectorAll(".highlight");

      possibleMoves.forEach(function(target) {
         target.addEventListener("click", function() {
            const cellIndex = parseInt(this.getAttribute("index"));

            console.log("currentpicec 2: ", currentPiece.parentNode);

            const pieceIndex = parseInt(
               currentPiece.parentNode.getAttribute("index")
            );

            if (
               this.classList.contains("highlight") &&
               currentPiece.parentNode.classList.contains("selected") &&
               cellIndex !== pieceIndex
            ) {
               this.innerHTML = "";
               this.append(currentPiece);
               clearSelection();
               whiteTurn = !whiteTurn;
            }
         });
      });
   }

   function gameIsWon() {
      return document.querySelectorAll(".wkg, .bkg").length === 1;
   }

   function bindMovement() {
      pieces.forEach(function(piece) {
         piece.addEventListener("click", function() {
            const currentPiece = this;
            const playerTurn = whiteTurn ? "w" : "b";

            console.log("currentpiece: ", currentPiece);

            if (playerTurn === currentPiece.classList[1].substring(0, 1)) {
               if (currentPiece.parentNode.classList.contains("selected")) {
                  clearSelection();
               } else {
                  clearSelection();
                  currentPiece.parentNode.classList.add("selected");
                  highlightPossibleMoves(currentPiece);
                  moveSelectedPiece(currentPiece);
                  console.log("shitshow");
                  if (gameIsWon()) {
                     document.getElementById("message").innerText = `${
                        whiteTurn ? "White" : "Black"
                     } wins!`;
                     //pieces.removeEventListener("click", this, true);
                  }
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
            const currentPiece = this;
            const playerTurn = whiteTurn ? "w" : "b";
            if (playerTurn === currentPiece.classList[1].substring(0, 1)) {
               this.parentNode.classList.remove("highlight");
            }
         });
      });
   }

   function init() {
      bindMovement();
   }

   return { init };
})();

Chess.init();
