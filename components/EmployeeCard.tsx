import {EmployeeType} from "@/utils/types";
import {MapPin, Briefcase, CalendarDays, RadioTower} from "lucide-react";

import Link from "next/link";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "./ui/card";
import {Separator} from "./ui/separator";
import {Button} from "./ui/button";
import {Badge} from "./ui/badge";
import EmployeeInfo from "./EmployeeInfo";
import DeleteEmployeeBtn from "./DeleteEmployeeBtn";

function EmployeeCard({employee}: {employee: EmployeeType}) {
  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>{employee.position}</CardTitle>
        <CardDescription>{employee.fullName}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent></CardContent>
      <CardFooter className="flex gap-4">
        <Button asChild size="sm">
          <Link href={`/employees/${employee.id}`}>edit</Link>
        </Button>
        <DeleteEmployeeBtn />
      </CardFooter>
    </Card>
  );
}
export default EmployeeCard;
