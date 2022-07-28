import { CheckIcon } from "@chakra-ui/icons";
import { IconButton, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { handleKeyDown } from "../handlers/handlers";
import { TaskProps, validateAllDone } from "../models/validates";

interface InputTaskProps {
    handleIfOnClick: Function,
    newTask: string,
    setNewTask: Function,
    tasks: TaskProps[],
    loadTasks: Function
}

const InputTask = ({
    handleIfOnClick,
    newTask,
    setNewTask,
    tasks,
    loadTasks
}: InputTaskProps) => {
    return(
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
    )
}

export default InputTask