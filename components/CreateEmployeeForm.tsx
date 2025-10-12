"use client";

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {
  JobStatus,
  Branch,
  createAndEditEmployeeSchema,
  CreateAndEditEmployeeType,
} from "@/utils/types";
import {Button} from "./ui/button";
import {Form} from "./ui/form";

import {CustomFormField, CustomFormSelect, CustomFormDate} from "./FormComponents";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 4 characters long",
  }),
});

function CreateEmployeeForm() {
  // Define form
  const form = useForm<CreateAndEditEmployeeType>({
    resolver: zodResolver(createAndEditEmployeeSchema),
    defaultValues: {
      position: "",
      fullName: "",
      dob: new Date(),
      status: JobStatus.Interview,
      branch: Branch.CoventGarden,
    },
  });

  // Submit handler
  function onSubmit(values: CreateAndEditEmployeeType) {
    // Use of form values

    // This will be type-safe and validated
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="capitalize font-semibold text-4xl mb-6">add employee</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          {/* Position */}
          <CustomFormField name="position" control={form.control} />
          {/* Full name */}
          <CustomFormField name="fullName" control={form.control} />
          {/* Date of birth */}
          <CustomFormDate />
          {/* Job status */}
          <CustomFormSelect
            name="status"
            control={form.control}
            labelText="job status"
            items={Object.values(JobStatus)}
          />
          {/* Branch */}
          <CustomFormSelect
            name="branch"
            control={form.control}
            labelText="Company Branch"
            items={Object.values(Branch)}
          />

          <Button type="submit" className="self-end capitalize">
            Add employee
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateEmployeeForm;
