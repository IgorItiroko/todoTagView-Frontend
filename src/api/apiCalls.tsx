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
    await axios.post(apiRoute + "/tasks", {
      done: false,
      description: newTask,
    });
  } catch (e) {
    apiFailed.fire();
  }
  return;
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

export const done = async (id: number, currentDesc: string, done: boolean) => {
  try {
    await axios.put(apiRoute + `/tasks/${id}`, {
      description: currentDesc,
      done: !done,
    });
  } catch (e) {
    apiFailed.fire();
  }
  return;
};

export const edit = async (id: number, newDesc: string, done: boolean) => {
  try {
    await axios.put(apiRoute + `/tasks/${id}`, {
      description: newDesc,
      done: done,
    });
  } catch (e) {
    apiFailed.fire();
  }
  return;
};
