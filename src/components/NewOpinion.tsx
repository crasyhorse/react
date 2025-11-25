import { OpinionsContext } from "@/store/opinions-context";
import type { TOpinion } from "@/types";
import { useActionState, use } from "react";
import { Submit } from "@/components/Submit";

namespace NewOpinion {
  export type FormFields = Omit<TOpinion, "id" | "votes">;

  export type FormState = FormFields & {
    errors: string[];
  };
}
export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  const submitAction = async (
    oldState: NewOpinion.FormState,
    formData: FormData
  ): Promise<NewOpinion.FormState> => {
    const data: NewOpinion.FormFields = {
      userName: formData.get("userName"),
      title: formData.get("title"),
      body: formData.get("body"),
    };

    const errors: string[] = [];
    await addOpinion({
      userName: data.userName,
      title: data.title,
      body: data.body,
    });
    return { ...data, errors };
  };

  const [state, submitActionFn] = useActionState(submitAction, {
    userName: null,
    title: null,
    body: null,
    errors: [],
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={submitActionFn}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={state.userName as string}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={state.title as string}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={state.body as string}
          ></textarea>
        </p>
        <Submit />
      </form>
    </div>
  );
}
