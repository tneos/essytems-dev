"use client";

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

import {CustomFormField, CustomFormDate, CustomFormSelect} from "./FormComponents";
import {useMutation, useQueryClient, useQuery} from "@tanstack/react-query";

import {
  createEmployeeAction,
  getSingleEmployeeAction,
  updateEmployeeAction,
} from "@/utils/actions";
import {useToast} from "./ui/use-toast";
import {useRouter} from "next/navigation";

function EditEmployeeForm({employeeId}: {employeeId: string}) {
  const queryClient = useQueryClient();
  const {toast} = useToast();
  const router = useRouter();

  const {data} = useQuery({
    queryKey: ["employee", employeeId],
    queryFn: () => getSingleEmployeeAction(employeeId),
  });

  const {mutate, isPending} = useMutation({
    mutationFn: (values: CreateAndEditEmployeeType) => updateEmployeeAction(employeeId, values),
    onSuccess: data => {
      if (!data) {
        toast({
          description: "there was an error",
        });
        return;
      }
      toast({description: "employee details updated successfully"});
      queryClient.invalidateQueries({queryKey: ["employees"]});
      queryClient.invalidateQueries({queryKey: ["employee", employeeId]});
      queryClient.invalidateQueries({queryKey: ["stats"]});
      // Redirect user
      router.push("/employees");
    },
  });

  // Define form
  const form = useForm<CreateAndEditEmployeeType>({
    resolver: zodResolver(createAndEditEmployeeSchema),
    defaultValues: {
      position: data?.position || "",
      fullName: data?.fullName || "",
      dob: data?.dob || undefined,
      status: (data?.status as JobStatus) || JobStatus.FullTime,
      branch: (data?.branch as Branch) || Branch.CoventGarden,
    },
  });

  // Submit handler
  function onSubmit(values: CreateAndEditEmployeeType) {
    mutate(values);
  }
  return (
    <Form {...form}>
      <form className="bg-muted p-8 rounded" onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="capitalize font-semibold text-4xl mb-6">edit employee details</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          {/* position */}
          <CustomFormField name="position" control={form.control} />
          {/* company */}
          <CustomFormField name="fullName" control={form.control} />
          {/* Date of birth */}
          <CustomFormDate control={form.control} />
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
          <Button type="submit" className="self-end capitalize" disabled={isPending}>
            {isPending ? "updating..." : "edit job"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default EditEmployeeForm;
