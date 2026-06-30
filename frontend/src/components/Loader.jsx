export default function Loader({ size = 32, label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div
        className="rounded-full border-2 border-gold border-t-transparent animate-spin"
        style={{ width: size, height: size }}
      />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
}
