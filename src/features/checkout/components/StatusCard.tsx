export function StatusCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-lg mx-auto my-16 text-center bg-card text-card-foreground p-8 border border-border rounded-xl shadow-sm">
      <div className="flex justify-center mb-4">{icon}</div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground mt-2">{description}</p>
      {children}
    </div>
  );
}
