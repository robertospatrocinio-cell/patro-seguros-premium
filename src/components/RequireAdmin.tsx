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
      console.log("RequireAdmin: Verificando acesso para:", userId);
      if (!userId) {
        if (mounted) {
          console.log("RequireAdmin: Sem ID de usuário, redirecionando para login");
          setState("unauth");
        }
        return;
      }

      try {
        // Busca direta para evitar problemas de cache/permissão momentânea
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId)
          .eq("role", "admin")
          .maybeSingle();

        if (!mounted) return;

        if (error) {
          console.error("RequireAdmin: Erro ao consultar privilégios:", error);
          // Se houver erro de rede/banco, tentamos novamente uma vez ou negamos
          setState("denied");
          return;
        }

        console.log("RequireAdmin: Resultado da verificação:", data);
        if (data && data.role === "admin") {
          setState("allowed");
        } else {
          console.warn("RequireAdmin: Usuário logado mas sem permissão de admin");
          setState("denied");
        }
      } catch (err) {
        console.error("RequireAdmin: Erro inesperado:", err);
        if (mounted) setState("denied");
      }
    };

    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (mounted) {
          if (session) {
            await check(session.user.id);
          } else {
            setState("unauth");
          }
        }
      } catch (err) {
        console.error("RequireAdmin: Erro ao obter sessão inicial:", err);
        if (mounted) setState("unauth");
      }
    };
    
    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("RequireAdmin: Mudança de estado de autenticação:", event);
      if (!mounted) return;
      
      if (session?.user) {
        await check(session.user.id);
      } else {
        setState("unauth");
      }
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