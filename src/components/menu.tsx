import {
  Button,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import ChooseTab from "./tab";
import { TaskProps } from "../models/validates";
import { clearDoneHandler } from "../handlers/handlers";

interface MenuProps {
  hiddenUI: boolean;
  tasks: TaskProps[];
  loadTasks: Function;
  leftTaskCounter: number;
}

const Menu = ({ hiddenUI, tasks, loadTasks, leftTaskCounter }: MenuProps) => {
  return (
    <Flex direction="row" hidden={hiddenUI} justifyContent="center " w="100%">
      <ChooseTab tasks={tasks} loadTasks={loadTasks} />
      <Spacer height="2em"/>
      <Button
        onClick={() => {
          clearDoneHandler(loadTasks);
        }}
        colorScheme="orange.100"
        variant="link"
        height="2em"
        pt="2"
      >
        Clear Done
      </Button>
      <Spacer height="2em"/>
      <Text as="u" height="2em" pt="2">
        Items Left: {leftTaskCounter}
      </Text>
    </Flex>
  );
};

export default Menu;
