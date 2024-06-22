import React, { useEffect } from "react";
import { useTasks } from "../context/tasksContext";
import { TaskCard } from "../components/tasks/TaskCard";
import { ImFileEmpty } from "react-icons/im";
import { Card } from "../components/ui";

export function TasksPage() {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);
  if (!tasks.task || !Array.isArray(tasks.task) || tasks.task.length == 0) {
    return (
      <div className="h-[calc(100vh-100px)] w-full flex justify-center items-center">
        <div className="flex justify-center items-center p-2">
          <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
          <h1 className="font-bold text-xl">
            No tasks yet, please add a new task
          </h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 w-full p-2">
        {tasks.task.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </>
  );
}
