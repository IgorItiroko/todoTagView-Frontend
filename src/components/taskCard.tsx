import { CheckCircleIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Input,
  Spacer,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  deleteTaskHandler,
  doneTaskHandler,
  submitTaskOnKeyDownHandler,
  submitEditHandler,
} from "../eventListeners/handlers";
import { CardProps } from "../types/interfaces";
import { mainColor } from "../styles/colors";
import { confirmDelete } from "../styles/sweetAlerts";

const TaskCard = ({ task, index, loadTasks }: CardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const [isLargerThan400] = useMediaQuery("(min-width: 400px)");

  useEffect(() => {
    setNewTaskDescription(task.description);
  }, [task.description]);

  return (
    <Flex
      direction="row"
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      alignItems="center"
      key={index}
      rounded={6}
      background="gray.200"
      p="4"
      mb={isLargerThan400 ? "15px" : "1em"}
      width={isLargerThan400 ? "100%" : "240px"}
    >
      <IconButton
        onClick={() => {
          doneTaskHandler(task.id, task.description, task.done, loadTasks);
        }}
        aria-label="checkbox"
        size="sm"
        isRound
        icon={task.done ? <CheckCircleIcon w={6} h={6} /> : <></>}
        colorScheme="whatsapp"
      />
      {isEditable ? (
        <Input
          fontSize={isLargerThan400 ? "xl" : "md"}
          value={newTaskDescription}
          focusBorderColor={mainColor}
          color="gray.700"
          width="80%"
          onBlur={() => {
            submitEditHandler(
              task.id,
              newTaskDescription,
              task.done,
              loadTasks,
              isEditable,
              setIsEditable
            );
          }}
          onChange={(event) => {
            setNewTaskDescription(event.target.value);
          }}
          onKeyDown={(event) => {
            submitTaskOnKeyDownHandler(
              event,
              task.id,
              newTaskDescription,
              task.done,
              loadTasks,
              isEditable,
              setIsEditable
            );
          }}
          autoFocus
        />
      ) : (
        <Text
          fontSize={isLargerThan400 ? "xl" : "md"}
          as={task.done ? "s" : "abbr"}
          color={task.done ? "gray" : "black"}
          pl="1em"
          onDoubleClick={() => setIsEditable(!isEditable)}
        >
          {task.description}
        </Text>
      )}
      <Spacer />
      {isHovering && (
        <IconButton
          aria-label="delete"
          size="sm"
          onClick={() => {
            if (!task.done) {
              confirmDelete.fire().then((result) => {
                if (result.isConfirmed) {
                  deleteTaskHandler(task.id, loadTasks);
                }
              });
            } else {
              deleteTaskHandler(task.id, loadTasks);
            }
          }}
          icon={<DeleteIcon />}
          colorScheme="red"
          isRound
        />
      )}
    </Flex>
  );
};

export default TaskCard;
