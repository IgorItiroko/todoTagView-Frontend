import { useEffect, useState } from 'react'
import { allDone, allUndone, deleteTask, done, getTasks, postTask } from './api';
import { validateAllDone } from './models/validates';


function App(){
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const loadTasks = () => {
        const data = getTasks();
        data.then(function (result: any){
            setTasks(result)
        })
    }

    useEffect(()=>{
        loadTasks();
    },[])

    const handleKeyDown = async (event: {key: string;}) => {
        if(event.key === 'Enter'){
            await postTask(newTask);
            loadTasks();
            setNewTask('');
        }
    }

    const handleIfOnClick = async () => {
        if(validateAllDone(tasks)){
            await allUndone();
        } else {
            await allDone();
        }
        loadTasks();
    }

    const deleteTaskHandler = async (id: number) => {
        await deleteTask(id);
        loadTasks();
    }

    const doneTaskHandler = async (id: number, description: string, isDone: boolean) => {
        await done(id, description, isDone);
        loadTasks();
    }

    return(
        <div>
            <input type="text" value={newTask} name="newTask" onChange={(event)=>{(setNewTask(event.target.value))}} onKeyDown={handleKeyDown}/>
            <button onClick={handleIfOnClick}>V</button>
            {tasks.map((task: { id: number ,done: boolean, description: string}, index: number)=>{
                return(
                    <div key={index}>
                        {task.description},{task.done? 'true' : 'false'}
                        <button onClick={() => {deleteTaskHandler(task.id);}}>delete</button>
                        <button onClick={() => {doneTaskHandler(task.id, task.description, task.done);}}>Done</button>
                    </div>
                )
            })}
            {/* <br />
            active tasks: <br />
            {tasks.filter((value: {done: boolean})=> value.done === false).map((task: { id: number ,done: boolean, description: string}, index: number)=>{
                return(
                    <div key={index}>
                        {task.description},{task.done? 'true' : 'false'}
                        <button onClick={() => {deleteTask(task.id).then(loadTasks)}}>delete</button>
                        <button onClick={() => {done(task.id, task.description, task.done).then(loadTasks)}}>Done</button>
                    </div>
                )})}
                <br />
            completed tasks: <br />
            {tasks.filter((value: {done: boolean})=> value.done === true).map((task: { id: number ,done: boolean, description: string}, index: number)=>{
                return(
                    <div key={index}>
                        {task.description},{task.done? 'true' : 'false'}
                        <button onClick={ () => {deleteTask(task.id).then(loadTasks)}}>delete</button>
                        <button onClick={ () => {done(task.id, task.description, task.done).then(loadTasks)}}>Done</button>
                    </div>
                )})} */}
        </div>
    )
}

export default App;