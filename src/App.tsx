import { Divider, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  allDone,
  allUndone,
  clearDone,
  deleteTask,
  getTasks,
  postTask,
  toggleDone,
  updateTaskDescription,
} from "./api/apiCalls";
import Footer from "./components/footer";
import InputTask from "./components/inputTask";
import ChooseTab from "./components/chooseTab";
import {
  FuncCheckAllDoneType,
  FuncClearDoneType,
  FuncDeleteType,
  TaskProps,
  FuncToggleStateType,
  FuncAddTaskType,
  FuncUpdateTasksDescription,
} from "./types/interfaces";
import { mainColor } from "./styles/colors";
import { validateAllTasks } from "./utils/reusableFunctions";
import { apiFailed } from "./styles/sweetAlerts";

function App() {
  const [tasks, setTasks] = useState<Array<TaskProps>>([]);

  /*------------- inputTasks func --------------*/
  const setNewTask = (newTask: TaskProps) => tasks.concat(newTask);
  const setCheckAllTasks = (isAllDone: boolean) =>
    tasks.map((task: TaskProps) => ({ ...task, done: !isAllDone }));

  const addTask: FuncAddTaskType = (newTaskDescription: string) => {
    postTask(newTaskDescription)
      .then((response: TaskProps) => setTasks(setNewTask(response)))
      .catch(() => {
        apiFailed.fire();
      });
  };

  const checkAllDoneTasks: FuncCheckAllDoneType = async () => {
    try {
      const isAllDone = validateAllTasks(tasks);
      const itWorked = isAllDone ? allUndone() : allDone();
      if (await itWorked) setTasks(setCheckAllTasks(isAllDone));
    } catch (e) {
      apiFailed.fire();
    }
  };
  /*------------- chooseTab func --------------*/

  const setToggleTask = (taskId: number, isDone: boolean) =>
    tasks.map((task: TaskProps) =>
      task.id === taskId ? { ...task, done: !isDone } : task
    );

  const setClearDone = () =>
    tasks.filter((task: { done: boolean }) => !task.done);

  const setDeletedTask = (taskId: number) =>
    tasks.filter((task: { id: number }) => task.id !== taskId);

  const setUpdatedTask = (taskId: number, newDescription: string) =>
    tasks.map((task: TaskProps) =>
      task.id === taskId ? { ...task, description: newDescription } : task
    );

  const toggleTaskState: FuncToggleStateType = async (
    taskId: number,
    isDone: boolean
  ) => {
    try {
      const itWorked = toggleDone(taskId, isDone);
      if (await itWorked) setTasks(setToggleTask(taskId, isDone));
    } catch (e) {
      apiFailed.fire();
    }
  };

  const clearDoneHandler: FuncClearDoneType = async () => {
    try {
      const itWorked = clearDone();
      if (await itWorked) setTasks(setClearDone());
    } catch (e) {
      apiFailed.fire();
    }
  };

  const deleteTaskHandler: FuncDeleteType = async (taskId: number) => {
    try {
      const itWorked = deleteTask(taskId);
      if (await itWorked) setTasks(setDeletedTask(taskId));
    } catch (e) {
      apiFailed.fire();
    }
  };

  const updateTasksDescription: FuncUpdateTasksDescription = async (
    taskId: number,
    newDescription: string
  ) => {
    try {
      const itWorked = updateTaskDescription(taskId, newDescription);
      if (await itWorked) setTasks(setUpdatedTask(taskId, newDescription));
    } catch (e) {
      apiFailed.fire();
    }
  };

  useEffect(() => {
    getTasks().then((res: TaskProps[]) => setTasks(() => res));
  }, []);

  return (
    // Responsive breakpoints : defined by screen width [0-30 em, 30em-48em, 48em+]
    <Flex alignItems="center" direction="column" mt="5em">
      <Flex
        direction="column"
        alignItems="center"
        background={mainColor}
        p="12"
        rounded="md"
        boxShadow="2xl"
        width={[300, 430, 860]}
      >
        <Text
          fontSize={["2xl", "3xl", "6xl"]}
          bgGradient="linear(to-l, #0E7384, #2F4858)"
          bgClip="text"
          fontWeight="extrabold"
        >
          Todo List
        </Text>
        <InputTask
          isTaskListEmpty={tasks.length === 0 ? true : false}
          onButtonCheckAll={checkAllDoneTasks}
          onNewTask={addTask}
        />
        <Divider hidden={tasks.length === 0 ? true : false} mt="1em" mb="1em" />
        <ChooseTab
          clearDoneHandler={clearDoneHandler}
          deleteTaskHandler={deleteTaskHandler}
          onToggleDone={toggleTaskState}
          onTaskUpdate={updateTasksDescription}
          tasks={tasks}
        />
      </Flex>
      <Footer />
    </Flex>
  );
}
export default App;
