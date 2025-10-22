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
    return employee;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Get all employees action
export async function getAllEmployeesAction({
  search,
  jobStatus,
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

    if (jobStatus && jobStatus !== "all") {
      whereClause = {
        ...whereClause,
        status: jobStatus,
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
