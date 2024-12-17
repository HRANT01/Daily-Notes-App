export interface I_Post {
  id: number;
  title: string;
  body?: string;
  completed: boolean;
  currentEditText?: string;
}
