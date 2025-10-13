"use server";

import prisma from "./db";
import {auth} from "@clerk/nextjs";
import {EmployeeType, CreateAndEditEmployeeType, createAndEditEmployeeSchema} from "./types";
import {redirect} from "next/navigation";
import {Prisma} from "@prisma/client";
import dayjs from "dayjs";

function authenticateClerkId(): string {
  const {userId} = auth();
  if (!userId) redirect("/");
  return userId;
}

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
