import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext.jsx";
import { AuthShell, Field } from "./login.jsx";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async ({ email }) => {
    await requestPasswordReset(email);
    setSent(true);
    toast.success("If that email is registered, we sent a reset link.");
  };

  return (
    <AuthShell title="Reset your password" subtitle="We'll send a reset link to your email.">
      {sent ? (
        <div className="text-center py-6">
          <CheckCircle2 className="w-12 h-12 mx-auto text-gold mb-4" />
          <p className="text-muted-foreground mb-6">Check your inbox for next steps.</p>
          <Link to="/login" className="text-gold hover:underline text-sm">Back to sign in</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field label="Email" error={errors.email?.message}>
            <input type="email" className="auth-input" placeholder="you@example.com" {...register("email", { required: "Email is required", pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Invalid email" } })} />
          </Field>
          <button type="submit" disabled={isSubmitting} className="w-full h-11 rounded-md bg-gold text-ink font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} Send reset link
          </button>
          <p className="text-center text-sm text-muted-foreground">
            Remembered it? <Link to="/login" className="text-gold hover:underline">Sign in</Link>
          </p>
        </form>
      )}
    </AuthShell>
  );
}
