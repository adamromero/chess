const Chess = (function() {
   const board = document.querySelectorAll(".cell");
   const pieces = document.querySelectorAll(".piece");
   const BOARD_SIZE = 8;
   let whiteTurn = true;
   let isChecked = false;

   function convertIndexToCoordinates(index) {
      return {
         x: index % BOARD_SIZE,
         y: Math.floor(index / BOARD_SIZE)
      };
   }

   function convertCoordinatesToIndex(x, y) {
      if (coordinatesInBounds(x, y)) {
         return y * BOARD_SIZE + x;
      }
      return -1;
   }

   function coordinatesInBounds(x, y) {
      return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
   }

   function setPawnPositionsByColor(x, y, color) {
      let forward, left, right, twoForward, row;
      if (color === "w") {
         row = 6;
         forward = [0, -1];
         left = [-1, -1];
         right = [1, -1];
         twoForward = [0, -2];
      } else {
         row = 1;
         forward = [0, 1];
         left = [-1, 1];
         right = [1, 1];
         twoForward = [0, 2];
      }
      //prevent attack from the front
      if (!cellIsTakenByOpponent(x, y + forward[1])) {
         setHighlightOnValidCells(x, y, forward);
      }
      //allow diagonal attacks
      if (cellIsTakenByOpponent(x + left[0], y + left[1])) {
         setHighlightOnValidCells(x, y, left);
      }
      if (cellIsTakenByOpponent(x + right[0], y + right[1])) {
         setHighlightOnValidCells(x, y, right);
      }
      //first move for pawns have option of moving two spaces ahead
      if (y === row) {
         //prevent two tile jump when a piece is in front of it
         if (cellIsEmpty(x, y + forward[1])) {
            setHighlightOnValidCells(x, y, twoForward);
         }
      }
   }

   function setPawnPositions(x, y, color) {
      if (color === "w") {
         setPawnPositionsByColor(x, y, color);
      } else if (color === "b") {
         setPawnPositionsByColor(x, y, color);
      }
   }

   function setKnightPositions(x, y) {
      setHighlightOnValidCells(x, y, [1, -2]);
      setHighlightOnValidCells(x, y, [-1, -2]);
      setHighlightOnValidCells(x, y, [-2, 1]);
      setHighlightOnValidCells(x, y, [-2, -1]);
      setHighlightOnValidCells(x, y, [2, 1]);
      setHighlightOnValidCells(x, y, [2, -1]);
      setHighlightOnValidCells(x, y, [1, 2]);
      setHighlightOnValidCells(x, y, [-1, 2]);
   }

   function setKingPositions(x, y) {
      setHighlightOnValidCells(x, y, [-1, -1]);
      setHighlightOnValidCells(x, y, [0, -1]);
      setHighlightOnValidCells(x, y, [1, -1]);
      setHighlightOnValidCells(x, y, [-1, 0]);
      setHighlightOnValidCells(x, y, [1, 0]);
      setHighlightOnValidCells(x, y, [-1, 1]);
      setHighlightOnValidCells(x, y, [0, 1]);
      setHighlightOnValidCells(x, y, [1, 1]);
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

   function setHighlightOnValidCells(x, y, shiftCoordinates, spanBoard = false) {
      let pieceBlocking = false;
      while (true) {
         x += shiftCoordinates[0];
         y += shiftCoordinates[1];
         if (coordinatesInBounds(x, y) && !pieceBlocking) {
            if (cellIsEmpty(x, y)) {
               setHighlight(convertCoordinatesToIndex(x, y));
            } else {
               pieceBlocking = true;
               if (cellIsTakenByOpponent(x, y)) {
                  setHighlight(convertCoordinatesToIndex(x, y));
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

   function setHighlight(index, checkedTile = false) {
      board[index].classList.add("highlight");
      if (checkedTile) {
         board[index].classList.add("checked");
      }
   }

   function clearSelection() {
      board.forEach(function(cell) {
         cell.classList.remove("highlight");
         cell.classList.remove("selected");
      });
   }

   function setMovesForPieces(piece, x, y, color) {
      if (isPawn(piece)) {
         setPawnPositions(x, y, color);
      }

      if (isKnight(piece)) {
         setKnightPositions(x, y);
      }

      if (isBishop(piece)) {
         setDiagonalPositions(x, y);
      }

      if (isRook(piece)) {
         setHorizontalVerticalPositions(x, y);
      }

      if (isQueen(piece)) {
         setDiagonalPositions(x, y);
         setHorizontalVerticalPositions(x, y);
      }

      if (isKing(piece)) {
         setKingPositions(x, y);
         isCheckedPosition();
      }
   }

   function isPawn(piece) {
      return piece.classList[1].substring(1, piece.length) === "p";
   }

   function isKnight(piece) {
      return piece.classList[1].substring(1, piece.length) === "kn";
   }

   function isBishop(piece) {
      return piece.classList[1].substring(1, piece.length) === "b";
   }

   function isRook(piece) {
      return piece.classList[1].substring(1, piece.length) === "r";
   }

   function isQueen(piece) {
      return piece.classList[1].substring(1, piece.length) === "q";
   }

   function isKing(piece) {
      return piece.classList[1].substring(1, piece.length) === "kg";
   }

   function highlightPossibleMoves(piece) {
      //get index of the current piece selected
      const pieceIndex = parseInt(piece.parentNode.getAttribute("index"));
      //convert the piece index into x and y coordinates
      const x = convertIndexToCoordinates(pieceIndex).x;
      const y = convertIndexToCoordinates(pieceIndex).y;

      const color = piece.classList[1].substring(0, 1);
      if (color === "w") {
         setMovesForPieces(piece, x, y, color);
      } else if (color === "b") {
         setMovesForPieces(piece, x, y, color);
      }
   }

   function kingIsInCheck(x, y, shiftCoordinates, spanBoard = false) {
      let pieceBlocking = false;
      while (true) {
         x += shiftCoordinates[0];
         y += shiftCoordinates[1];
         if (coordinatesInBounds(x, y) && !pieceBlocking) {
            if (!cellIsEmpty(x, y)) {
               pieceBlocking = true;
               if (cellIsTakenByOpponent(x, y) && isOpponentKing(x, y)) {
                  displayMessage("Check");
                  setHighlight(convertCoordinatesToIndex(x, y), true);
                  isChecked = true;
               } else {
                  isChecked = false;
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

   function isHighlighted(x, y) {
      return board[convertCoordinatesToIndex(x, y)].classList.contains("highlight");
   }

   function removeHighlightedKingMoves(x, y, shiftCoordinates, spanBoard = false) {
      let pieceBlocking = false;
      while (true) {
         x += shiftCoordinates[0];
         y += shiftCoordinates[1];
         if (coordinatesInBounds(x, y) && !pieceBlocking) {
            if (!cellIsEmpty(x, y)) {
               pieceBlocking = true;
            } else if (isHighlighted(x, y)) {
               board[convertCoordinatesToIndex(x, y)].classList.remove("highlight");
            }
            if (!spanBoard) {
               break;
            }
         } else {
            break;
         }
      }
   }

   function isOpponentPiece(piece) {
      if (whiteTurn) {
         return piece.classList[1].substring(0, 1) === "b"
      } 
      return piece.classList[1].substring(0, 1) === "w"
   }

   function isCheckedPosition() {
      pieces.forEach(function(piece) {
         const index = piece.parentNode.getAttribute("index");
         const x = convertIndexToCoordinates(index).x;
         const y = convertIndexToCoordinates(index).y;

         if (isRook(piece) && isOpponentPiece(piece) || isQueen(piece) && isOpponentPiece(piece)) {
            removeHighlightedKingMoves(x, y, [0, -1], true);
            removeHighlightedKingMoves(x, y, [0, 1], true);
            removeHighlightedKingMoves(x, y, [-1, 0], true);
            removeHighlightedKingMoves(x, y, [1, 0], true);
         }

         if (isBishop(piece) && isOpponentPiece(piece) || isQueen(piece) && isOpponentPiece(piece)) {
            removeHighlightedKingMoves(x, y, [-1, -1], true);
            removeHighlightedKingMoves(x, y, [1, -1], true);
            removeHighlightedKingMoves(x, y, [1, 1], true);
            removeHighlightedKingMoves(x, y, [-1, 1], true);
         }

         if (isKnight(piece) && isOpponentPiece(piece)) {
            removeHighlightedKingMoves(x, y, [1, -2]);
            removeHighlightedKingMoves(x, y, [-1, -2]);
            removeHighlightedKingMoves(x, y, [-2, 1]);
            removeHighlightedKingMoves(x, y, [-2, -1]);
            removeHighlightedKingMoves(x, y, [2, 1]);
            removeHighlightedKingMoves(x, y, [2, -1]);
            removeHighlightedKingMoves(x, y, [1, 2]);
            removeHighlightedKingMoves(x, y, [-1, 2]);
         }

         if (isKing(piece) && isOpponentPiece(piece)) {
            removeHighlightedKingMoves(x, y, [-1, -1]);
            removeHighlightedKingMoves(x, y, [0, -1]);
            removeHighlightedKingMoves(x, y, [1, -1]);
            removeHighlightedKingMoves(x, y, [-1, 0]);
            removeHighlightedKingMoves(x, y, [1, 0]);
            removeHighlightedKingMoves(x, y, [-1, 1]);
            removeHighlightedKingMoves(x, y, [0, 1]);
            removeHighlightedKingMoves(x, y, [1, 1]);
         }
      });
   }

   //TODO: prevent king from moving into a checked position
   //prevent movement of pieces that will expose king to check
   function check(piece) {
      const index = piece.parentNode.getAttribute("index");
      const x = convertIndexToCoordinates(index).x;
      const y = convertIndexToCoordinates(index).y;

      if (isPawn(piece)) {
         if (whiteTurn) {
            //check white pawn attack
            kingIsInCheck(x, y, [-1, -1]);
            kingIsInCheck(x, y, [1, -1]);
         } else {
            //check black pawn attack
            kingIsInCheck(x, y, [-1, 1]);
            kingIsInCheck(x, y, [1, 1]);
         }
      }

      if (isRook(piece) || isQueen(piece)) {
         kingIsInCheck(x, y, [0, -1], true);
         kingIsInCheck(x, y, [0, 1], true);
         kingIsInCheck(x, y, [-1, 0], true);
         kingIsInCheck(x, y, [1, 0], true);
      }

      if (isBishop(piece) || isQueen(piece)) {
         kingIsInCheck(x, y, [-1, -1], true);
         kingIsInCheck(x, y, [1, -1], true);
         kingIsInCheck(x, y, [1, 1], true);
         kingIsInCheck(x, y, [-1, 1], true);
      }

      if (isKnight(piece)) {
         kingIsInCheck(x, y, [1, -2]);
         kingIsInCheck(x, y, [-1, -2]);
         kingIsInCheck(x, y, [-2, 1]);
         kingIsInCheck(x, y, [-2, -1]);
         kingIsInCheck(x, y, [2, 1]);
         kingIsInCheck(x, y, [2, -1]);
         kingIsInCheck(x, y, [1, 2]);
         kingIsInCheck(x, y, [-1, 2]);
      }

      if (isKing(piece)) {
         kingIsInCheck(x, y, [-1, -1]);
         kingIsInCheck(x, y, [0, -1]);
         kingIsInCheck(x, y, [1, -1]);
         kingIsInCheck(x, y, [-1, 0]);
         kingIsInCheck(x, y, [1, 0]);
         kingIsInCheck(x, y, [-1, 1]);
         kingIsInCheck(x, y, [0, 1]);
         kingIsInCheck(x, y, [1, 1]);
      }
   }

   function checkMate(king) {
      
   }

   function gameOver() {
      return document.querySelectorAll(".wkg, .bkg").length === 1;
   }

   function isOpponentKing(x, y) {
      const kingClass = whiteTurn ? "bkg" : "wkg";
      return board[
         convertCoordinatesToIndex(x, y)
      ].firstElementChild.classList.contains(kingClass);
   }

   function displayMessage(message) {
      document.getElementById("message").innerText = message;
   }

   function moveSelectedPiece(currentPiece) {
      displayMessage("");
      const possibleMoves = document.querySelectorAll(".highlight");

      possibleMoves.forEach(function handleMovement(target) {
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
               this.innerHTML = "";
               this.append(currentPiece);
               clearSelection();
               check(currentPiece);

               //replace gameOver with checkMate once it is implemented
               if (gameOver()) {
                  displayMessage(`${whiteTurn ? "White" : "Black"} wins!`);
                  clearEventListeners();
               }
               whiteTurn = !whiteTurn;
            }
         });
      });
   }

   function clearEventListeners() {
      window.addEventListener(
         "click",
         function(event) {
            event.stopPropagation();
         },
         true
      );
      window.addEventListener(
         "mouseover",
         function(event) {
            event.stopPropagation();
         },
         true
      );
   }

   function selectPiece(piece) {
      clearSelection();
      piece.parentNode.classList.add("selected");
      highlightPossibleMoves(piece);
      moveSelectedPiece(piece);
   }

   function start() {
      pieces.forEach(function(piece) {
         piece.addEventListener("click", function() {
            const currentPiece = this;
            const playerTurn = whiteTurn ? "w" : "b";

            if (playerTurn === currentPiece.classList[1].substring(0, 1)) {
               if (currentPiece.parentNode.classList.contains("selected")) {
                  //this allows player to deselect a piece
                  clearSelection();
               } else {
                  //this allows player to select a piece
                  if (!isChecked) {
                     selectPiece(currentPiece);
                  } else if (isKing(currentPiece)) {
                     selectPiece(currentPiece);
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

   return { start };
})();

Chess.start();
