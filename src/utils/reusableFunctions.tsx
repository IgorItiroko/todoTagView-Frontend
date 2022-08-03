import { TaskProps } from "../types/interfaces";

export const validateAllTasks = (tasks: TaskProps[]) => {
  let done: boolean = true;
  tasks.forEach((element: { done: boolean }) => {
    if (element.done === false) done = false;
  });
  return done;
};

export const leftTasks = (tasks: TaskProps[]): number => {
  return tasks.filter((value: { done: boolean }) => !value.done).length;
};
