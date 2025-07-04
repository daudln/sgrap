import {
  account,
  resetPasswordToken,
  session,
  user,
  verification,
  permission,
  role,
  rolesToPermissions,
  permissionsRelations,
  rolesRelations,
  rolesToPermissionsRelations,
  userRelations,
} from "@/db/schema/auth";
import { profile, profileRelations } from "@/db/schema/profile";
import { school, schoolRelations } from "@/db/schema/school";
import { student, studentRelations } from "@/db/schema/student";
import {
  subject,
  schoolSubject,
  subjectRelations,
  schoolSubjectRelations,
} from "@/db/schema/subject";
import {
  teacher,
  teachersToSubjects,
  teachersToSchools,
  teacherRelations,
  teachersToSchoolsRelations,
  teachersToSubjectsRelations,
} from "@/db/schema/teacher";

import {
  region,
  district,
  ward,
  regionRelations,
  districtRelations,
  wardRelations,
  street,
  streetRelations,
} from "@/db/schema/setting";

const schema = {
  // Auth models and relations
  user,
  account,
  session,
  verification,
  resetPasswordToken,
  permission,
  role,
  userRelations,
  rolesToPermissions,
  permissionsRelations,
  rolesRelations,
  rolesToPermissionsRelations,

  // Profile models and relations
  profile,
  profileRelations,

  // Subject models and relations
  subject,
  schoolSubject,
  subjectRelations,
  schoolSubjectRelations,

  // School models and relations
  school,
  schoolRelations,

  // Student models and relations
  student,
  studentRelations,

  // Teacher models and relations
  teacher,
  teachersToSubjects,
  teachersToSchools,
  teacherRelations,
  teachersToSchoolsRelations,
  teachersToSubjectsRelations,

  // Setting models and relations
  region,
  district,
  ward,
  regionRelations,
  districtRelations,
  wardRelations,
  streetRelations,
};
export default schema;

export {
  user,
  account,
  session,
  verification,
  resetPasswordToken,
  school,
  profile,
  subject,
  student,
  teacher,
  permission,
  role,
  rolesToPermissions,
  teachersToSubjects,
  teachersToSchools,
  region,
  district,
  ward,
  street,
};
