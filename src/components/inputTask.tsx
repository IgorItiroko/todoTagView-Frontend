import { CheckIcon } from "@chakra-ui/icons";
import { IconButton, Input, InputGroup, InputLeftElement, useMediaQuery } from "@chakra-ui/react";
import { onKeyDownHandler } from "../eventListeners/handlers";
import { validateAllTasks } from "../models/validates";
import { checkAllHandler } from '../eventListeners/handlers' 
import { mainColor } from "../styles/colors";
import { InputTaskProps } from "../models/interfaces";

const InputTask = ({
    newTask,
    setNewTask,
    tasks,
    loadTasks,
    isHidden
}: InputTaskProps) => {
    const [isLargerThan400] = useMediaQuery('(min-width: 400px)')
    return(
        <InputGroup>
            <InputLeftElement
            children={
                <IconButton
                aria-label="CheckAll"
                display={!isLargerThan400? 'none': 'flex'}
                hidden={isHidden}
                variant="link"
                size="lg"
                color={mainColor}
                fontSize="30px"
                icon={<CheckIcon />}
                mt="2"
                ml="3"
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
            size={isLargerThan400? "lg": "md"}
            width={[200, 400, 800]}
            placeholder="What needs to be done?"
            fontSize={isLargerThan400? "lg": "sm"}
            type="text"
            pl={isLargerThan400? "3em": '1em'}
            value={newTask}
            name="newTask"
            onChange={(event) => {
                setNewTask(event.target.value);
            }}
            onKeyDown={(event) => {
                onKeyDownHandler(event, newTask, loadTasks, setNewTask);
            }}
            />
        </InputGroup>
    )
}

export default InputTask