import { OpinionsContext } from "@/store/opinions-context";
import { useActionState, use } from "react";
import { Submit } from "@/components/Submit";

function getText(fd: FormData, key: string): string {
    const v = fd.get(key);
    return typeof v === "string" ? v : "";
}

namespace NewOpinion {
    export type FormFields = {
        userName: string;
        title: string;
        body: string;
    };

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
            userName: getText(formData, "userName"),
            title: getText(formData, "title"),
            body: getText(formData, "body"),

        };

        const errors: string[] = [];
        await addOpinion({
            userName: data.userName,
            title: data.title,
            body: data.body,
        });
        return { ...data, errors };
    };

    const initialState = {
        userName: "",
        title: "",
        body: "",
        errors: [],
    } satisfies NewOpinion.FormState;

    const [state, submitActionFn] = useActionState(submitAction, initialState);

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
                            defaultValue={state.userName}
                        />
                    </p>

                    <p className="control">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            defaultValue={state.title}
                        />
                    </p>
                </div>
                <p className="control">
                    <label htmlFor="body">Your Opinion</label>
                    <textarea
                        id="body"
                        name="body"
                        rows={5}
                        defaultValue={state.body}
                    ></textarea>
                </p>
                <Submit />
            </form>
        </div>
    );
}
