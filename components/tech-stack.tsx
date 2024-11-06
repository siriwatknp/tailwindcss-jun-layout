import Image from "next/image";
import { cn } from "@/lib/utils";

type Technology = "typescript" | "tailwindcss";

interface TechStackProps {
  technologies: Technology[];
  className?: string;
}

const techIcons: Record<Technology, { src: string; alt: string }> = {
  typescript: {
    src: "/icons/typescript.svg",
    alt: "TypeScript",
  },
  tailwindcss: {
    src: "/icons/tailwindcss.svg",
    alt: "Tailwind CSS",
  },
};

export default function TechStack({ technologies, className }: TechStackProps) {
  return (
    <div className={cn("flex gap-4", className)}>
      {technologies.map((tech) => (
        <div
          key={tech}
          className="flex items-center justify-center rounded-full bg-muted/30 p-2"
        >
          <Image
            src={techIcons[tech].src}
            alt={techIcons[tech].alt}
            width={24}
            height={24}
            className="size-6"
          />
        </div>
      ))}
    </div>
  );
}
