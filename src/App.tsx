import { useEffect, useState } from 'react'
import axios from 'axios'

function App(){
    const apiRoute = 'http://localhost:3001/api'
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const getTasks = async () => {
        axios.get(apiRoute + '/tasks')
            .then(response => setTasks(response.data))
    }

    useEffect(()=>{
        getTasks();
    },[])

    const validateAllDone = () => {
        let done: boolean = true;
        tasks.forEach((element: {done: boolean}) => {
            if(element.done == false)
                done = false;
        })
        return done;
    }

    const handleKeyDown = async (event: {key: string;}) => {
        if(event.key === 'Enter'){
            axios.post(apiRoute + '/tasks', {
                done: false,
                description: newTask,
            }).then(()=> {getTasks(); setNewTask('')})
        }
    }

    const deleteTask = async (id: number) => {
        axios.delete(apiRoute + `/tasks/${id}`)
            .then(() => {getTasks();})
    }

    const allDone = async () => {
        axios.put(apiRoute + `/checkAll`)
            .then(() => {getTasks();})
    }

    const allUndone = async () => {
        axios.put(apiRoute + `/uncheckAll`)
            .then(() => {getTasks();})
    }

    const done = async (id: number, currentDesc: string, done: boolean) => {
        axios.put(apiRoute + `/tasks/${id}`,{
            description: currentDesc,
            done: !done
        }).then(()=>{getTasks();})
    }

    return(
        <div>
            <input type="text" value={newTask} name="newTask" onChange={(event)=>{(setNewTask(event.target.value))}} onKeyDown={handleKeyDown}/>
            <button onClick={validateAllDone()? allUndone : allDone}>V</button>
            {tasks.map((task: { id: number ,done: boolean, description: string}, index: number)=>{
                return(
                    <div key={index}>
                        {task.description},{task.done? 'true' : 'false'}
                        <button onClick={() => deleteTask(task.id)}>delete</button>
                        <button onClick={() => done(task.id, task.description, task.done)}>Done</button>
                    </div>
                )
            })}
        </div>
    )
}

export default App;