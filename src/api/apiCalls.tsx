import axios from "axios";
import { apiFailed } from "../styles/sweetAlerts";
import { GetTasks } from "../types/interfaces";

const apiRoute = "http://localhost:3001/api";

export const getTasks: GetTasks = async () => {
  try {
    const response = await axios.get(apiRoute + "/tasks");
    return response!.data;
  } catch (e) {
    apiFailed.fire();
  }
};

export const postTask = async (newTask: string) => {
  try {
    const response = await axios.post(apiRoute + "/tasks", {
      done: false,
      description: newTask,
    });
    return response!.data;
  } catch (e) {
    apiFailed.fire();
  }
};

export const deleteTask = async (id: number) => {
  try {
    await axios.delete(apiRoute + `/tasks/${id}`);
  } catch (e) {
    apiFailed.fire();
  }
  return;
};

export const clearDone = async () => {
  try {
    await axios.delete(apiRoute + `/destroyChecked`);
  } catch (e) {
    apiFailed.fire();
  }
  return;
};

export const allDone = async () => {
  try {
    await axios.put(apiRoute + `/checkAll`);
  } catch (e) {
    apiFailed.fire();
  }
  return;
};

export const allUndone = async () => {
  try {
    await axios.put(apiRoute + `/uncheckAll`);
  } catch (e) {
    apiFailed.fire();
  }
  return;
};

export const done = async (id: number, done: boolean) => {
  try {
    await axios.put(apiRoute + `/tasks/${id}`, {
      done: !done,
    });
  } catch (e) {
    apiFailed.fire();
  }
  return;
};

export const edit = async (id: number, newDesc: string) => {
  try {
    await axios.put(apiRoute + `/tasks/${id}`, {
      description: newDesc,
    });
  } catch (e) {
    apiFailed.fire();
  }
  return;
};
