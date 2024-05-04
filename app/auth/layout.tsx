import Link from "next/link";
import { TbSchool } from "react-icons/tb";

interface AuthenticationLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticationLayout({
  children,
}: AuthenticationLayoutProps) {
  return (
    <>
      {/* <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div> */}
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link
              href="/"
              className="relative flex items-center gap-2.5"
              aria-label="Home"
            >
              <TbSchool className="h-6 w-6" />
              <span>SGRAP</span>
            </Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                A comprehensive platform designed for managing student grading,
                reporting, and assessments. It provides teachers and
                administrators with the tools they need to create, grade, and
                analyze assessments, while also offering students insight into
                their performance and progress.
              </p>
              <footer className="text-sm">SGRAP</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
