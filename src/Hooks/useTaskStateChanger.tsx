import { useEffect, useState } from "react";
import {
  toggleAllDone as toggleAllTaskStatus,
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
import { areAllTasksDone } from "../utils/reusableFunctions";

export function useTaskStateChangers() {
  const [tasks, setTasks] = useState<Array<TaskProps>>([]);

  const addTask: FuncAddTaskType = (newTaskDescription: string) => {
    postTask(newTaskDescription)
      .then((response: TaskProps) =>
        setTasks((previousTasks) => previousTasks.concat(response))
      )
      .catch(() => {
        apiFailed.fire();
      });
  };

  const checkAllDoneTasks: FuncCheckAllDoneType = async () => {
    try {
      const isAllDone = areAllTasksDone(tasks);
      toggleAllTaskStatus(!isAllDone);
      setTasks((previousTasks) =>
        previousTasks.map((task: TaskProps) => ({ ...task, done: !isAllDone }))
      );
    } catch (e) {
      apiFailed.fire();
    }
  };

  const toggleTaskState: FuncToggleStateType = async (
    taskId: number,
    isDone: boolean
  ) => {
    try {
      const itWorked = toggleDone(taskId, isDone);
      if (await itWorked)
        setTasks((previousTasks) =>
          previousTasks.map((task: TaskProps) =>
            task.id === taskId ? { ...task, done: !isDone } : task
          )
        );
    } catch (e) {
      apiFailed.fire();
    }
  };

  const clearDoneHandler: FuncClearDoneType = async () => {
    try {
      const itWorked = clearDone();
      if (await itWorked)
        setTasks((previousTasks) =>
          previousTasks.filter((task: TaskProps) => !task.done)
        );
    } catch (e) {
      apiFailed.fire();
    }
  };

  const deleteTaskHandler: FuncDeleteType = async (taskId: number) => {
    try {
      const itWorked = deleteTask(taskId);
      if (await itWorked)
        setTasks((previousTasks) =>
          previousTasks.filter((task: { id: number }) => task.id !== taskId)
        );
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
      if (await itWorked)
        setTasks((previousTasks) =>
          previousTasks.map((task: TaskProps) =>
            task.id === taskId ? { ...task, description: newDescription } : task
          )
        );
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
