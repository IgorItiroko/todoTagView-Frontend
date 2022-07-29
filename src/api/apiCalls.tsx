import axios from 'axios';
import { apiFailed } from '../styles/sweetAlerts';
import { GetTasks } from '../types/interfaces';


const apiRoute = 'http://localhost:3001/api'

export const getTasks: GetTasks = async () => {
    const response = await axios.get(apiRoute + '/tasks')
    .then((res) => {
        return res;
    })
    .catch(
        () => {
            apiFailed.fire();
        }
    )
    return response!.data
}

export const postTask = async (newTask: string) => {
    await axios.post(apiRoute + '/tasks', {
        done: false,
        description: newTask,
    }).catch(
        () => {
            apiFailed.fire()
        }
    )
    return
}

export const deleteTask = async (id: number) => {
    await axios.delete(apiRoute + `/tasks/${id}`)
    .catch(() => {
        apiFailed.fire()
    })
    return
}

export const clearDone = async () => {
    await axios.delete(apiRoute + `/destroyChecked`)
    .catch(() => {
        alert ()
    })
    return
}

export const allDone = async () => {
    await axios.put(apiRoute + `/checkAll`)
    .catch(() => {
        apiFailed.fire()
    })
    return
}

export const allUndone = async () => {
    await axios.put(apiRoute + `/uncheckAll`)
    .catch(() => {
        apiFailed.fire()
    })
    return
}

export const done = async (id: number, currentDesc: string, done: boolean) => {
    await axios.put(apiRoute + `/tasks/${id}`,{
        description: currentDesc,
        done: !done
    })
    .catch(() => {
        apiFailed.fire()
    })
    return
}

export const edit = async (id: number, newDesc: string, done: boolean) => {
    await axios.put(apiRoute + `/tasks/${id}`,{
        description: newDesc,
        done: done
    })
    .catch(() => {
        apiFailed.fire()
    })
    return
}