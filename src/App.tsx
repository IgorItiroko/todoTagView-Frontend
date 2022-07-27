import { useEffect, useState } from 'react'
import { getTasks } from './api/apiCalls';
import { clearDoneHandler, deleteTaskHandler, doneTaskHandler, handleIfOnClick, handleKeyDown } from './handlers/handlers';
import { TaskProps, validateAllDone } from './models/validates';

function App() {
    const [tasks, setTasks] = useState<Array<TaskProps>>([]);
    const [newTask, setNewTask] = useState<string>('');
    const [taskCounter, setTaskCounter] = useState<number>(0)

    const loadTasks = () => {
        const data = getTasks();
        data.then((result: TaskProps[]) => {
            setTasks(result);
            setTaskCounter(result.filter((value: { done: boolean }) => value.done === false).length)
        })
    }

    useEffect(() => {
        loadTasks();
    }, [])

    return (
        <div>
            <input type="text" value={newTask} name="newTask" onChange={(event) => { (setNewTask(event.target.value)) }} onKeyDown={(event) => { handleKeyDown(event, newTask, loadTasks, setNewTask) }} />
            <button onClick={() => { handleIfOnClick(validateAllDone, tasks, loadTasks) }}>V</button>
            {tasks.map((task: { id: number, done: boolean, description: string }, index: number) => {
                return (
                    <div key={index}>
                        {task.description},{task.done ? 'true' : 'false'}
                        <button onClick={() => { deleteTaskHandler(task.id, loadTasks ); }}>delete</button>
                        <button onClick={() => { doneTaskHandler(task.id, task.description, task.done, loadTasks); }}>Done</button>
                    </div>
                )
            })}
            <br />
            active tasks: <br />
            {tasks.filter((value: { done: boolean }) => value.done === false).map((task: { id: number, done: boolean, description: string }, index: number) => {
                return (
                    <div key={index}>
                        {task.description},{task.done ? 'true' : 'false'}
                        <button onClick={() => { deleteTaskHandler(task.id,loadTasks); }}>delete</button>
                        <button onClick={() => { doneTaskHandler(task.id, task.description, task.done, loadTasks); }}>Done</button>
                    </div>
                )
            })}
            <br />
            completed tasks: <br />
            {tasks.filter((value: { done: boolean }) => value.done === true).map((task: { id: number, done: boolean, description: string }, index: number) => {
                return (
                    <div key={index}>
                        {task.description},{task.done ? 'true' : 'false'}
                        <button onClick={() => { deleteTaskHandler(task.id,loadTasks); }}>delete</button>
                        <button onClick={() => { doneTaskHandler(task.id, task.description, task.done, loadTasks); }}>Done</button>
                    </div>
                )
            })}
            <button onClick={() => { clearDoneHandler(loadTasks) }}>Clear Done</button>
            Items Left: {taskCounter}
        </div>
    )
}

export default App;