import { School, Student, Teacher, User } from "@prisma/client";

export interface ProfileData {
  userId: string;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: true;
  phoneNumber: string;
  schoolId: string;
  gender: string;
  Student: Student | null;
  Teacher: Teacher | null;
  school: School;
}

export interface UserData {
  id: string;
  name: string | null;
  email: string | null;
  type: "STUDENT" | "TEACHER";
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  image: string | null;
  Profile: ProfileData;
}
