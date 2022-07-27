
export const validateAllDone = (tasks: never[]) => {
    let done: boolean = true;
    tasks.forEach((element: {done: boolean}) => {
        if(element.done == false)
            done = false;
    })
    return done;
}