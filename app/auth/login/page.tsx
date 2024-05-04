import { Metadata } from "next/types";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

const Page = () => {
  return (
    <div className="">
      <LoginForm />
    </div>
  );
};

export default Page;
