import { user, session, verificationToken, resetPasswordToken } from "./uaa";
import { school } from "./school";
import { profile } from "./profile";
import { subject } from "./subject";

const schema = {
  user,
  session,
  verificationToken,
  resetPasswordToken,
  school,
  profile,
  subject,
};
export default schema;
