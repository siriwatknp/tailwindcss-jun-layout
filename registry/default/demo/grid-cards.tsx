export default function GridCardsDemo() {
  const cards = [
    {
      title: "Project Alpha",
      description:
        "A comprehensive solution for modern web applications with advanced features.",
      status: "In Progress",
      statusColor: "text-blue-600",
    },
    {
      title: "Project Beta",
      description:
        "Revolutionary mobile-first approach to user engagement and retention.",
      status: "Completed",
      statusColor: "text-green-600",
    },
    {
      title: "Project Gamma",
      description:
        "Enterprise-grade security implementation with zero-trust architecture.",
      status: "Planning",
      statusColor: "text-yellow-600",
    },
    {
      title: "Project Delta",
      description:
        "AI-powered analytics dashboard for real-time business insights.",
      status: "In Progress",
      statusColor: "text-blue-600",
    },
    {
      title: "Project Epsilon",
      description:
        "Cloud-native microservices platform with automatic scaling.",
      status: "Review",
      statusColor: "text-purple-600",
    },
    {
      title: "Project Zeta",
      description:
        "Next-generation e-commerce solution with personalized experiences.",
      status: "Completed",
      statusColor: "text-green-600",
    },
  ];

  return (
    <div className="w-full border rounded-lg bg-background p-4">
      <div className="jun-grid gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="jun-gridItem col-span-12 sm:col-span-6 lg:col-span-4"
          >
            <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-lg">{card.title}</h3>
                <span className={`text-xs font-medium ${card.statusColor}`}>
                  {card.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {card.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-muted border-2 border-background"></div>
                  <div className="w-8 h-8 rounded-full bg-muted border-2 border-background"></div>
                  <div className="w-8 h-8 rounded-full bg-muted border-2 border-background"></div>
                </div>
                <button className="text-sm text-primary hover:underline">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
