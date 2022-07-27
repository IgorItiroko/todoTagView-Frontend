import { postTask } from "../api/apiCalls";

export const handleKeyDown = async (event: {key: string}, newTask: string, loadTasks: Function, setNewTask: Function) => {
    if(event.key === 'Enter'){
        await postTask(newTask);
        loadTasks();
        setNewTask('');
    }
}