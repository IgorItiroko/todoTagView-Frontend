import { CheckIcon } from "@chakra-ui/icons";
import { IconButton, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { handleKeyDown } from "../handlers/handlers";
import { validateAllDone } from "../models/validates";
import { handleIfOnClick } from '../handlers/handlers' 
import { mainColor } from "../styles/colors";
import { InputTaskProps } from "../models/interfaces";

const InputTask = ({
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
                color={mainColor}
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
            background="gray.200"
            focusBorderColor={mainColor}
            color="gray.700"
            size="lg"
            width={[200, 400, 800]}
            placeholder="What needs to be done?"
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