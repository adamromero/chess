const board = document.getElementById("board");
const BOARD_SIZE = 8;

const createBoard = () => {
   for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
         let tile = "";
         if (col % 2 !== row % 2) {
            tile = "black";
         }
         board.innerHTML += `<div class="cell ${tile}"><div class="piece wp"></div></div>`;
      }
   }
};

const init = () => {
   createBoard();
   console.log("hello");
};

init();
