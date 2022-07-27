import axios from 'axios';

const apiRoute = 'http://localhost:3001/api'

type GetTasks = () => Promise<any[]>

export const getTasks: GetTasks = async () => {
    const response = await axios.get(apiRoute + '/tasks')
    return response.data
}

export const postTask = async (newTask: string) => {
    axios.post(apiRoute + '/tasks', {
        done: false,
        description: newTask,
    })
}

export const deleteTask = async (id: number) => {
    axios.delete(apiRoute + `/tasks/${id}`)
}

export const allDone = async () => {
    axios.put(apiRoute + `/checkAll`)
}

export const allUndone = async () => {
    axios.put(apiRoute + `/uncheckAll`)
}

export const done = async (id: number, currentDesc: string, done: boolean) => {
    axios.put(apiRoute + `/tasks/${id}`,{
        description: currentDesc,
        done: !done
    });
}
