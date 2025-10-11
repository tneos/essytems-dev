import * as z from "zod";

export type EmployeeType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  position: string;
  fullName: string;
  dob: Date;
  status: string;
  branch: string;
};

export enum JobStatus {
  Interview = "interview",
  PartTime = "part-time",
  FullTime = "full-time",
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
  status: z.nativeEnum(JobStatus),
  branch: z.nativeEnum(Branch),
});

export type CreateAndEditEmployeeType = z.infer<typeof createAndEditEmployeeSchema>;
