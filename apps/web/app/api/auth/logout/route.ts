import { deleteSession } from "@/lib/session";
import { redirect, RedirectType } from "next/navigation";

export async function GET() {
  await deleteSession();

  redirect("/", RedirectType.push);
}
