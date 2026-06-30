import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext.jsx";
import { AuthShell, Field } from "./login.jsx";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const { register: signup } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();

  const onSubmit = async (data) => {
    try {
      await signup(data);
      toast.success("Account created");
      navigate({ to: "/dashboard" });
    } catch (e) {
      toast.error(e.message || "Sign-up failed");
    }
  };

  return (
    <AuthShell title="Create your account" subtitle="Start building your résumé in minutes.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Username" error={errors.username?.message}>
          <input className="auth-input" placeholder="Jane Doe" {...register("username", { required: "Username is required", minLength: { value: 2, message: "Too short" } })} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input type="email" className="auth-input" placeholder="you@example.com" {...register("email", { required: "Email is required", pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Enter a valid email" } })} />
        </Field>
        <Field label="Password" error={errors.password?.message}>
          <input type="password" className="auth-input" placeholder="At least 6 characters" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })} />
        </Field>
        <Field label="Confirm password" error={errors.confirm?.message}>
          <input type="password" className="auth-input" placeholder="Re-enter password" {...register("confirm", { validate: (v) => v === watch("password") || "Passwords don't match" })} />
        </Field>

        <button type="submit" disabled={isSubmitting} className="w-full h-11 rounded-md bg-gold text-ink font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} Create account
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account? <Link to="/login" className="text-gold hover:underline">Sign in</Link>
      </p>
    </AuthShell>
  );
}
