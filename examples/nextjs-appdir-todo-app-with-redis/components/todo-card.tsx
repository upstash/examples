"use client";
import { FC } from "react";
import DeleteTodo from "./delete-todo";
import { EditTodo } from "./edit-todo-form";
import { CardContent } from "./ui/card";

interface TodoCardProps {
  value: {
    todo: string;
    status: boolean;
  };
  id: string;
}

const TodoCard: FC<TodoCardProps> = ({ id, value }) => {
  return (
    <>
      <CardContent
        key={id}
        className="flex items-center justify-start max-w-xl text-center"
      >
        <p className="flex items-center justify-between w-full p-3 border rounded-lg">
          <div className="w-2/3">
            <h1>{value.todo}</h1>
          </div>

          <div className="flex w-fill w-[80px] justify-between items-center">
            <EditTodo id={id} value={value} />
            <DeleteTodo id={id} />
          </div>
        </p>
      </CardContent>
    </>
  );
};

export default TodoCard;
