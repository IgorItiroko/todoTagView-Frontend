import { Divider, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTasks } from "./api/apiCalls";
import Footer from "./components/footer";
import InputTask from "./components/inputTask";
import ChooseTab from "./components/chooseTab";
import { TaskProps } from "./types/interfaces";
import { mainColor } from "./styles/colors";
import { isTaskListEmpty } from "./utils/reusableFunctions";

function App() {
  const [tasks, setTasks] = useState<Array<TaskProps>>([]);

  useEffect(() => {
    const data = getTasks();
    data.then((result: TaskProps[]) => {
      setTasks(result);
    });
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
        <InputTask tasks={tasks} setTasks={setTasks} />
        <Divider hidden={isTaskListEmpty(tasks)} mt="1em" mb="1em" />
        <ChooseTab tasks={tasks} setTasks={setTasks} />
      </Flex>
      <Footer />
    </Flex>
  );
}
export default App;
