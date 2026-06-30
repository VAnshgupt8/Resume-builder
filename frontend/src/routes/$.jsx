import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  component: NotFound,
});

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6">
      <div>
        <p className="font-display text-7xl md:text-9xl gold-text">404</p>
        <h1 className="font-display text-3xl mt-4 mb-2">Page not found</h1>
        <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist.</p>
        <Link to="/" className="inline-flex px-5 h-11 items-center rounded-md bg-gold text-ink font-medium hover:opacity-90">
          Back home
        </Link>
      </div>
    </div>
  );
}
