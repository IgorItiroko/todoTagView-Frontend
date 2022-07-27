import axios from 'axios';

const apiRoute = 'http://localhost:3001/api'

export const getTasks = async () => {
    axios.get(apiRoute + '/tasks')
        .then(response => {return response.data})
}

export const postTask = async (newTask: string) => {
    axios.post(apiRoute + '/tasks', {
        done: false,
        description: newTask,
    })
}