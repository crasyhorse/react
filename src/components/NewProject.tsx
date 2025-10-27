import Input from "@/components/Input/Input";
import { useRef, type ReactEventHandler } from "react";
import Modal from "./Modal";
import type { DialogHandle } from "@/types";

interface PropData {
  onAddProject: ReactEventHandler;
  onCancle: ReactEventHandler;
}

const NewProject = ({ onAddProject, onCancle }: PropData) => {
  const titleRef = useRef<typeof Input>(null);
  const descriptionRef = useRef<typeof Input>(null);
  const dueDateRef = useRef<typeof Input>(null);

  const modalRef = useRef<DialogHandle>(null);

  const handleSave: ReactEventHandler = () => {
    let title: string = "";
    let description: string = "";
    let dueDate: string = "";

    if (titleRef.current) {
      title = titleRef.current.value;
    }

    if (descriptionRef.current) {
      description = descriptionRef.current.value;
    }

    if (dueDateRef.current) {
      dueDate = dueDateRef.current.value;
    }

    if (
      title.trim() === "" ||
      description.trim() === "" ||
      dueDate.trim() === ""
    ) {
      modalRef.current?.open();
      return;
    }

    onAddProject({
      title: title,
      description: description,
      dueDate: dueDate,
    });
  };

  return (
    <>
      <Modal
        ref={modalRef}
        buttonCaption="OK"
        className="backdrop:bg-stone-900"
      >
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid input</h2>
        <p className="text-stone-600 mb-4">Oooops ... Looks like you've forgot to enter a value!</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={onCancle}
              className="text-stone-800 hover:text-stone-950"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={titleRef} label="Title" />
          <Input ref={descriptionRef} label="Description" isTextArea />
          <Input type="date" ref={dueDateRef} label="Due Date" />
        </div>
      </div>
    </>
  );
};

export default NewProject;
