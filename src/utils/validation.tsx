import { TaskProps } from "../types/interfaces";

export const validateAllTasks = (tasks: TaskProps[]) => {
    let done: boolean = true;
    tasks.forEach((element: {done: boolean}) => {
        if(element.done === false)
            done = false;
    })
    return done;
}
