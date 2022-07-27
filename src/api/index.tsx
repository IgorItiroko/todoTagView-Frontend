import axios from 'axios';

const apiRoute = 'http://localhost:3001/api'

type GetTasks = () => Promise<[{id: number, description: string, done: boolean}]>

export const getTasks: GetTasks = async () => {
    const response = await axios.get(apiRoute + '/tasks')
    .then((res) => {
        return res;
    })
    .catch(
        (error) => {
            console.log(error)
        }
    )
    return response!.data
}

export const postTask = async (newTask: string) => {
    await axios.post(apiRoute + '/tasks', {
        done: false,
        description: newTask,
    }).catch(
        (error) => {
            console.log(error)
        }
    )
    return
}

export const deleteTask = async (id: number) => {
    await axios.delete(apiRoute + `/tasks/${id}`)
    .catch((error) => {
        console.log(error)
    })
    return
}

export const allDone = async () => {
    await axios.put(apiRoute + `/checkAll`)
    .catch((error) => {
        console.log(error)
    })
    return
}

export const allUndone = async () => {
    await axios.put(apiRoute + `/uncheckAll`)
    .catch((error) => {
        console.log(error)
    })
    return
}

export const done = async (id: number, currentDesc: string, done: boolean) => {
    await axios.put(apiRoute + `/tasks/${id}`,{
        description: currentDesc,
        done: !done
    })
    .catch((error) => {
        console.log(error)
    })
    return
}
