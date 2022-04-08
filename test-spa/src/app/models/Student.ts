import { Grade } from "./Grade";

export interface Student {
  id?: number;
  name?: string;
  email?: string;

  grades?: Grade[];
}
