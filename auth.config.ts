// import Credentials from "next-auth/providers/credentials";

// import { NextAuthConfig } from "next-auth";
// import { loginSchema } from "@/schema/auth";
// import { comparePassword, getUserByEmail } from "@/lib/auth";

// export const providers = [
//   Credentials({
//     credentials: {
//       email: {},
//       password: {},
//     },
//     authorize: async (credentials) => {
//       const validations = loginSchema.safeParse(credentials);
//       if (!validations.success) {
//         return null;
//       }
//       const { email, password } = validations.data;

//       const user = await getUserByEmail(email);
//       if (!user || !user.password) {
//         return null;
//       }
//       const passwordMatch = await comparePassword(password, user.password);
//       if (!passwordMatch) {
//         return null;
//       }
//       return user;
//     },
//   }),
// ];
// export default {
//   providers: providers,
//   secret: process.env.AUTH_SECRET,
//   pages: {
//     signIn: "/auth/login",
//   },
// } as NextAuthConfig;
