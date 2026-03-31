import * as React from "react";
import { supabase } from "../lib/supabase";

export default function SignInPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        setMessage(
          "Account created. Check your email if confirmation is required."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setMessage("Signed in successfully.");
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            {isSignUp ? "Create account" : "Sign in"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Use your email and password to access CtrlFood.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-background"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-background"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted/50 disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : isSignUp
              ? "Create account"
              : "Sign in"}
          </button>
        </form>

        {message ? (
          <div className="mt-4 text-sm text-muted-foreground">{message}</div>
        ) : null}

        <button
          type="button"
          onClick={() => {
            setIsSignUp((prev) => !prev);
            setMessage(null);
          }}
          className="mt-6 text-sm underline underline-offset-4"
        >
          {isSignUp
            ? "Already have an account? Sign in"
            : "Need an account? Sign up"}
        </button>
      </div>
    </div>
  );
}