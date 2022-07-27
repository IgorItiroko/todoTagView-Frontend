import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { deleteTaskHandler, doneTaskHandler } from "../handlers/handlers";
import { TaskProps } from "../models/validates";

interface TabProps {
    tasks: TaskProps[];
    loadTasks: Function;
}

const ChooseTab = ({tasks, loadTasks}: TabProps) => {
  return (
    <Tabs variant="soft-rounded" colorScheme="blue">
      <TabList>
        <Tab>All</Tab>
        <Tab>Active</Tab>
        <Tab>Completed</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
        {tasks.map((task: { id: number, done: boolean, description: string }, index: number) => {
                return (
                    <div key={index}>
                        {task.description},{task.done ? 'true' : 'false'}
                        <button onClick={() => { deleteTaskHandler(task.id, loadTasks ); }}>delete</button>
                        <button onClick={() => { doneTaskHandler(task.id, task.description, task.done, loadTasks); }}>Done</button>
                    </div>
                )
            })}
        </TabPanel>
        <TabPanel>
        {tasks.filter((value: { done: boolean }) => value.done === false).map((task: { id: number, done: boolean, description: string }, index: number) => {
                return (
                    <div key={index}>
                        {task.description},{task.done ? 'true' : 'false'}
                        <button onClick={() => { deleteTaskHandler(task.id,loadTasks); }}>delete</button>
                        <button onClick={() => { doneTaskHandler(task.id, task.description, task.done, loadTasks); }}>Done</button>
                    </div>
                )
            })}
        </TabPanel>
        <TabPanel>
        {tasks.filter((value: { done: boolean }) => value.done === true).map((task: { id: number, done: boolean, description: string }, index: number) => {
                return (
                    <div key={index}>
                        {task.description},{task.done ? 'true' : 'false'}
                        <button onClick={() => { deleteTaskHandler(task.id,loadTasks); }}>delete</button>
                        <button onClick={() => { doneTaskHandler(task.id, task.description, task.done, loadTasks); }}>Done</button>
                    </div>
                )
            })}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ChooseTab;
