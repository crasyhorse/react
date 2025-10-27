export interface Project {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

export interface DialogHandle {
    open: () => void;
}