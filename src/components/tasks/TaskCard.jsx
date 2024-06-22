import React from "react";
import { useTasks } from "../../context/tasksContext";
import { Button, ButtonLink, Card } from "../ui";

export function TaskCard({ task }) {
  const { deleteTask, getTasks } = useTasks();

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      getTasks();
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Card>
        <header className="flex justify-between">
          <h1 className="text-2xl font-bold">{task.title}</h1>
          <div className="flex gap-x-2 items-center">
            <Button onClick={handleDelete}>Delete</Button>
            <ButtonLink to={`/tasks/${task._id}`}>Edit</ButtonLink>
          </div>
        </header>
        <p className="text-slate-300">{task.description}</p>
        {/* format date */}
        <p>
          {task.date &&
            new Date(task.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
        </p>
      </Card>
    </div>
  );
}
