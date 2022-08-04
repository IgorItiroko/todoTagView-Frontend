import { Divider, Flex, Text } from "@chakra-ui/react";
import Footer from "./components/footer";
import InputTask from "./components/inputTask";
import TabbedTaskList from "./components/tabbedTaskList";
import { mainColor } from "./styles/colors";
import { useTaskStateChangers } from "./Hooks/useTaskStateChanger";

function App() {
  const {
    tasks,
    addTask,
    checkAllDoneTasks,
    toggleTaskState,
    clearDoneHandler,
    deleteTaskHandler,
    updateTasksDescription,
  } = useTaskStateChangers();

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
          isTaskListEmpty={tasks.length === 0}
          onButtonCheckAll={checkAllDoneTasks}
          onNewTask={addTask}
        />
        <Divider hidden={tasks.length === 0} mt="1em" mb="1em" />
        <TabbedTaskList
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
