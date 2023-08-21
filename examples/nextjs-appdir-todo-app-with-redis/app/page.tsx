import { Heading } from "@/components/heading";
import { ModeToggle } from "@/components/theme-toggle";
import TodoCard from "@/components/todo-card";
import { AddTodo } from "@/components/todo-form";
import { Card, CardHeader } from "@/components/ui/card";
import redis, { databaseName } from "@/lib/redis";

interface TodoData {
  [key: string]: {
    todo: string;
    status: boolean;
  };
}

export default async function Home() {
  const data = (await redis.hgetall(databaseName)) as TodoData;
  if (!data) {
    return (
      <>
        <main className="flex flex-col items-center min-h-screen p-12 md:p-24 md:justify-center">
          <div className="flex flex-col items-center justify-between w-full md:flex-row">
            <Heading
              title="Todo Application"
              description="Simple Todo application CRUD functionality made with Upstash Redis and Next.js"
              source="https://github.com"
            />
            <ModeToggle />
          </div>

          <AddTodo />
          <div className="flex flex-col w-full mt-10 overflow-hidden lg:flex-row md:justify-evenly">
            <h1 className="text-center">
              Create your first Todo to get started
            </h1>
          </div>
        </main>
      </>
    );
  }
  const completedTodos = Object.entries(data).filter(
    ([key, value]) => value.status
  );
  const incompleteTodos = Object.entries(data).filter(
    ([key, value]) => !value.status
  );
  return (
    <main className="flex flex-col items-center min-h-screen p-12 md:p-24 md:justify-center">
      <div className="flex flex-col items-center justify-between w-full md:flex-row">
        <Heading
          title="Todo Application"
          description="Simple Todo application with CRUD functionality made with Upstash Redis and Next.js"
          source="https://github.com"
        />
        <ModeToggle />
      </div>
      <AddTodo />
      <div className="flex flex-col w-full mt-10 overflow-hidden lg:flex-row md:justify-evenly">
        <Card className="md:min-w-[350px]">
          <CardHeader className="text-center">Todo</CardHeader>
          {incompleteTodos.map(([id, value]) => (
            <TodoCard key={id} id={id} value={value} />
          ))}
        </Card>
        <Card className="md:min-w-[350px] mt-5 lg:mt-0">
          <CardHeader className="text-center">Done</CardHeader>
          {completedTodos.map(([id, value]) => (
            <TodoCard key={id} id={id} value={value} />
          ))}
        </Card>
      </div>
    </main>
  );
}
