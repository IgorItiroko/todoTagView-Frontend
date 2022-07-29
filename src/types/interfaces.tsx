export type LoadTaskType = () => void;
export type SetStringType = (data: string) => void;
export type SetBooleanType = (data: boolean) => void;
export type ValidationType = (task: TaskProps[]) => boolean;
export type GetTasks = () => Promise<[{id: number, description: string, done: boolean}]>

export interface TaskProps {
    id: number,
    description: string,
    done: boolean
}

export interface CardProps {
  task: { id: number; done: boolean; description: string };
  index: number;
  loadTasks: LoadTaskType;
}

export interface TabProps {
    tasks: TaskProps[];
    loadTasks: LoadTaskType;
    leftTaskCounter: number;
    isHidden: boolean;
  }

export interface InputTaskProps {
    newTask: string,
    setNewTask: SetStringType,
    tasks: TaskProps[],
    loadTasks: LoadTaskType,
    isHidden: boolean,
}
