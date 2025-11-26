import type { TOpinion } from "@/types";
import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type TOpinionsContext = {
  opinions: TOpinion[];
  addOpinion: (opinion: TOpinion) => Promise<void>;
  upvoteOpinion: (id: TOpinion["id"]) => Promise<void>;
  downvoteOpinion: (id: TOpinion["id"]) => Promise<void>;
};

export const OpinionsContext = createContext<TOpinionsContext>({
  opinions: [] as TOpinion[],
  addOpinion: async (_opinion) => {},
  upvoteOpinion: async (_id) => {},
  downvoteOpinion: async (_id) => {},
});


const BASE_URL = "http://localhost:3000";
export function OpinionsContextProvider({ children }: { children: ReactNode }) {
  const [opinions, setOpinions] = useState<TOpinion[]>([]);

  useEffect(() => {
    async function loadOpinions() {
      const response = await fetch(`${BASE_URL}/opinions`);
      const opinions = await response.json();
      setOpinions(opinions);
    }

    loadOpinions();
  }, []);

  async function addOpinion(enteredOpinionData: TOpinion) {
    console.log(enteredOpinionData);
    console.log(JSON.stringify(enteredOpinionData));
    const response = await fetch(`${BASE_URL}/opinions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enteredOpinionData),
    });

    if (!response.ok) {
      return;
    }

    const savedOpinion = await response.json();
    setOpinions((prevOpinions) => [savedOpinion, ...prevOpinions]);
  }

  async function upvoteOpinion(id: TOpinion["id"]) {
    const response = await fetch(`${BASE_URL}/opinions/${id}/upvote`, {
      method: "POST",
    });

    if (!response.ok) {
      return;
    }

    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion: TOpinion) => {
        if (opinion.id === id && opinion.votes) {
          return { ...opinion, votes: opinion.votes + 1 };
        }
        return opinion;
      });
    });
  }

  async function downvoteOpinion(id: TOpinion["id"]) {
    const response = await fetch(`${BASE_URL}/opinions/${id}/downvote`, {
      method: "POST",
    });

    if (!response.ok) {
      return;
    }
    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion: TOpinion) => {
        if (opinion.id === id && opinion.votes) {
          return { ...opinion, votes: opinion.votes - 1 };
        }
        return opinion;
      });
    });
  }

  const contextValue = {
    opinions: opinions,
    addOpinion,
    upvoteOpinion,
    downvoteOpinion,
  };

  return <OpinionsContext value={contextValue}>{children}</OpinionsContext>;
}
