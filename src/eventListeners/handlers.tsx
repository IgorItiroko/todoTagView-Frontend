import {
  FuncAddTaskType,
  FuncDeleteType,
  FuncUpdateTasksDescription,
  SetBooleanType,
  SetStringType,
} from "../types/interfaces";

export const newTaskOnEnterDown = (
  event: { key: string },
  newTask: string,
  setNewTask: SetStringType,
  onNewTask: FuncAddTaskType
) => {
  if (event.key === "Enter" && newTask !== "") {
    onNewTask(newTask);
    setNewTask("");
  }
};

export const submitEditOnBlurHandler = async (
  taskId: number,
  newDescription: string,
  editable: boolean,
  setEditable: SetBooleanType,
  onTaskUpdate: FuncUpdateTasksDescription,
  deleteTaskHandler: FuncDeleteType
) => {
  newDescription !== ""
    ? onTaskUpdate(taskId, newDescription)
    : deleteTaskHandler(taskId);
  setEditable(!editable);
};

export const submitTaskOnKeyDownHandler = async (
  event: { key: string },
  taskId: number,
  newDescription: string,
  editable: boolean,
  setEditable: SetBooleanType,
  onTaskUpdate: FuncUpdateTasksDescription,
  deleteTaskHandler: FuncDeleteType
) => {
  if (event.key === "Enter") {
    newDescription !== ""
      ? onTaskUpdate(taskId, newDescription)
      : deleteTaskHandler(taskId);
    setEditable(!editable);
  }
};
