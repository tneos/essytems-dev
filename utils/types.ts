import * as z from "zod";

export type EmployeeType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  position: string;
  fullName: string;
  dob: Date;
  department: string;
  branch: string;
};

export type GetAllEmployeesActionType = {
  search?: string;
  department?: string;
  page?: number;
  limit?: number;
};

export enum Department {
  FrontOfHouse = "Front of House",
  BackOfHouse = "Kitchen Staff",
  Management = "Management Team",
}

export enum Branch {
  CoventGarden = "Covent Garden",
  CharingCross = "Charing Cross",
  LiverpoolStreet = "Liverpool Str",
  Brighton = "Brighton",
}

export const createAndEditEmployeeSchema = z.object({
  position: z.string().min(4, {
    message: "position must be at least 4 characters long",
  }),
  fullName: z.string().min(4, {
    message: "Name must be at least 4 characters long",
  }),
  dob: z.date(),
  department: z.nativeEnum(Department),
  branch: z.nativeEnum(Branch),
});

export type CreateAndEditEmployeeType = z.infer<typeof createAndEditEmployeeSchema>;
