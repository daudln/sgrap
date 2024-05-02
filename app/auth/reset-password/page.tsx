import { ResetPasswordForm } from "./_components/reset-password-form";

const Page = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const token = searchParams?.token;
  return (
    <div className="">
      <ResetPasswordForm token={token as string} />
    </div>
  );
};

export default Page;
