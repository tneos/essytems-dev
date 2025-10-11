"use client";

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {Button} from "./ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "./ui/form";
import {InputProps} from "./ui/input";
import {Input} from "./ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 4 characters long",
  }),
});

function CreateEmployeeForm() {
  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Use of form values

    // This will be type-safe and validated
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({field}) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="John Smith" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default CreateEmployeeForm;
