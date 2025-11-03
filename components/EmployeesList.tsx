"use client";
import EmployeeCard from "./EmployeeCard";
import {useSearchParams} from "next/navigation";
import {getAllEmployeesAction} from "@/utils/actions";
import {useQuery} from "@tanstack/react-query";
import ButtonContainer from "./ButtonContainer";
import {constructFromSymbol} from "date-fns/constants";

function EmployeesList() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const department = searchParams.get("department") || "";
  const pageNumber = Number(searchParams.get("page") || 1);

  const {data, isPending} = useQuery({
    queryKey: ["employees", search, department, pageNumber],
    queryFn: () => getAllEmployeesAction({search, department, page: pageNumber}),
  });

  const employees = data?.employees || [];

  const count = data?.count || 0;
  const page = data?.page || 0;
  const totalPages = data?.totalPages || 0;

  if (isPending) return <h2 className="text-4xl">Please wait...</h2>;
  if (employees.length < 1) return <h2 className="text-4xl">No employees found...</h2>;

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold capitalize">{count} employees found</h2>
        {totalPages < 2 ? null : <ButtonContainer currentPage={page} totalPages={totalPages} />}
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {employees.map(employee => {
          return <EmployeeCard key={employee.id} employee={employee} />;
        })}
      </div>
    </>
  );
}
export default EmployeesList;
