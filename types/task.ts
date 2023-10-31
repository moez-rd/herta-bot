import { DateTime } from "luxon";

export interface Task {
  name: string;
  description?: string;
  deadline?: DateTime;
}
