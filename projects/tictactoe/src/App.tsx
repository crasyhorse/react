import Player from "@/components/Player";
import GameBoard from "@/components/GameBoard";
import Log from "@/components/Log";
import GameOver from "@/components/GameOver";

import { WINNING_COMBINATIONS } from "@/winning_combinations";

import { useState } from "react";
import type { GameBoardType, PlayerSymbol, LogData } from "@/types";

interface PlayerMap {
  [key: string]: string;

  X: "Player 1";
  O: "Player 2";
}

const INITIAL_GAME_BOARD: GameBoardType = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS: PlayerMap = {
  X: "Player 1",
  O: "Player 2",
};

const deriveGameBoard = (gameTurns: LogData[]): GameBoardType => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])];
  gameTurns.forEach((turn) => {
    const { square, player } = turn;
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = player;
  });

  return gameBoard;
};

const deriveWinner = (
  gameBoard: GameBoardType,
  players: PlayerMap
): string | null => {
  let winner: string | null = null;
  WINNING_COMBINATIONS.forEach((combination) => {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = players[firstSymbol];
    }
  });

  return winner;
};

function App() {
  const [gameTurns, setGameTurns] = useState<LogData[]>([]);
  const [players, setPlayers] = useState(PLAYERS);
  const currentlyActivePlayer: PlayerSymbol = gameTurns[0]?.player ?? "X";
  const playerSymbolMap: Map<PlayerSymbol, PlayerSymbol> = new Map([
    ["X", "O"],
    ["O", "X"],
  ]);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const isDraw = gameTurns.length === 9 && !winner;

  const handleRematch = (): void => {
    setGameTurns([]);
  };

  const handleSelectField = (rowIndex: number, colIndex: number) => {
    setGameTurns((oldGameTurns) => {
      let nextPlayer: PlayerSymbol = currentlyActivePlayer;

      if (gameTurns[0]) {
        nextPlayer = playerSymbolMap.get(currentlyActivePlayer) as PlayerSymbol;
      }

      const newGameTurns = [
        {
          square: { rowIndex: rowIndex, colIndex: colIndex },
          player: nextPlayer,
        },
        ...oldGameTurns,
      ];

      return newGameTurns;
    });
  };

  const handleSetPlayerName = (
    playerSymbol: PlayerSymbol,
    playerName: string
  ): void => {
    setPlayers((oldPlayerName) => ({
      ...oldPlayerName,
      [playerSymbol]: playerName,
    }));
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={players.X}
            symbol="X"
            isActive={currentlyActivePlayer === "X"}
            onSetPlayerName={handleSetPlayerName}
          />
          <Player
            name={players.O}
            symbol="O"
            isActive={currentlyActivePlayer === "O"}
            onSetPlayerName={handleSetPlayerName}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
        <GameBoard onSelectField={handleSelectField} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
