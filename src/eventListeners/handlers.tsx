import {
  allDone,
  allUndone,
  clearDone,
  deleteTask,
  done,
  edit,
  postTask,
} from "../api/apiCalls";
import { TaskProps } from "../models/interfaces";

export const onKeyDownHandler = async (
  event: { key: string },
  newTask: string,
  loadTasks: Function,
  setNewTask: Function
) => {
  if (event.key === "Enter" && newTask !== "") {
    await postTask(newTask);
    loadTasks();
    setNewTask("");
  }
};

export const checkAllHandler = async (
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

export const deleteTaskHandler = async (id: number, loadTasks: Function) => {
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
};

export const submitEditHandler = async (
  id: number,
  description: string,
  isDone: boolean,
  loadTasks: Function,
  editable: boolean,
  setEditable: Function
) => {
  if (description !== "") {
    await edit(id, description, isDone);
    setEditable(!editable);
    loadTasks();
  } else {
    await deleteTask(id);
    loadTasks();
  }
};

export const onKeySubmitHandler = async (
  event: { key: string },
  id: number,
  description: string,
  isDone: boolean,
  loadTasks: Function,
  editable: boolean,
  setEditable: Function
) => {
  if (event.key === "Enter") {
    if (description !== "") {
      await edit(id, description, isDone);
      setEditable(!editable);
      loadTasks();
    } else {
      await deleteTask(id);
      loadTasks();
    }
  }
};
