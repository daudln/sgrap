import { ResetPasswordForm } from "@/components/auth/reset-password-form";

const Page = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const token = searchParams?.token;
  return (
    <div className="flex items-center justify-center h-screen">
      <ResetPasswordForm token={token as string} />
    </div>
  );
};

export default Page;
