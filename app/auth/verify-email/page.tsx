import { VerifyEmail } from "./_Components/verify-email";

const Page = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const token = searchParams?.token;
  return (
    <div className="">
      <VerifyEmail token={token as string} />
    </div>
  );
};

export default Page;
