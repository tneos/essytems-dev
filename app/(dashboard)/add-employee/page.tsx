import CreateEmployeeForm from "@/components/CreateEmployeeForm";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";

function AddEmployeePage() {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateEmployeeForm />
    </HydrationBoundary>
  );
}
export default AddEmployeePage;
