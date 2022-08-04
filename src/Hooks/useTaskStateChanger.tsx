import { useEffect, useState } from "react";
import {
  allDone,
  allUndone,
  clearDone,
  deleteTask,
  getTasks,
  postTask,
  toggleDone,
  updateTaskDescription,
} from "../api/apiCalls";
import { apiFailed } from "../styles/sweetAlerts";
import {
  FuncAddTaskType,
  FuncCheckAllDoneType,
  FuncClearDoneType,
  FuncDeleteType,
  FuncToggleStateType,
  FuncUpdateTasksDescription,
  TaskProps,
} from "../types/interfaces";
import { validateAllTasks } from "../utils/reusableFunctions";

export function useTaskStateChangers() {
  const [tasks, setTasks] = useState<Array<TaskProps>>([]);

  const setNewTask = (newTask: TaskProps) => tasks.concat(newTask);
  const setCheckAllTasks = (isAllDone: boolean) =>
    tasks.map((task: TaskProps) => ({ ...task, done: !isAllDone }));

  const addTask: FuncAddTaskType = (newTaskDescription: string) => {
    postTask(newTaskDescription)
      .then((response: TaskProps) => setTasks(setNewTask(response)))
      .catch(() => {
        apiFailed.fire();
      });
  };

  const checkAllDoneTasks: FuncCheckAllDoneType = async () => {
    try {
      const isAllDone = validateAllTasks(tasks);
      const itWorked = isAllDone ? allUndone() : allDone();
      if (await itWorked) setTasks(setCheckAllTasks(isAllDone));
    } catch (e) {
      apiFailed.fire();
    }
  };
  const setToggleTask = (taskId: number, isDone: boolean) =>
    tasks.map((task: TaskProps) =>
      task.id === taskId ? { ...task, done: !isDone } : task
    );

  const setClearDone = () =>
    tasks.filter((task: { done: boolean }) => !task.done);

  const setDeletedTask = (taskId: number) =>
    tasks.filter((task: { id: number }) => task.id !== taskId);

  const setUpdatedTask = (taskId: number, newDescription: string) =>
    tasks.map((task: TaskProps) =>
      task.id === taskId ? { ...task, description: newDescription } : task
    );

  const toggleTaskState: FuncToggleStateType = async (
    taskId: number,
    isDone: boolean
  ) => {
    try {
      const itWorked = toggleDone(taskId, isDone);
      if (await itWorked) setTasks(setToggleTask(taskId, isDone));
    } catch (e) {
      apiFailed.fire();
    }
  };

  const clearDoneHandler: FuncClearDoneType = async () => {
    try {
      const itWorked = clearDone();
      if (await itWorked) setTasks(setClearDone());
    } catch (e) {
      apiFailed.fire();
    }
  };

  const deleteTaskHandler: FuncDeleteType = async (taskId: number) => {
    try {
      const itWorked = deleteTask(taskId);
      if (await itWorked) setTasks(setDeletedTask(taskId));
    } catch (e) {
      apiFailed.fire();
    }
  };

  const updateTasksDescription: FuncUpdateTasksDescription = async (
    taskId: number,
    newDescription: string
  ) => {
    try {
      const itWorked = updateTaskDescription(taskId, newDescription);
      if (await itWorked) setTasks(setUpdatedTask(taskId, newDescription));
    } catch (e) {
      apiFailed.fire();
    }
  };

  useEffect(() => {
    getTasks().then((res: TaskProps[]) => setTasks(() => res));
  }, []);

  return {
    tasks,
    addTask,
    checkAllDoneTasks,
    toggleTaskState,
    clearDoneHandler,
    deleteTaskHandler,
    updateTasksDescription,
  };
}
