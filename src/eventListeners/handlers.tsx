import {
  allDone,
  allUndone,
  clearDone,
  deleteTask,
  done,
  edit,
  postTask,
} from "../api/apiCalls";
import {
  LoadTaskType,
  SetBooleanType,
  SetStringType,
  TaskProps,
  ValidationType,
} from "../types/interfaces";

export const newTaskOnEnterDown = async (
  event: { key: string },
  newTask: string,
  loadTasks: LoadTaskType,
  setNewTask: SetStringType
) => {
  if (event.key === "Enter" && newTask !== "") {
    await postTask(newTask);
    loadTasks();
    setNewTask("");
  }
};

export const checkAllHandler = async (
  validateAllDone: ValidationType,
  tasks: TaskProps[],
  loadTasks: LoadTaskType
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
  loadTasks: LoadTaskType
) => {
  await deleteTask(id);
  loadTasks();
};

export const doneTaskHandler = async (
  id: number,
  description: string,
  isDone: boolean,
  loadTasks: LoadTaskType
) => {
  await done(id, description, isDone);
  loadTasks();
};

export const clearDoneHandler = async (loadTasks: LoadTaskType) => {
  await clearDone();
  loadTasks();
};

export const submitEditHandler = async (
  id: number,
  description: string,
  isDone: boolean,
  loadTasks: LoadTaskType,
  editable: boolean,
  setEditable: SetBooleanType
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

export const submitTaskOnKeyDownHandler = async (
  event: { key: string },
  id: number,
  description: string,
  isDone: boolean,
  loadTasks: LoadTaskType,
  editable: boolean,
  setEditable: SetBooleanType
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
