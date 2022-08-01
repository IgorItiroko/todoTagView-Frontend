import {
  allDone,
  allUndone,
  clearDone,
  deleteTask,
  done,
  edit,
  postTask,
} from "../api/apiCalls";
import { apiFailed } from "../styles/sweetAlerts";
import {
  SetBooleanType,
  SetStringType,
  TaskProps,
  SetTaskArrayType,
} from "../types/interfaces";
import { validateAllTasks } from "../utils/reusableFunctions";

export const newTaskOnEnterDown = async (
  event: { key: string },
  newTask: string,
  tasks: TaskProps[],
  setTasks: SetTaskArrayType,
  setNewTask: SetStringType
) => {
  try {
    if (event.key === "Enter" && newTask !== "") {
      const response = await postTask(newTask);
      setTasks(tasks.concat(response));
      setNewTask("");
    }
  } catch (e) {
    apiFailed.fire();
  }
};

export const checkAllHandler = async (
  tasks: TaskProps[],
  setTasks: SetTaskArrayType
) => {
  try {
    const isAllDone = validateAllTasks(tasks);
    if (isAllDone) {
      await allUndone();
    } else {
      await allDone();
    }
    setTasks(tasks.map((task: TaskProps) => ({ ...task, done: !isAllDone })));
  } catch (e) {
    apiFailed.fire();
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

export const doneTaskHandler = async (
  id: number,
  description: string,
  isDone: boolean,
  tasks: TaskProps[],
  setTasks: SetTaskArrayType
) => {
  try {
    await done(id, description, isDone);
    setTasks(
      tasks.map((task: TaskProps) => {
        if (task.id === id) {
          return { ...task, done: !isDone };
        } else {
          return task;
        }
      })
    );
  } catch (e) {
    apiFailed.fire();
  }
};

export const clearDoneHandler = async (
  tasks: TaskProps[],
  setTasks: SetTaskArrayType
) => {
  try {
    await clearDone();
    setTasks(tasks.filter((value: { done: boolean }) => !value.done));
  } catch (e) {
    apiFailed.fire();
  }
};

export const submitEditHandler = async (
  id: number,
  newDescription: string,
  isDone: boolean,
  tasks: TaskProps[],
  setTasks: SetTaskArrayType,
  editable: boolean,
  setEditable: SetBooleanType
) => {
  try {
    if (newDescription !== "") {
      await edit(id, newDescription, isDone);
      setEditable(!editable);
      setTasks(
        tasks.map((task: TaskProps) => {
          if (task.id === id) {
            return { ...task, description: newDescription };
          } else {
            return task;
          }
        })
      );
    } else {
      await deleteTask(id);
      setTasks(tasks.filter((value: { id: number }) => value.id !== id));
    }
  } catch (e) {
    apiFailed.fire();
  }
};

export const submitTaskOnKeyDownHandler = async (
  event: { key: string },
  id: number,
  newDescription: string,
  isDone: boolean,
  tasks: TaskProps[],
  setTasks: SetTaskArrayType,
  editable: boolean,
  setEditable: SetBooleanType
) => {
  try {
    if (event.key === "Enter") {
      if (newDescription !== "") {
        await edit(id, newDescription, isDone);
        setEditable(!editable);
        setTasks(
          tasks.map((task: TaskProps) => {
            if (task.id === id) {
              return { ...task, description: newDescription };
            } else {
              return task;
            }
          })
        );
      } else {
        await deleteTask(id);
        setTasks(tasks.filter((value: { id: number }) => value.id !== id));
      }
    }
  } catch (e) {
    apiFailed.fire();
  }
};
