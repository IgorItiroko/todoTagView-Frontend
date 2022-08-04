import { TaskProps } from "../types/interfaces";

export const areAllTasksDone = (tasks: TaskProps[]) =>
  tasks.some((task: TaskProps) => task.done);

export const pendingTasksCount = (tasks: TaskProps[]): number =>
  tasks.filter((task: TaskProps) => !task.done).length;
