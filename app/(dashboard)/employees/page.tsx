import EmployeesList from "@/components/EmployeesList";
import SearchForm from "@/components/SearchForm";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getAllEmployeesAction} from "@/utils/actions";

async function EmployeesPage() {
  const queryClient = new QueryClient();

  // Prefetch all data associated with user and populate cache
  await queryClient.prefetchQuery({
    queryKey: ["employees", "", "all", 1],
    queryFn: () => getAllEmployeesAction({}),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchForm />
      <EmployeesList />
    </HydrationBoundary>
  );
}
export default EmployeesPage;
