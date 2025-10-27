"use client";
import {Input} from "./ui/input";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Button} from "./ui/button";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./ui/select";
import {Department} from "@/utils/types";

function SearchForm() {
  const searchParams = useSearchParams();
  // Get params and set default values
  const search = searchParams.get("search") || "";
  const department = searchParams.get("department") || "all";
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    const department = formData.get("department") as string;
    let params = new URLSearchParams();
    params.set("search", search);
    params.set("department", department);

    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <form
      className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg"
      onSubmit={handleSubmit}
    >
      <Input type="text" placeholder="Search employees" name="search" defaultValue={search} />
      <Select name="department" defaultValue={department}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {["all", ...Object.values(Department)].map(department => {
            return (
              <SelectItem key={department} value={department}>
                {department}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <Button type="submit">Search</Button>
    </form>
  );
}
export default SearchForm;
