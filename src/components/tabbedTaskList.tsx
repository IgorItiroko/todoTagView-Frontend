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
import { TabProps, TaskProps } from "../types/interfaces";
import { fontColor } from "../styles/colors";
import TaskCard from "./taskCard";
import { pendingTasksCount } from "../utils/reusableFunctions";

const TabbedTaskList = ({
  clearDoneHandler,
  deleteTaskHandler,
  onToggleDone,
  onTaskUpdate,
  tasks,
}: TabProps) => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  return (
    <Tabs
      variant="soft-rounded"
      colorScheme="gray"
      hidden={tasks.length === 0 ? true : false}
    >
      <Flex
        justifyContent="flex-start"
        alignItems="center"
        width="680px"
        hidden={!isLargerThan800}
      >
        <TabList>
          <Tab>All</Tab>
          <Tab>Active</Tab>
          <Tab>Completed</Tab>
        </TabList>
        <Spacer />
        <Button
          onClick={() => {
            clearDoneHandler();
          }}
          color={fontColor}
          variant="link"
        >
          Clear Completed
        </Button>
        <Spacer />
        <Text as="u" size="md" fontWeight="bold " color={fontColor}>
          Items Left: {pendingTasksCount(tasks)}
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
                  task={task}
                  index={index}
                  deleteTaskHandler={deleteTaskHandler}
                  onToggleDone={onToggleDone}
                  onTaskUpdate={onTaskUpdate}
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
                  task={task}
                  index={index}
                  deleteTaskHandler={deleteTaskHandler}
                  onToggleDone={onToggleDone}
                  onTaskUpdate={onTaskUpdate}
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
                    task={task}
                    index={index}
                    deleteTaskHandler={deleteTaskHandler}
                    onToggleDone={onToggleDone}
                    onTaskUpdate={onTaskUpdate}
                  />
                );
              }
            )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabbedTaskList;
