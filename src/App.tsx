import {
    Divider,
    Flex,
    Text,
    Spacer,
    Kbd,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTasks } from "./api/apiCalls";
import InputTask from "./components/inputTask";
import ChooseTab from "./components/tab";
import { TaskProps } from "./models/interfaces";
import { mainColor } from "./styles/colors";


function App() {
  const [tasks, setTasks] = useState<Array<TaskProps>>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [leftTaskCounter, setleftTaskCounter] = useState<number>(0);
  const [hiddenUI, setHiddenUI] = useState<boolean>(true);

  const loadTasks = () => {
    const data = getTasks();
    data.then((result: TaskProps[]) => {
      setTasks(result);
      setleftTaskCounter(
        result.filter((value: { done: boolean }) => value.done === false).length
      );
      if (result.length === 0) setHiddenUI(true);
      else setHiddenUI(false);
    });
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Flex alignItems="center" justifyContent="center" direction="column" mt="5em">
        <Spacer />
        <Flex direction="column" alignItems="center" background={mainColor} p="12" rounded="md" boxShadow="2xl" width={[300, 430, 860]}>
          <Text fontSize={["2xl","3xl","6xl"]} bgGradient='linear(to-l, #0E7384, #2F4858)'
  bgClip='text' fontWeight='extrabold'>Todo List</Text>
          <InputTask newTask={newTask} setNewTask={setNewTask} tasks={tasks} loadTasks={loadTasks} hiddenUI={hiddenUI}/>
          <Divider hidden = {hiddenUI} mt="1em" mb="1em"/>
          <ChooseTab tasks={tasks} loadTasks={loadTasks} leftTaskCounter={leftTaskCounter}  hiddenUI={hiddenUI}/>
      </Flex>
      <Flex direction="column" m="2em" alignItems="center" color="gray.500"> 
        <span>Press <Kbd>Enter</Kbd> to register a todo</span>
        <span>Double <Kbd>Click</Kbd> to edit a todo</span>
        <span>Created By <a href="https://www.linkedin.com/in/igor-shinji-itiroko-a95100222/">I.Itiroko</a></span>
      </Flex>
    </Flex>
  );
}
export default App;
