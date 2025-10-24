import EditEmployeeForm from "@/components/EditEmployeeForm";
import {getSingleEmployeeAction} from "@/utils/actions";

import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";

async function EmployeeEditPage({params}: {params: {id: string}}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["employee", params.id],
    queryFn: () => getSingleEmployeeAction(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditEmployeeForm employeeId={params.id} />
    </HydrationBoundary>
  );
}

export default EmployeeEditPage;
