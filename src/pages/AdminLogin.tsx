import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Shield } from "lucide-react";

export default function AdminLogin() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const next = params.get("next") || "/crm";

  useEffect(() => {
    document.title = "Admin · Login | Patro Seguros";
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate(next, { replace: true });
    });
  }, [navigate, next]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin/login` },
        });
        if (error) throw error;
        toast({
          title: "Conta criada",
          description:
            "Conta criada. Peça a um admin existente para conceder permissão de administrador.",
        });
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate(next, { replace: true });
      }
    } catch (err: any) {
      toast({
        title: "Erro",
        description: err?.message ?? "Falha na autenticação",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main 
      className="min-h-screen flex items-center justify-center p-6" 
      style={{ backgroundColor: "#f1f5f9" }}
    >
      <div 
        className="w-full max-w-md space-y-6 rounded-2xl p-8 shadow-2xl relative z-10"
        style={{ 
          backgroundColor: "#ffffff", 
          border: "2px solid #e2e8f0",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
      >
        <header className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <Shield className="w-12 h-12" style={{ color: "#003366" }} />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#0f172a" }}>
              Patro CRM <span style={{ color: "#003366", fontWeight: 900 }}>PRO</span>
            </h1>
            <p style={{ color: "#64748b", fontWeight: 500 }}>
              {mode === "signin" ? "Acesse seu painel de gestão" : "Criar nova conta de acesso"}
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2 text-left">
            <Label htmlFor="email" className="text-sm font-semibold ml-1" style={{ color: "#334155" }}>
              E-mail de acesso
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border-slate-300 transition-all"
              style={{ 
                backgroundColor: "#ffffff", 
                color: "#0f172a",
                border: "1px solid #cbd5e1"
              }}
              placeholder="exemplo@patroseguros.com.br"
            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="password" className="text-sm font-semibold ml-1" style={{ color: "#334155" }}>
              Sua senha
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 border-slate-300 transition-all"
              style={{ 
                backgroundColor: "#ffffff", 
                color: "#0f172a",
                border: "1px solid #cbd5e1"
              }}
              placeholder="••••••••"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full h-12 text-white font-bold text-base shadow-lg transition-all active:scale-[0.98]" 
            style={{ 
              backgroundColor: "#003366",
              boxShadow: "0 10px 15px -3px rgba(0, 51, 102, 0.3)"
            }}
            disabled={loading}
          >
            {loading ? "Autenticando..." : mode === "signin" ? "Entrar no Painel" : "Confirmar Cadastro"}
          </Button>
        </form>

        <div className="pt-4" style={{ borderTop: "1px solid #f1f5f9" }}>
          <button
            type="button"
            className="w-full text-sm font-medium transition-all"
            style={{ color: "#003366" }}
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin"
              ? "Não possui uma conta? Solicitar acesso"
              : "Já possui acesso? Voltar para o login"}
          </button>
        </div>
      </div>
    </main>
  );
}