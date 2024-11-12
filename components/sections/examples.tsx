import { ExternalLink, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import BrowserFrame from "@/components/browser-frame";
import { cn } from "@/lib/utils";
import { docsConfig } from "@/config/docs";

function AnchorHeading({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("group relative inline-block", className)}>
      {children}
      <a
        href={`#${id}`}
        className={cn(
          "absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 items-center gap-1 text-muted-foreground hover:text-foreground group-hover:opacity-100 hover:opacity-100 flex",
          "h-6 w-6",
          "transition-opacity duration-200"
        )}
        aria-label={`Link to ${id}`}
      >
        <LinkIcon className="size-4" />
      </a>
    </div>
  );
}

export default function Examples() {
  // Get all enabled examples from the docs config
  const examples =
    docsConfig.sidebarNav
      ?.find((section) => section.title === "Examples")
      ?.items?.filter(
        (item) => item.href?.startsWith("/examples/") && !item.disabled
      ) ?? [];

  return (
    <section className="container max-w-screen-xl px-4 py-16">
      <div className="mb-16 text-center">
        <div className="flex justify-center">
          <AnchorHeading id="examples">
            <h2
              id="examples"
              className="scroll-m-20 text-balance bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
            >
              Layout Examples
            </h2>
          </AnchorHeading>
        </div>
        <p className="mt-4 text-lg text-muted-foreground">
          See how Tailwind Jun Layout can help you build complex layouts with
          ease
        </p>
      </div>

      <div className="space-y-32">
        {examples.map((example) => (
          <BrowserFrame
            key={example.href}
            url={
              <Link
                href={example.href!}
                target="_blank"
                className="flex items-center gap-1.5 hover:text-foreground"
              >
                {example.href}
                <ExternalLink className="size-3" />
              </Link>
            }
            title={
              <h3
                id={example.href!.replace(/^\/examples\//, "")}
                className="scroll-m-20 text-xl font-semibold"
              >
                <AnchorHeading id={example.href!.replace(/^\/examples\//, "")}>
                  {example.title}
                </AnchorHeading>
              </h3>
            }
          >
            <iframe src={example.href} className="h-full w-full" />
          </BrowserFrame>
        ))}
      </div>
    </section>
  );
}
