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
  id: string;
  name: string;
  email: string;
  school: string;
  gender: "MALE" | "FEMALE" | null;
  classLevel:
    | "NURSERY"
    | "PRE_NURSERY"
    | "KINDERGARTEN"
    | "GRADE_1"
    | "GRADE_2"
    | "GRADE_3"
    | "GRADE_4"
    | "GRADE_5"
    | "GRADE_6"
    | "GRADE_7"
    | "GRADE_8"
    | "FORM_ONE"
    | "FORM_TWO"
    | "FORM_THREE"
    | "FORM_FOUR"
    | "FORM_FIVE"
    | "FORM_SIX";
  dateOfBirth: Date | null;
  phoneNumber: string | null;
  image: string | null;
  userType: "ADMIN" | "USER" | null;
  createdAt: Date;
  updatedAt: Date | null;
};

export type Teacher = {
  teacher: Omit<StudentData, "student">;
};

export type TeacherData = {
  profile: Profile;
  user: User;
  school: School;
};
