// import React from "react";
// export default function layout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 h-screen gap-3 justify-center items-center p-32">
//       <div className=" col-span-2">
//         <h1 className="text-md md:text-3xl font-semibold text-center my-4">
//           SGRAP - Student Grading, Reporting, and Assessment Platform
//         </h1>
//         <p className="text-balance text-start md:text-lg md:text-center hidden md:block">
//           A comprehensive platform designed for managing student grading,
//           reporting, and assessments. It provides teachers and administrators
//           with the tools they need to create, grade, and analyze assessments,
//           while also offering students insight into their performance and
//           progress.
//         </p>
//       </div>
//       <div className="col-span-1">{children}</div>
//     </div>
//   );
// }

import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      {children}
      <div className="flex items-center justify-center bg-blue-500/10">
        <div className=" col-span-2">
          <h1 className="text-md md:text-3xl font-semibold text-center my-4">
            SGRAP - Student Grading, Reporting, and Assessment Platform
          </h1>
          <p className="text-balance text-start md:text-lg md:text-center hidden md:block">
            A comprehensive platform designed for managing student grading,
            reporting, and assessments. It provides teachers and administrators
            with the tools they need to create, grade, and analyze assessments,
            while also offering students insight into their performance and
            progress.
          </p>
        </div>
      </div>
    </main>
  );
}
