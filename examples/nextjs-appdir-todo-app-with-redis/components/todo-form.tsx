"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  todo: z.string().min(2).max(500),
});

interface AddTodoFormProps {}

export const AddTodo: React.FC<AddTodoFormProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: "",
    },
  });

  type FormData = z.infer<typeof formSchema>;

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      setLoading(true);
      await axios.post(`/api/todo`, values);
      form.reset();
      toast({
        title: "Todo Added",
        description: "Todo Successfully Added",
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

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full grid-cols-12 gap-2 px-2 py-4 mt-5 border rounded-lg md:px-4 focus-within:shadow-sm"
      >
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

        <Button type="submit" className="mt-5 w-fit" disabled={isLoading}>
          Add <Plus className="w-5 h-5 ml-5"/>
        </Button>
      </form>
    </Form>
  );
};
