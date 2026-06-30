import { redirect } from "next/navigation";
import { getAdminPath } from "@/lib/adminConfig";

export default function AdminRoot() {
  redirect(`/${getAdminPath()}/dashboard`);
}