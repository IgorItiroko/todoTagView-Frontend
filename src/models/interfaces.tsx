export interface TaskProps {
    id: number,
    description: string,
    done: boolean
}

export interface CardProps {
  task: { id: number; done: boolean; description: string };
  index: number;
  loadTasks: Function;
}

export interface TabProps {
    tasks: TaskProps[];
    loadTasks: Function;
    leftTaskCounter: number;
    hiddenUI: boolean;
  }

export interface InputTaskProps {
    newTask: string,
    setNewTask: Function,
    tasks: TaskProps[],
    loadTasks: Function,
    hiddenUI: boolean,
}
