import {
  user,
  session,
  verificationToken,
  resetPasswordToken,
} from "@/db/schema/uaa";
import { school } from "@/db/schema/school";
import { profile } from "@/db/schema/profile";
import { subject } from "@/db/schema/subject";
import { student } from "@/db/schema/student";
import { teacher } from "@/db/schema/teacher";

const schema = {
  user,
  session,
  verificationToken,
  resetPasswordToken,
  school,
  profile,
  subject,
  student,
  teacher,
};
export default schema;
