"use client";
import EmployeeCard from "./EmployeeCard";
import {useSearchParams} from "next/navigation";
import {getAllEmployeesAction} from "@/utils/actions";
import {useQuery} from "@tanstack/react-query";

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

  if (isPending) return <h2 className="text-4xl">Please wait...</h2>;
  if (employees.length < 1) return <h2 className="text-4xl">No employees found...</h2>;

  return (
    <>
      {/* Button container -- todo */}
      <div className="grid md:grid-cols-2 gap-8">
        {employees.map(employee => {
          return <EmployeeCard key={employee.id} employee={employee} />;
        })}
      </div>
    </>
  );
}
export default EmployeesList;
