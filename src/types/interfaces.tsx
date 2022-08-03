export type SetStringType = (data: string) => void;
export type SetBooleanType = (done: boolean) => void;
export type ValidationType = (task: TaskProps[]) => boolean;
export type GetTasks = () => Promise<TaskProps[]>;
export type SetTaskArrayType = (data: TaskProps[]) => void;
export type PostTaskType = (taskDescription: string) => Promise<TaskProps>;
export type DeleteTaskType = (taskId: number) => Promise<boolean>;
export type ToggleDoneType = (
  taskId: number,
  isDone: boolean
) => Promise<boolean>;
export type UpdateTaskDescriptionType = (
  taskId: number,
  newDescription: string
) => Promise<boolean>;

export interface TaskProps {
  id: number;
  description: string;
  done: boolean;
}

export interface CardProps {
  task: TaskProps;
  index: number;
  deleteTaskHandler: Function;
  onToggleDone: Function;
  onTaskUpdate: Function;
}

export interface TabProps {
  clearDoneHandler: Function;
  deleteTaskHandler: Function;
  onToggleDone: Function;
  onTaskUpdate: Function;
  tasks: TaskProps[];
}

export interface InputTaskProps {
  isTaskListEmpty: boolean;
  onButtonCheckAll: Function;
  onNewTask: Function;
}
