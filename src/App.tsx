import { CheckIcon } from "@chakra-ui/icons";
import {
    Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTasks } from "./api/apiCalls";
import ChooseTab from "./components/tab";
import {
  clearDoneHandler,
  handleIfOnClick,
  handleKeyDown,
} from "./handlers/handlers";
import { TaskProps, validateAllDone } from "./models/validates";

function App() {
  const [tasks, setTasks] = useState<Array<TaskProps>>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [taskCounter, setTaskCounter] = useState<number>(0);

  const loadTasks = () => {
    const data = getTasks();
    data.then((result: TaskProps[]) => {
      setTasks(result);
      setTaskCounter(
        result.filter((value: { done: boolean }) => value.done === false).length
      );
    });
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background="yellow.100" p={12} rounded={6}>
        <InputGroup>
            <InputLeftElement
            children={
                <IconButton
                variant="link"
                border="none"
                size="lg"
                colorScheme="orange"
                aria-label="Call Segun"
                fontSize="30px"
                icon={<CheckIcon />}
                mt="2"
                ml="1.5"
                onClick={() => {
                    handleIfOnClick(validateAllDone, tasks, loadTasks);
                  }}
                />
            }
            />
            <Input
            focusBorderColor="orange.100"
            size="lg"
            w="40em"
            placeholder="Set a new Task!"
            type="text"
            pl="3em"
            value={newTask}
            name="newTask"
            onChange={(event) => {
                setNewTask(event.target.value);
            }}
            onKeyDown={(event) => {
                handleKeyDown(event, newTask, loadTasks, setNewTask);
            }}
            />
        </InputGroup>
      <button
        onClick={() => {
          clearDoneHandler(loadTasks);
        }}
      >
        Clear Done
      </button>
      <ChooseTab tasks={tasks} loadTasks={loadTasks} />
      Items Left: {taskCounter}
      </Flex>
    </Flex>
  );
}

export default App;
