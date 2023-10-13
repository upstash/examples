"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Label } from "./ui/label";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Switch } from "./ui/switch";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  todo: z.string().min(2).max(500),
  status: z.boolean(),
});

interface EditTodoFormProps {
  id: string;
  value: {
    todo: string;
    status: boolean;
  };
}

export const EditTodo: React.FC<EditTodoFormProps> = ({ id, value }) => {
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: value.todo,
      status: value.status,
    },
  });

  type FormData = z.infer<typeof formSchema>;

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      setLoading(true);
      await axios.patch(`/api/todo/${id}`, values);
      toast({
        title: "Todo Updated",
        description: "Todo Successfully Updated",
        variant: "default",
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to submit data",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const handleIsStatusChange = (checked: boolean) => {
    form.setValue("status", checked);
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <PencilIcon className="w-5 h-5 hover:cursor-pointer hover:text-indigo-300" />
        </SheetTrigger>
        <SheetContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full grid-cols-12 gap-2 px-2 py-4 mt-5 border rounded-lg md:px-4 focus-within:shadow-sm"
            >
              <Label htmlFor="todo" className="mt-3 text-left w-fit">
                Task
              </Label>
              <FormField
                control={form.control}
                name="todo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="What needs to be done?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Label htmlFor="status" className="mt-3 text-left w-fit">
                Status
              </Label>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        // @ts-ignore
                        onCheckedChange={handleIsStatusChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>{field.value ? "Done" : "Not Done"}</FormLabel>
                      <FormDescription>
                        {field.value ? "Task Completed" : "Task ongoing"}
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-5 w-fit" disabled={isLoading}>
                Update
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
};
