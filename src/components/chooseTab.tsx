import {
  Button,
  Flex,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { clearDoneHandler } from "../eventListeners/handlers";
import { TabProps, TaskProps } from "../types/interfaces";
import { fontColor } from "../styles/colors";
import TaskCard from "./taskCard";
import { isTaskListEmpty, leftTasks } from "../utils/reusableFunctions";

const ChooseTab = ({ tasks, setTasks }: TabProps) => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  return (
    <Tabs
      variant="soft-rounded"
      colorScheme="gray"
      hidden={isTaskListEmpty(tasks)}
    >
      <Flex justifyContent="flex-start" width="680px" hidden={!isLargerThan800}>
        <TabList>
          <Tab>All</Tab>
          <Tab>Active</Tab>
          <Tab>Completed</Tab>
        </TabList>
        <Spacer />
        <Button
          onClick={() => {
            clearDoneHandler(tasks, setTasks);
          }}
          color={fontColor}
          variant="link"
          height="2em"
          pt="2"
        >
          Clear Completed
        </Button>
        <Spacer />
        <Text
          as="u"
          height="2em"
          pt="2"
          size="md"
          fontWeight="bold "
          color={fontColor}
        >
          Items Left: {leftTasks(tasks)}
        </Text>
      </Flex>
      <TabPanels>
        <TabPanel>
          {tasks.map(
            (
              task: { id: number; done: boolean; description: string },
              index: number
            ) => {
              return (
                <TaskCard
                  key={index}
                  tasks={tasks}
                  task={task}
                  index={index}
                  setTasks={setTasks}
                />
              );
            }
          )}
        </TabPanel>

        <TabPanel>
          {tasks
            .filter((value: { done: boolean }) => !value.done)
            .map((task: TaskProps, index: number) => {
              return (
                <TaskCard
                  key={index}
                  tasks={tasks}
                  task={task}
                  index={index}
                  setTasks={setTasks}
                />
              );
            })}
        </TabPanel>

        <TabPanel>
          {tasks
            .filter((value: { done: boolean }) => value.done)
            .map(
              (
                task: { id: number; done: boolean; description: string },
                index: number
              ) => {
                return (
                  <TaskCard
                    key={index}
                    tasks={tasks}
                    task={task}
                    index={index}
                    setTasks={setTasks}
                  />
                );
              }
            )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ChooseTab;
