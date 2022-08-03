/* Promise Return Type */
export type GetTasks = () => Promise<TaskProps[]>;
export type AddTaskType = (taskDescription: string) => Promise<TaskProps>;
export type DeleteTaskType = (taskId: number) => Promise<boolean>;
export type ToggleDoneType = (
  taskId: number,
  isDone: boolean
) => Promise<boolean>;
export type UpdateTaskDescriptionType = (
  taskId: number,
  newDescription: string
) => Promise<boolean>;

export type SetStringType = (data: string) => void;
export type SetBooleanType = (done: boolean) => void;
export type ValidationType = (task: TaskProps[]) => boolean;
export type SetTaskArrayType = (data: TaskProps[]) => void;
export type FuncAddTaskType = (taskDescription: string) => void;
export type FuncCheckAllDoneType = () => void;
export type FuncToggleStateType = (taskId: number, isDone: boolean) => void;
export type FuncClearDoneType = () => void;
export type FuncDeleteType = (taskId: number) => void;
export type FuncUpdateTasksDescription = (
  taskId: number,
  newDescription: string
) => void;

export interface TaskProps {
  id: number;
  description: string;
  done: boolean;
}

export interface CardProps {
  task: TaskProps;
  index: number;
  deleteTaskHandler: FuncDeleteType;
  onToggleDone: FuncToggleStateType;
  onTaskUpdate: FuncUpdateTasksDescription;
}

export interface TabProps {
  clearDoneHandler: FuncClearDoneType;
  deleteTaskHandler: FuncDeleteType;
  onToggleDone: FuncToggleStateType;
  onTaskUpdate: FuncUpdateTasksDescription;
  tasks: TaskProps[];
}

export interface InputTaskProps {
  isTaskListEmpty: boolean;
  onButtonCheckAll: FuncCheckAllDoneType;
  onNewTask: FuncAddTaskType;
}
