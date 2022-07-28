import {
    Divider,
    Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTasks } from "./api/apiCalls";
import InputTask from "./components/inputTask";
import Menu from "./components/menu";
import { TaskProps } from "./models/validates";

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
      if (result.length === 0 && hiddenUI === false){
        setHiddenUI(true);
        console.log('setted true')
      } else if(hiddenUI === true){
        setHiddenUI(false);
        console.log('setted false')
      }
    });
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background="yellow.100" p={12} rounded={6}>
        <InputTask newTask={newTask} setNewTask={setNewTask} tasks={tasks} loadTasks={loadTasks}/>
        <Divider hidden = {hiddenUI} mt="1em" mb="1em"/>
        <Menu hiddenUI={hiddenUI} tasks={tasks} loadTasks={loadTasks} leftTaskCounter={leftTaskCounter}/>
      {/* <button
        onClick={() => {
          clearDoneHandler(loadTasks);
        }}
      >
        Clear Done
      </button> */}
      </Flex>
    </Flex>
  );
}

export default App;
