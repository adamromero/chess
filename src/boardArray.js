class Piece {
   constructor(boardId, image, color) {
      this.id = Math.random()
         .toString(36)
         .substr(2, 9);
      this.boardId = boardId;
      this.image = image;
      this.color = color;
   }

   getInfo() {
      console.log(
         `${this.id} and ${this.boardId} and ${this.image} and ${this.color}`
      );
   }

   getBoardId() {
      return this.boardId;
   }

   getPieceClass() {
      return this.image;
   }
}

let blackRook = new Piece(2, "br", "black");
let blackRook2 = new Piece(2, "br", "black");

let blackKnight = new Piece(3, "bkn", "black");
let blackKnight2 = new Piece(3, "bkn", "black");

let blackBishop = new Piece(4, "bb", "black");
let blackBishop2 = new Piece(4, "bb", "black");

let blackKing = new Piece(5, "bkg", "black");
let blackQueen = new Piece(6, "bq", "black");

let whiteRook = new Piece(2, "wr", "black");
let whiteRook2 = new Piece(2, "wr", "black");

let whiteKnight = new Piece(3, "wkn", "white");
let whiteKnight2 = new Piece(3, "wkn", "white");

let whiteBishop = new Piece(4, "wb", "white");
let whiteBishop2 = new Piece(4, "wb", "white");

let whiteKing = new Piece(5, "wkg", "white");
let whiteQueen = new Piece(6, "wq", "white");

export let boardArray = [
   blackRook,
   blackKnight,
   blackBishop,
   blackKing,
   blackQueen,
   blackBishop2,
   blackKnight2,
   blackRook2,
   new Piece(1, "bp", "black"),
   new Piece(1, "bp", "black"),
   new Piece(1, "bp", "black"),
   new Piece(1, "bp", "black"),
   new Piece(1, "bp", "black"),
   new Piece(1, "bp", "black"),
   new Piece(1, "bp", "black"),
   new Piece(1, "bp", "black"),
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   new Piece(1, "wp", "white"),
   new Piece(1, "wp", "white"),
   new Piece(1, "wp", "white"),
   new Piece(1, "wp", "white"),
   new Piece(1, "wp", "white"),
   new Piece(1, "wp", "white"),
   new Piece(1, "wp", "white"),
   new Piece(1, "wp", "white"),
   whiteRook,
   whiteKnight,
   whiteBishop,
   whiteKing,
   whiteQueen,
   whiteBishop2,
   whiteKnight2,
   whiteRook2
];
