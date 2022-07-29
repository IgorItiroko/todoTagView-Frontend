import {Button, Flex, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import {clearDoneHandler} from "../eventListeners/handlers";
import { TabProps } from "../models/interfaces";
import { fontColor } from "../styles/colors";
import TaskCard from "./taskCard";


const ChooseTab = ({ tasks, loadTasks, leftTaskCounter, isHidden }: TabProps) => {
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
  return (
    <div hidden={isHidden}>
      <Tabs variant="soft-rounded" colorScheme="gray" >
        <Flex hidden = {!isLargerThan800} justifyContent="flex-start" width="680px">
          <TabList>
            <Tab>All</Tab>
            <Tab>Active</Tab>
            <Tab>Completed</Tab>
          </TabList>
          <Spacer/>
          <Button
            onClick={() => {
              clearDoneHandler(loadTasks);
            }}
            color={fontColor}
            variant="link"
            height="2em"
            pt="2"
          >
            Clear Completed
          </Button>
          <Spacer />
          <Text as="u" height="2em" pt="2" size="md" fontWeight="bold " color={fontColor}>
            Items Left: {leftTaskCounter}
          </Text>
        </Flex>
        <TabPanels>
          <TabPanel> 
            {tasks.map((
                task: { id: number; done: boolean; description: string },
                index: number) => {
                return (
                  <TaskCard
                    key={index}
                    task={task}
                    index={index}
                    loadTasks={loadTasks}
                  />
                );
              })
            }
          </TabPanel>

          <TabPanel>
            {tasks
              .filter((value: { done: boolean }) => value.done === false)
              .map((
                  task: { id: number; done: boolean; description: string },
                  index: number) => {
                  return (
                    <TaskCard
                    key={index}
                    task={task}
                    index={index}
                    loadTasks={loadTasks}
                  />
                  );
                })
            }
          </TabPanel>
          
          <TabPanel>
            {tasks
              .filter((value: { done: boolean }) => value.done === true)
              .map((
                  task: { id: number; done: boolean; description: string },
                  index: number) => {
                  return (
                    <TaskCard
                    key={index}
                    task={task}
                    index={index}
                    loadTasks={loadTasks}
                  />
                  );
               })
            }
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ChooseTab;
