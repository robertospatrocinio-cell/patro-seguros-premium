import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type State = "loading" | "allowed" | "denied" | "unauth";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>("loading");
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    let revision = 0;
    let scheduled: ReturnType<typeof setTimeout> | undefined;
    let verifiedUserId: string | null = null;

    const check = async (showLoading: boolean) => {
      const current = ++revision;
      if (mounted && showLoading) setState("loading");
      try {
        // Validate the session with Auth, not only with cached browser data.
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (!mounted || current !== revision) return;
        if (authError || !user || user.is_anonymous) {
          verifiedUserId = null;
          setState("unauth");
          return;
        }

        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .maybeSingle();
        if (!mounted || current !== revision) return;
        const ok = !error && data?.role === "admin";
        verifiedUserId = ok ? user.id : null;
        setState(ok ? "allowed" : "denied");
      } catch {
        if (mounted && current === revision) {
          verifiedUserId = null;
          setState("denied");
        }
      }
    };

    void check(true);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === "SIGNED_OUT" || !session) {
        ++revision;
        clearTimeout(scheduled);
        verifiedUserId = null;
        setState("unauth");
        return;
      }
      const sameUser = verifiedUserId !== null && session.user.id === verifiedUserId;
      // Routine refreshes for the already-verified admin keep the page mounted.
      if (sameUser && event !== "USER_UPDATED") return;
      ++revision;
      clearTimeout(scheduled);
      if (!sameUser) {
        // Account changed: block access until the new account is verified.
        verifiedUserId = null;
        setState("loading");
      }
      // Supabase calls must run outside the synchronous Auth callback.
      scheduled = setTimeout(() => { void check(!sameUser); }, 0);
    });

    return () => {
      mounted = false;
      ++revision;
      clearTimeout(scheduled);
      subscription.unsubscribe();
    };
  }, []);

  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Verificando acesso...
      </div>
    );
  }
  if (state === "unauth") {
    return <Navigate to={`/admin/login?next=${encodeURIComponent(location.pathname)}`} replace />;
  }
  if (state === "denied") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-2xl font-semibold">Acesso restrito</h1>
        <p className="text-muted-foreground max-w-md">
          Sua conta não tem permissão de administrador. Entre com uma conta autorizada
          ou contate o responsável para receber acesso.
        </p>
        <button
          className="underline"
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = "/admin/login";
          }}
        >
          Sair e entrar com outra conta
        </button>
      </div>
    );
  }
  return <>{children}</>;
}