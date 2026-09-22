import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [
    { title: "Set Editor Password — Catherine Andrew" },
    { name: "description", content: "Securely set the password for Catherine Andrew's portfolio editor." },
    { property: "og:title", content: "Set Editor Password — Catherine Andrew" },
    { property: "og:description", content: "Secure portfolio editor password setup." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const recovery = new URLSearchParams(window.location.hash.slice(1)).get("type") === "recovery";
    supabase.auth.getSession().then(({ data }) => setReady(recovery || Boolean(data.session)));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirmation = String(form.get("confirmation") ?? "");
    if (password.length < 8 || password !== confirmation) {
      setError("Use at least 8 characters and make sure both entries match.");
      setBusy(false);
      return;
    }
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (updateError) {
      setError("This password link is invalid or has expired. Request a new one.");
      return;
    }
    navigate({ to: "/editor", replace: true });
  }

  return <main className="grid min-h-screen place-items-center px-5 py-12"><div className="w-full max-w-md border bg-card p-7 sm:p-10"><KeyRound className="text-sage"/><h1 className="mt-6 font-display text-4xl font-semibold">Set your password</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">Choose the password Catherine will use for the private portfolio editor.</p>{ready ? <form onSubmit={submit} className="mt-8 space-y-4"><Input name="password" type="password" required minLength={8} placeholder="New password"/><Input name="confirmation" type="password" required minLength={8} placeholder="Confirm new password"/><Button className="w-full" disabled={busy}>{busy ? "Saving…" : "Save password"}</Button></form> : <p className="mt-8 text-sm text-destructive">This password link is invalid or has expired.</p>}{error && <p className="mt-4 text-sm text-destructive" role="alert">{error}</p>}</div></main>;
}