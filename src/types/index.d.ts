interface Image {
  src: string;
  alt: string;
}

export interface Place {
  id: string;
  title: string;
  image: Image;
  lat: number;
  lon: number;
}

export interface DialogHandle {
  open: () => void;
  close: () => void;
}

export type State = Place[];
