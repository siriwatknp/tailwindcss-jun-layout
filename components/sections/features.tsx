import { Code2, Layout, Smartphone, Zap } from "lucide-react";

const features = [
  {
    title: "Suit for any project size",
    description:
      "Whether you're building a small component or a large enterprise application, the layout system scales with your needs.",
    icon: Layout,
  },
  {
    title: "CSS first, almost no JS",
    description:
      "Built on pure CSS layout principles, ensuring optimal performance without JavaScript overhead.",
    icon: Code2,
  },
  {
    title: "Modern CSS with full browser support",
    description:
      "Leverages modern CSS features like Grid and Flexbox while maintaining compatibility across all major browsers.",
    icon: Zap,
  },
  {
    title: "Flexible responsive approaches",
    description:
      "Choose between traditional media queries or modern container queries for your responsive layouts.",
    icon: Smartphone,
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group relative rounded-lg border p-6 transition-all hover:border-foreground/20"
          >
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-muted">
                <feature.icon className="size-6" />
              </div>
              <h3 className="font-semibold">{feature.title}</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
