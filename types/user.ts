export type User = {
  name: string | null;
  email: string | null;
  id: string;
};

export type Profile = {
  id: string;
  image: string | null;
  gender: "MALE" | "FEMALE";
  phoneNumber: string | null;
};

export type School = {
  name: string;
  motto: string;
};

export type Student = {
  classLevel: string;
};

export type StudentData = {
  profile: Profile;
  user: User;
  student: Student;
  school: School;
};

export type Teacher = {
  teacher: Omit<StudentData, "student">;
};

export type TeacherData = {
  profile: Profile;
  user: User;
  school: School;
};
