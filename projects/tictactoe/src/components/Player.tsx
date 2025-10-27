import type { PlayerSymbol } from "@/types";
import { useState, type ChangeEvent } from "react";

type PropData = {
  name: string;
  symbol: "X" | "O";
  isActive: boolean;
  onSetPlayerName: (playerSymbol: PlayerSymbol, playerName: string) => void;
}

const Player = ({ name, symbol, isActive, onSetPlayerName }: PropData) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  const handleClick = (): void => {
    setIsEditing((state) => !state);
    onSetPlayerName(symbol, playerName);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPlayerName(event.target.value);
  };

  let playerNameElement: JSX.Element = (
    <span className="player-name">{playerName}</span>
  );

  let buttonCaption = "Edit";
  if (isEditing) {
    playerNameElement = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    buttonCaption = "Save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerNameElement}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{buttonCaption}</button>
    </li>
  );
};

export default Player;
