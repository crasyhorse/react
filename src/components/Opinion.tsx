import type { TOpinion } from "@/types";
import { use, useActionState } from "react";
import { OpinionsContext } from "@/store/opinions-context";

namespace Opinion {
  export type Props = {
    opinion: TOpinion;
  };
}

export function Opinion({
  opinion: { id, title, body, userName, votes },
}: Opinion.Props) {
  const { downvoteOpinion, upvoteOpinion } = use(OpinionsContext);

  const downvoteAction = async () => {
    await downvoteOpinion(id);
  };

  const upvoteAction = async () => {
    await upvoteOpinion(id);
  };

  const [downvoteState, downvoteActionFn, downvotePending] = useActionState(
    downvoteAction,
    null
  );
  const [upvoteState, upvoteActionFn, upvotePending] = useActionState(
    upvoteAction,
    null
  );
  return (
    <article>
      <header>
        <h3>{title as string}</h3>
        <p>Shared by {userName as string}</p>
      </header>
      <p>{body as string}</p>
      <form className="votes">
        <button formAction={upvoteActionFn} disabled={upvotePending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{votes}</span>

        <button formAction={downvoteActionFn} disabled={downvotePending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
