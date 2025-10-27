import Player from "@/components/Player";
import TimerChallenge from "@/components/TimerChallenge";

interface Timer {
  title: string;
  targetTime: number;
}
function App() {
  const timerList: Timer[] = [
    { title: "Eays", targetTime: 1 },
    { title: "Not Easy", targetTime: 5 },
    { title: "Getting Tough", targetTime: 10 },
    { title: "Pros Only", targetTime: 15 },
  ];

  const timerChallengeList: JSX.Element[] = timerList.map(
    (timer: Timer) => {
      return (
        <TimerChallenge title={timer.title} targetTime={timer.targetTime} />
      );
    }
  );
  return (
    <>
      <Player />
      <div id="challenges">{timerChallengeList}</div>
    </>
  );
}

export default App;
