import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FileText, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext.jsx";

export const Route = createFileRoute("/login")({
  validateSearch: (s) => ({ redirect: typeof s.redirect === "string" ? s.redirect : undefined }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ from: "/login" });
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { email: "", password: "", remember: true },
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Welcome back");
      navigate({ to: search.redirect || "/dashboard" });
    } catch (e) {
      toast.error(e.message || "Login failed");
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to continue building.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            placeholder="you@example.com"
            className="auth-input"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Enter a valid email" },
            })}
          />
        </Field>
        <Field label="Password" error={errors.password?.message}>
          <input
            type="password"
            placeholder="••••••••"
            className="auth-input"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
          />
        </Field>

        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2 text-muted-foreground cursor-pointer">
            <input type="checkbox" className="accent-gold" {...register("remember")} />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-gold hover:underline">Forgot password?</Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-md bg-gold text-ink font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} Sign in
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        New here? <Link to="/register" className="text-gold hover:underline">Create an account</Link>
      </p>
    </AuthShell>
  );
}

export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 bg-card border-r border-border relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 50% at 30% 30%, var(--color-gold) 0%, transparent 60%)", opacity: 0.2 }} />
        <div className="relative z-10 p-16 flex flex-col justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md gold-gradient flex items-center justify-center">
              <FileText className="w-4 h-4 text-ink" />
            </div>
            <span className="font-display text-2xl">Lumen</span>
          </Link>
          <div>
            <h2 className="font-display text-4xl mb-4 max-w-md">"The résumé I'd been trying to write for a year — done in an afternoon."</h2>
            <p className="text-sm text-muted-foreground">Marina K. · Engineering Manager</p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <h1 className="font-display text-3xl mb-2">{title}</h1>
          {subtitle && <p className="text-muted-foreground mb-8">{subtitle}</p>}
          {children}
        </motion.div>
      </div>
      <style>{`
        .auth-input {
          width: 100%;
          height: 44px;
          padding: 0 14px;
          border-radius: 8px;
          background: var(--color-background);
          border: 1px solid var(--color-border);
          color: var(--color-foreground);
          font-size: 14px;
          outline: none;
          transition: border-color 0.15s;
        }
        .auth-input:focus { border-color: var(--color-gold); }
      `}</style>
    </div>
  );
}

export function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
