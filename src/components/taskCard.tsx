import { Flex, Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import { deleteTaskHandler, doneTaskHandler } from "../handlers/handlers";

interface CardProps {
    task: { id: number, done: boolean, description: string },
    index: number,
    loadTasks: Function
}

const TaskCard = ({task, index, loadTasks}: CardProps) => {
    const [checked, setChecked] = useState<boolean>(false);
    return (
        <Flex direction="row" key={index} rounded={6} background="gray.100" p="4" position="absolute" w="680px">
            <Checkbox size="lg" colorScheme="green"/>
        </Flex>
    )
}

export default TaskCard