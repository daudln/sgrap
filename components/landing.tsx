import { Button } from "@/components/ui/button";
import { BookIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-gray-900 text-white px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <BookIcon className="h-6 w-6" />
          <span className="sr-only">SGRAP</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/auth/login"
          >
            Getting Started
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-8">
                <h1 className="text-3xl font-bold tracking-normal sm:text-4xl md:text-5xl lg:text-6xl">
                  Streamline Your Student Grading and Reporting
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SGRAP is a powerful platform that simplifies student grading,
                  reporting, and assessment. Empower your educators and improve
                  student outcomes.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <Link href="/auth/login">Get Started</Link>
                  </Button>
                  <Button asChild variant="secondary">
                    <Link href="/auth/login">Learn more</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  alt="Hero Image"
                  className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover"
                  height="400"
                  src="/students.gif"
                  width="600"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl p-4">
                  Streamline Your Grading and Reporting
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  SGRAP provides a comprehensive suite of tools to help
                  educators efficiently manage student grades, generate detailed
                  reports, and gain valuable insights.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Automated Grading</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Streamline the grading process with our powerful automated
                  grading tools, saving you time and ensuring consistency.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Comprehensive Reporting</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Generate detailed, customizable reports to track student
                  progress, identify areas for improvement, and share insights
                  with stakeholders.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Intuitive Assessment</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Easily create and manage assessments, quizzes, and tests to
                  accurately measure student learning and performance.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Collaborative Tools</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Empower your team with collaborative features, allowing
                  educators to share feedback, comments, and insights on student
                  work.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Secure Data Management</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Safeguard student data with robust security measures and
                  user-level permissions, ensuring the privacy and integrity of
                  your information.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Customizable Dashboards</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tailor the platform to your specific needs with customizable
                  dashboards, allowing you to access the data and insights that
                  matter most to your institution.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Trusted by Educators Worldwide
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                SGRAP is the preferred choice for schools, universities, and
                educational institutions of all sizes, helping them streamline
                their grading and reporting processes.
              </p>
            </div>
            <div className="divide-y rounded-lg border">
              <div className="grid w-full grid-cols-3 items-stretch justify-center divide-x md:grid-cols-3">
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <Image
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                    height="70"
                    src="/placeholder.svg"
                    width="140"
                  />
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <Image
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                    height="70"
                    src="/placeholder.svg"
                    width="140"
                  />
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <Image
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                    height="70"
                    src="/placeholder.svg"
                    width="140"
                  />
                </div>
              </div>
              <div className="grid w-full grid-cols-3 items-stretch justify-center divide-x md:grid-cols-3">
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <Image
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                    height="70"
                    src="/placeholder.svg"
                    width="140"
                  />
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <Image
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                    height="70"
                    src="/placeholder.svg"
                    width="140"
                  />
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <Image
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                    height="70"
                    src="/placeholder.svg"
                    width="140"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50"
                href="#"
              >
                Contact Sales
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-blue-500 bg-transparent px-8 text-sm font-medium text-blue-500 shadow-sm transition-colors hover:bg-blue-500 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50"
                href="#"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-900 text-white">
        <p className="text-xs">© 2024 SGRAP. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
}
