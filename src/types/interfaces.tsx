export type LoadTaskType = () => void;
export type SetStringType = (data: string) => void;
export type SetBooleanType = (data: boolean) => void;
export type ValidationType = (task: TaskProps[]) => boolean;
export type GetTasks = () => Promise<
  [{ id: number; description: string; done: boolean }]
>;
export type SetTaskArrayType = (data: TaskProps[]) => void;

export interface TaskProps {
  id: number;
  description: string;
  done: boolean;
}

export interface CardProps {
  tasks: TaskProps[];
  task: TaskProps;
  index: number;
  setTasks: SetTaskArrayType;
}

export interface TabProps {
  tasks: TaskProps[];
  setTasks: SetTaskArrayType;
}

export interface InputTaskProps {
  tasks: TaskProps[];
  setTasks: SetTaskArrayType;
}
