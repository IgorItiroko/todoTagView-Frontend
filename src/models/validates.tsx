import { TaskProps } from '../App'

export const validateAllDone = (tasks: TaskProps[]) => {
    let done: boolean = true;
    tasks.forEach((element: {done: boolean}) => {
        if(element.done === false)
            done = false;
    })
    return done;
}