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
      if (!userId) {
        if (mounted) setState("unauth");
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
          console.error("Error checking admin status:", error);
          setState("denied");
          return;
        }

        if (!data) {
          setState("denied");
        } else {
          setState("allowed");
        }
      } catch (err) {
        console.error("Unexpected error in RequireAdmin:", err);
        if (mounted) setState("denied");
      }
    };

    // Initial check
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) check(data.session?.user?.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
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