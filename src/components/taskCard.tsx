import { CheckCircleIcon, DeleteIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Input, Spacer, Text, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { deleteTaskHandler, doneTaskHandler, onKeySubmitHandler, submitEditHandler } from "../handlers/handlers";
import { CardProps } from "../models/interfaces";
import { confirmDelete } from "../styles/swalAlerts";

const TaskCard = ({ task, index, loadTasks }: CardProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(false);
  const [newEdited, setNewEdited] = useState<string>('')
  const [isLargerThan400] = useMediaQuery('(min-width: 400px)')
  useEffect(()=>{
    setNewEdited(task.description);
  },[task.description])

  return (
    <Flex
      direction="row"
      onMouseOver={()=> setIsHovering(true)}
      onMouseOut={()=> setIsHovering(false)}
      alignItems="center"
      key={index}
      rounded={6}
      background="gray.100"
      p="4"
      height={isLargerThan400? "50px": "40px"}
      mb={isLargerThan400? "15px": "1em"}
      width={isLargerThan400? "100%": "240px"}
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
      {editable? <Input 
        fontSize={isLargerThan400? "lg": "md"}
        value={newEdited}
        width="80%"
        onBlur={() => {submitEditHandler(task.id, newEdited, task.done, loadTasks, editable, setEditable)}}
        onChange={(event)=> {setNewEdited(event.target.value)}}
        onKeyDown={(event)=> {onKeySubmitHandler(event, task.id, newEdited, task.done, loadTasks, editable, setEditable)}
      }
        autoFocus
      /> : <Text
        fontSize={isLargerThan400? "xl": "md"}
        as={task.done ? "s" : "abbr"}
        color={task.done ? "gray" : "black"}
        pl="1em"
        onDoubleClick={()=> setEditable(!editable)}
      >
        {task.description}
      </Text>}
      <Spacer />
      {isHovering && (
        <IconButton
          aria-label="delete"
          size="sm"
          onClick={() => {
            if(!task.done){confirmDelete.fire().then((result) => {
              if(result.isConfirmed) {
                deleteTaskHandler(task.id, loadTasks);
              }
            })}else {
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
