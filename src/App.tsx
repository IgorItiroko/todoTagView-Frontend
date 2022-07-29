import { Divider, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTasks } from "./api/apiCalls";
import Footer from "./components/footer";
import InputTask from "./components/inputTask";
import ChooseTab from "./components/tab";
import { TaskProps } from "./models/interfaces";
import { mainColor } from "./styles/colors";

function App() {
  const [tasks, setTasks] = useState<Array<TaskProps>>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [leftTaskCounter, setLeftTaskCounter] = useState<number>(0);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const loadTasks = () => {
    const data = getTasks();
    data.then((result: TaskProps[]) => {
      setTasks(result);
      setLeftTaskCounter(
        result.filter((value: { done: boolean }) => value.done === false).length
      );
      if (result.length === 0) setIsHidden(true);
      else setIsHidden(false);
    });
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    // Responsive breakpoints : defined by screen width [0-30 em, 30em-48em, 48em+] 
    <Flex alignItems="center" direction="column" mt="5em">
        <Flex direction="column" alignItems="center" background={mainColor} p="12" rounded="md" boxShadow="2xl" width={[300, 430, 860]}>
          <Text fontSize={["2xl","3xl","6xl"]} bgGradient="linear(to-l, #0E7384, #2F4858)" bgClip='text' fontWeight='extrabold'>Todo List</Text>
          <InputTask newTask={newTask} setNewTask={setNewTask} tasks={tasks} loadTasks={loadTasks} isHidden={isHidden}/>
          <Divider hidden = {isHidden} mt="1em" mb="1em"/>
          <ChooseTab tasks={tasks} loadTasks={loadTasks} leftTaskCounter={leftTaskCounter}  isHidden={isHidden}/>
      </Flex>
      <Footer />
    </Flex>
  );
}
export default App;
