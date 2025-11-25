export type TOpinion = {
  id?: string;
  title: FormDataEntryValue | null;
  body: FormDataEntryValue | null;
  userName: FormDataEntryValue | null;
  votes?: number;
};
