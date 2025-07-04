import { Metadata } from "next/types";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function Page() {
  return (
    <div className="">
      <LoginForm />
    </div>
  );
}
