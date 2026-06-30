import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAuth } from "@/context/authContext.jsx";

export const Route = createFileRoute("/_app/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, updateProfile, changePassword, deleteAccount } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { username: user?.username, email: user?.email },
  });

  const pw = useForm();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const onSave = (data) => {
    updateProfile(data);
    toast.success("Profile updated");
  };

  const onChangePw = async (data) => {
    try {
      await changePassword(data.oldPw, data.newPw);
      toast.success("Password changed");
      pw.reset();
    } catch (e) { toast.error(e.message); }
  };

  const onPhoto = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => updateProfile({ avatar: reader.result });
    reader.readAsDataURL(f);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 lg:p-10 space-y-8">
      <h1 className="font-display text-4xl">Profile</h1>

      <section className="p-6 rounded-xl border border-border bg-card">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center text-ink text-2xl font-semibold overflow-hidden">
            {user?.avatar ? <img src={user.avatar} alt="" className="w-full h-full object-cover" /> : (user?.username?.[0]?.toUpperCase() || "L")}
          </div>
          <div>
            <p className="font-display text-xl">{user?.username}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <label className="mt-2 inline-block text-sm text-gold hover:underline cursor-pointer">
              Change photo
              <input type="file" accept="image/*" onChange={onPhoto} className="hidden" />
            </label>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit(onSave)} className="p-6 rounded-xl border border-border bg-card space-y-4">
        <h2 className="font-display text-xl">Account details</h2>
        <label className="block">
          <span className="text-sm text-muted-foreground">Username</span>
          <input className="mt-1 w-full h-10 px-3 rounded-md bg-background border border-border text-sm outline-none focus:border-gold"
            {...register("username", { required: "Required", minLength: { value: 2, message: "Too short" } })} />
          {errors.username && <p className="text-xs text-destructive mt-1">{errors.username.message}</p>}
        </label>
        <label className="block">
          <span className="text-sm text-muted-foreground">Email</span>
          <input type="email" className="mt-1 w-full h-10 px-3 rounded-md bg-background border border-border text-sm outline-none focus:border-gold"
            {...register("email", { required: "Required", pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Invalid email" } })} />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
        </label>
        <button className="px-4 h-10 rounded-md bg-gold text-ink font-medium hover:opacity-90">Save changes</button>
      </form>

      <form onSubmit={pw.handleSubmit(onChangePw)} className="p-6 rounded-xl border border-border bg-card space-y-4">
        <h2 className="font-display text-xl">Change password</h2>
        <label className="block">
          <span className="text-sm text-muted-foreground">Current password</span>
          <input type="password" className="mt-1 w-full h-10 px-3 rounded-md bg-background border border-border text-sm outline-none focus:border-gold"
            {...pw.register("oldPw", { required: true })} />
        </label>
        <label className="block">
          <span className="text-sm text-muted-foreground">New password</span>
          <input type="password" className="mt-1 w-full h-10 px-3 rounded-md bg-background border border-border text-sm outline-none focus:border-gold"
            {...pw.register("newPw", { required: true, minLength: { value: 6, message: "Min 6 chars" } })} />
          {pw.formState.errors.newPw && <p className="text-xs text-destructive mt-1">{pw.formState.errors.newPw.message}</p>}
        </label>
        <button className="px-4 h-10 rounded-md border border-border hover:bg-muted">Update password</button>
      </form>

      <section className="p-6 rounded-xl border border-destructive/30 bg-destructive/5">
        <h2 className="font-display text-xl text-destructive">Delete account</h2>
        <p className="text-sm text-muted-foreground mt-1 mb-4">Permanently removes your account and all résumés. This can't be undone.</p>
        {confirmDelete ? (
          <div className="flex gap-2">
            <button
              onClick={() => { deleteAccount(); toast.success("Account deleted"); navigate({ to: "/" }); }}
              className="px-4 h-10 rounded-md bg-destructive text-destructive-foreground font-medium"
            >Yes, delete everything</button>
            <button onClick={() => setConfirmDelete(false)} className="px-4 h-10 rounded-md border border-border">Cancel</button>
          </div>
        ) : (
          <button onClick={() => setConfirmDelete(true)} className="px-4 h-10 rounded-md border border-destructive/40 text-destructive hover:bg-destructive/10">
            Delete my account
          </button>
        )}
      </section>
    </div>
  );
}
