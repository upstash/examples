import {
  Select,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { SelectGroup } from "@radix-ui/react-select";
import { UseFormReturn } from "react-hook-form";

export const EditForm = ({
  url,
  schedule,
  form,
  onSubmit,
  isValid,
  create,
}: {
  url: string;
  schedule: string;
  form: UseFormReturn<
    {
      url: string;
      schedule: string;
    },
    any,
    undefined
  >;
  onSubmit: (data: any) => void;
  isValid: boolean;
  create: boolean;
}) => {
  return (
    <Form {...form}>
      <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="url"
          control={form.control}
          defaultValue={create ? "" : url}
          render={({ field }) => {
            return (
              <FormItem className="grid items-center grid-cols-4 gap-4">
                <FormLabel htmlFor="url" className="text-right">
                  URL
                </FormLabel>
                <Input
                  id="name"
                  className="col-span-3"
                  {...field}
                  placeholder={create ? "Input your url..." : ""}
                />
                <FormMessage className="whitespace-nowrap" />
              </FormItem>
            );
          }}
        />
        <FormField
          name="schedule"
          control={form.control}
          defaultValue={create ? undefined : schedule}
          render={({ field }) => {
            return (
              <FormItem className="grid items-center w-full grid-cols-4 gap-4">
                <FormLabel className="text-right">Schedule</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={create ? undefined : field.value}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue
                      placeholder={create ? "Every * * * * *" : undefined}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="* * * * *">every minute</SelectItem>
                      <SelectItem value="*/5 * * * *">
                        every 5 minutes
                      </SelectItem>
                      <SelectItem value="*/10 * * * *">
                        every 10 minutes
                      </SelectItem>
                      <SelectItem value="*/30 * * * *">
                        every 30 minutes
                      </SelectItem>
                      <SelectItem value="0 * * * *">every hour</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <DialogFooter>
          <DialogTrigger asChild>
            <Button
              type="submit"
              className={!isValid ? " pointer-events-none bg-gray-500" : ""}
            >
              {create ? "Create" : "Update"}
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </form>
    </Form>
  );
};
