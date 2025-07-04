import { redirect } from "next/navigation";
import { ResetPasswordForm } from "./_components/reset-password-form";

const Page = async (props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const token = searchParams?.token;

  if (!token) {
    return redirect("/");
  }

  return (
    <div className="">
      <ResetPasswordForm token={token as string} />
    </div>
  );
};

export default Page;
