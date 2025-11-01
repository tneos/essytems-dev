"use server";

import prisma from "./db";
import {auth} from "@clerk/nextjs";
import {
  EmployeeType,
  CreateAndEditEmployeeType,
  GetAllEmployeesActionType,
  createAndEditEmployeeSchema,
} from "./types";
import {redirect} from "next/navigation";
import {Prisma} from "@prisma/client";
import {default as dayjs} from "dayjs";

function authenticateClerkId(): string {
  const {userId} = auth();

  if (!userId) redirect("/");
  return userId;
}

// Create employee action
export async function createEmployeeAction(
  values: CreateAndEditEmployeeType
): Promise<EmployeeType | null> {
  // Development only , button display when form being submitted
  await new Promise(resolve => setTimeout(resolve, 3000));

  const userId = authenticateClerkId();

  try {
    // Validate values before sending them to database(zod)
    createAndEditEmployeeSchema.parse(values);

    const employee: EmployeeType = await prisma.employee.create({
      data: {
        ...values,
        clerkId: userId,
      },
    });
    console.log(employee);
    return employee;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Get all employees action
export async function getAllEmployeesAction({
  search,
  department,
  page = 1,
  limit = 10,
}: GetAllEmployeesActionType): Promise<{
  employees: EmployeeType[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const userId = authenticateClerkId();

  try {
    let whereClause: Prisma.EmployeeWhereInput = {
      clerkId: userId,
    };

    // Filter data based on conditions
    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: {
              contains: search,
            },
          },
          {
            fullName: {
              contains: search,
            },
          },
        ],
      };
    }

    if (department && department !== "all") {
      whereClause = {
        ...whereClause,
        department: department,
      };
    }

    const employees: EmployeeType[] = await prisma.employee.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });
    return {employees, count: 0, page: 1, totalPages: 0};
  } catch (error) {
    return {employees: [], count: 0, page: 1, totalPages: 0};
  }
}

// Get single employee action
export async function getSingleEmployeeAction(id: string): Promise<EmployeeType | null> {
  let employee: EmployeeType | null = null;
  const userId = authenticateClerkId();

  try {
    employee = await prisma.employee.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    });
  } catch (error) {
    employee = null;
  }
  // If employee not found redirect from edit component
  if (!employee) {
    redirect("/employees");
  }
  return employee;
}

// Update employee details action
export async function updateEmployeeAction(
  id: string,
  values: CreateAndEditEmployeeType
): Promise<EmployeeType | null> {
  const userId = authenticateClerkId();

  try {
    const employee: EmployeeType = await prisma.employee.update({
      where: {
        id,
        clerkId: userId,
      },
      data: {
        ...values,
      },
    });
    return employee;
  } catch (error) {
    return null;
  }
}

// Delete employee action
export async function deleteEmployeeAction(id: string): Promise<EmployeeType | null> {
  const userId = authenticateClerkId();

  try {
    const employee: EmployeeType = await prisma.employee.delete({
      where: {
        id,
        clerkId: userId,
      },
    });
    return employee;
  } catch (error) {
    return null;
  }
}

// Get stats action
export async function getStatsAction(): Promise<{
  frontOfHouse: number;
  backOfHouse: number;
  management: number;
}> {
  const userId = authenticateClerkId();

  try {
    const stats = await prisma.employee.groupBy({
      by: ["department"],
      _count: {
        department: true,
      },
      where: {
        clerkId: userId,
      },
    });

    const statsObject = stats.reduce((acc, curr) => {
      acc[curr.department] = curr._count.department;
      return acc;
    }, {} as Record<string, number>);

    // Rename object keys
    statsObject.frontOfHouse = statsObject["Front of House"];
    delete statsObject["Front of House"];
    statsObject.backOfHouse = statsObject["Kitchen Staff"];
    delete statsObject["Kitchen Staff"];
    statsObject.management = statsObject["Management Team"];
    delete statsObject["Management Team"];

    // Default values when user signs up
    const defaultStats = {
      frontOfHouse: 0,
      backOfHouse: 0,
      management: 0,
      ...statsObject,
    };
    return defaultStats;
  } catch (error) {
    redirect("/employees");
  }
}

// Get charts data action
export async function getChartsDataAction(): Promise<Array<{date: string; count: number}>> {
  // Authenticate user
  const userId = authenticateClerkId();
  // Set start date for existing data
  const sixMonthsAgo = dayjs().subtract(6, "month").toDate();

  try {
    const employees = await prisma.employee.findMany({
      where: {
        clerkId: userId,
        updatedAt: {
          gte: sixMonthsAgo,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    let employeesPerMonth = employees.reduce((acc, employee) => {
      const date = dayjs(employee.createdAt).format("MMM YY");

      // Check if date exists, add 1 to count if it does
      const existingEntry = acc.find(entry => entry.date === date);
      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        acc.push({date, count: 1});
      }

      return acc;
    }, [] as Array<{date: string; count: number}>);

    return employeesPerMonth;
  } catch (error) {
    redirect("/employees");
  }
}
