type PropData = {
  winner: string | null;
  onRematch: () => void
}

const GameOver = ({ winner, onRematch }: PropData) => {
  const message = winner ? <p>{winner} won!</p> : <p>It's a draw!</p>;
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {message}
      <p>
        <button onClick={onRematch}>Rematch</button>
      </p>
    </div>
  );
};

export default GameOver;
