"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {
  Department,
  Branch,
  createAndEditEmployeeSchema,
  CreateAndEditEmployeeType,
} from "@/utils/types";
import {Button} from "./ui/button";
import {Form} from "./ui/form";

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEmployeeAction} from "@/utils/actions";
import {useToast} from "./ui/use-toast";
import {useRouter} from "next/navigation";

import {CustomFormField, CustomFormSelect, CustomFormDate} from "./FormComponents";

function CreateEmployeeForm() {
  // Define form
  const form = useForm<CreateAndEditEmployeeType>({
    resolver: zodResolver(createAndEditEmployeeSchema),
    defaultValues: {
      position: "",
      fullName: "",
      dob: new Date(),
      department: Department.FrontOfHouse,
      branch: Branch.CoventGarden,
    },
  });

  const queryClient = useQueryClient();
  const {toast} = useToast();
  const router = useRouter();

  const {mutate, isPending} = useMutation({
    mutationFn: (values: CreateAndEditEmployeeType) => createEmployeeAction(values),
    onSuccess: data => {
      if (!data) {
        toast({description: "there was an error"});
        return;
      }
      toast({description: "employee added"});
      queryClient.invalidateQueries({queryKey: ["employees"]});
      queryClient.invalidateQueries({queryKey: ["stats"]});
      queryClient.invalidateQueries({queryKey: ["charts"]});

      // Navigate user to employees page
      router.push("/employees");
    },
  });

  // Submit handler
  function onSubmit(values: CreateAndEditEmployeeType) {
    // Use of form values
    mutate(values);
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
          <CustomFormDate control={form.control} />
          {/* Department */}
          <CustomFormSelect
            name="department"
            control={form.control}
            labelText="department"
            items={Object.values(Department)}
          />
          {/* Branch */}
          <CustomFormSelect
            name="branch"
            control={form.control}
            labelText="Company Branch"
            items={Object.values(Branch)}
          />

          <Button type="submit" className="self-end capitalize" disabled={isPending}>
            {isPending ? "loading" : "add employee"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateEmployeeForm;
