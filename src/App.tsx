import { Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react'
import { getTasks } from './api/apiCalls';
import ChooseTab from './components/tab';
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
            <ChooseTab tasks={tasks} loadTasks={loadTasks}/>
            <Input size="lg" w="40em" placeholder="Set a new Task!" type="text" value={newTask} name="newTask" onChange={(event) => { (setNewTask(event.target.value)) }} onKeyDown={(event) => { handleKeyDown(event, newTask, loadTasks, setNewTask) }} />
            <button onClick={() => { handleIfOnClick(validateAllDone, tasks, loadTasks) }}>V</button>
            <button onClick={() => { clearDoneHandler(loadTasks) }}>Clear Done</button>
            Items Left: {taskCounter}
        </div>
    )
}

export default App;