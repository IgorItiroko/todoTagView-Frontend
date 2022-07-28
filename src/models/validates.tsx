import { TaskProps } from "./interfaces";

export const validateAllDone = (tasks: TaskProps[]) => {
    let done: boolean = true;
    tasks.forEach((element: {done: boolean}) => {
        if(element.done === false)
            done = false;
    })
    return done;
}