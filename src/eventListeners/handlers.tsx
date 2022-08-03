import {
  clearDone,
  deleteTask,
  toggleDone,
  updateTaskDescription,
} from "../api/apiCalls";
import { apiFailed } from "../styles/sweetAlerts";
import {
  SetBooleanType,
  SetStringType,
  TaskProps,
  SetTaskArrayType,
} from "../types/interfaces";

export const newTaskOnEnterDown = (
  event: { key: string },
  newTask: string,
  setNewTask: SetStringType,
  onNewTask: Function
) => {
  if (event.key === "Enter" && newTask !== "") {
    onNewTask(newTask);
    setNewTask("");
  }
};

export const deleteTaskHandler = async (
  id: number,
  tasks: TaskProps[],
  setTasks: SetTaskArrayType
) => {
  try {
    await deleteTask(id);
    setTasks(tasks.filter((value: { id: number }) => value.id !== id));
  } catch (e) {
    apiFailed.fire();
  }
};

export const submitEditOnBlurHandler = async (
  taskId: number,
  newDescription: string,
  editable: boolean,
  setEditable: SetBooleanType,
  onTaskUpdate: Function,
  deleteTaskHandler: Function
) => {
  if (newDescription !== "") {
    onTaskUpdate(taskId, newDescription);
  } else {
    deleteTaskHandler(taskId);
  }
  setEditable(!editable);
};

export const submitTaskOnKeyDownHandler = async (
  event: { key: string },
  taskId: number,
  newDescription: string,
  editable: boolean,
  setEditable: SetBooleanType,
  onTaskUpdate: Function,
  deleteTaskHandler: Function
) => {
  if (event.key === "Enter") {
    if (newDescription !== "") {
      onTaskUpdate(taskId, newDescription);
    } else {
      deleteTaskHandler(taskId);
    }
    setEditable(!editable);
  }
};
