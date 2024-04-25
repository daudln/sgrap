import { VerifyEmail } from "@/components/auth/verify-email";

const Page = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const token = searchParams?.token;
  return (
    <div className="flex items-center justify-center h-screen">
      <VerifyEmail token={token as string} />
    </div>
  );
};

export default Page;
