export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 border border-dashed border-border rounded-lg">
      {Icon && (
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <Icon className="w-5 h-5 text-muted-foreground" />
        </div>
      )}
      <h3 className="font-display text-2xl mb-2">{title}</h3>
      {description && <p className="text-muted-foreground max-w-md mb-6">{description}</p>}
      {action}
    </div>
  );
}
