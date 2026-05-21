import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type State = "loading" | "allowed" | "denied" | "unauth";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>("loading");
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    const check = async (userId: string | undefined) => {
      console.log("RequireAdmin: Checking access for user:", userId);
      if (!userId) {
        if (mounted) {
          console.log("RequireAdmin: No user ID, setting unauth");
          setState("unauth");
        }
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId)
          .eq("role", "admin")
          .maybeSingle();

        if (!mounted) return;

        if (error) {
          console.error("RequireAdmin: Error checking admin status:", error);
          setState("denied");
          return;
        }

        console.log("RequireAdmin: Access check result:", data);
        if (!data) {
          setState("denied");
        } else {
          setState("allowed");
        }
      } catch (err) {
        console.error("RequireAdmin: Unexpected error:", err);
        if (mounted) setState("denied");
      }
    };

    // Use getSession but also check immediate state if possible
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (mounted) {
        check(session?.user?.id);
      }
    };
    
    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      console.log("RequireAdmin: Auth state changed:", _e, session?.user?.id);
      if (mounted) check(session?.user?.id);
    });

    return () => {
      mounted = false;
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