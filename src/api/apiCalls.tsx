import axios from "axios";
import {
  DeleteTaskType,
  GetTasks,
  AddTaskType,
  ToggleDoneType,
  UpdateTaskDescriptionType,
} from "../types/interfaces";

axios.defaults.baseURL = "http://localhost:3001/api";

export const getTasks: GetTasks = () =>
  axios.get("/tasks").then((res) => res.data);

export const postTask: AddTaskType = (newTaskDescription: string) =>
  axios
    .post("/tasks", { description: newTaskDescription })
    .then((res) => res.data);

export const deleteTask: DeleteTaskType = (id: number) =>
  axios.delete(`/tasks/${id}`);

export const clearDone = () => axios.delete(`/destroyChecked`);

export const toggleAllDone = (changeAllTo: boolean) =>
  axios.put(`/toggleAllDone`, {
    done: changeAllTo,
  });

export const toggleDone: ToggleDoneType = (id: number, isDoneNow: boolean) =>
  axios.put(`/tasks/${id}`, {
    done: !isDoneNow,
  });

export const updateTaskDescription: UpdateTaskDescriptionType = (
  id: number,
  newDescription: string
) =>
  axios.put(`/tasks/${id}`, {
    description: newDescription,
  });
