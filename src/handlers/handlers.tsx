import { allDone, allUndone, clearDone, deleteTask, done, postTask } from "../api/apiCalls";
import { TaskProps } from "../models/validates";

export const handleKeyDown = async (
  event: { key: string },
  newTask: string,
  loadTasks: Function,
  setNewTask: Function
) => {
  if (event.key === "Enter" && newTask !== '') {
    await postTask(newTask);
    loadTasks();
    setNewTask("");
  }
};

export const handleIfOnClick = async (
  validateAllDone: Function,
  tasks: TaskProps[],
  loadTasks: Function
) => {
  if (validateAllDone(tasks)) {
    await allUndone();
  } else {
    await allDone();
  }
  loadTasks();
};

export const deleteTaskHandler = async (
  id: number,
  loadTasks: Function
) => {
  await deleteTask(id);
  loadTasks();
};

export const doneTaskHandler = async (
  id: number,
  description: string,
  isDone: boolean,
  loadTasks: Function
) => {
  await done(id, description, isDone);
  loadTasks();
};

export const clearDoneHandler = async (loadTasks: Function) => {
    await clearDone();
    loadTasks();
}

