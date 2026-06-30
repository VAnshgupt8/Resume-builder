import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/authContext.jsx";
import { ResumeProvider } from "@/context/ResumeContext.jsx";
import { SettingsProvider } from "@/context/SettingsContext.jsx";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <ResumeProvider>
          <Outlet />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "var(--color-card)",
                color: "var(--color-foreground)",
                border: "1px solid var(--color-border)",
                fontFamily: "var(--font-sans)",
              },
            }}
          />
        </ResumeProvider>
      </AuthProvider>
    </SettingsProvider>
  );
}
