import Image from "next/image";

export default function Barner() {
  return (
    <div className="lg:grid bg-slate-500">
      <div className="hidden bg-muted lg:block">
        <Image
          src="/barner-image-dark.png"
          alt="Image"
          width={500}
          height={500}
          priority
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale rounded-md"
        />
      </div>
    </div>
  );
}
