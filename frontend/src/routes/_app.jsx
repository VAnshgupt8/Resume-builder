import { createFileRoute } from "@tanstack/react-router";
import DashboardLayout from "@/layouts/DashboardLayout.jsx";

export const Route = createFileRoute("/_app")({
  component: DashboardLayout,
});
