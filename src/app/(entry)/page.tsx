import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function EntryPage() {
  const preference = (await cookies()).get("alevum-locale")?.value;
  redirect(preference === "en" ? "/en" : "/pt");
}
