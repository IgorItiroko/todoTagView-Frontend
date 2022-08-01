import { CheckIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useMediaQuery,
} from "@chakra-ui/react";
import { newTaskOnEnterDown } from "../eventListeners/handlers";
import { validateAllTasks } from "../utils/validation";
import { checkAllHandler } from "../eventListeners/handlers";
import { mainColor } from "../styles/colors";
import { InputTaskProps } from "../types/interfaces";

const InputTask = ({
  newTask,
  setNewTask,
  tasks,
  loadTasks,
  isHidden,
}: InputTaskProps) => {
  const [isLargerThan400] = useMediaQuery("(min-width: 400px)");
  return (
    <InputGroup>
      <InputLeftElement
        children={
          <IconButton
            aria-label="CheckAll"
            variant="link"
            size="lg"
            color={mainColor}
            fontSize="30px"
            mt="2"
            ml="3"
            display={!isLargerThan400 ? "none" : "flex"}
            hidden={isHidden}
            icon={<CheckIcon />}
            onClick={() => {
              checkAllHandler(validateAllTasks, tasks, loadTasks);
            }}
          />
        }
      />
      <Input
        background="gray.200"
        focusBorderColor={mainColor}
        color="gray.700"
        size={isLargerThan400 ? "lg" : "md"}
        width={[200, 400, 800]}
        placeholder="What needs to be done?"
        fontSize={isLargerThan400 ? "lg" : "sm"}
        type="text"
        pl={isLargerThan400 ? "3em" : "1em"}
        name="newTask"
        value={newTask}
        onChange={(event) => {
          setNewTask(event.target.value);
        }}
        onKeyDown={(event) => {
          newTaskOnEnterDown(event, newTask, loadTasks, setNewTask);
        }}
      />
    </InputGroup>
  );
};

export default InputTask;
