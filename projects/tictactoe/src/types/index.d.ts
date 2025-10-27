export type GameBoardType = (string | null)[][];

export interface LogData {
  square: {
    rowIndex: number;
    colIndex: number;
  };

  player: PlayerSymbol;
}

export type PlayerSymbol = "X" | "O";
