import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

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
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
      <div className="w-full max-w-md space-y-6 border-2 border-primary/20 rounded-2xl p-8 shadow-2xl bg-white relative z-10">
        <header className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <Shield className="w-12 h-12 text-primary" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Patro CRM <span className="text-primary font-black">PRO</span>
            </h1>
            <p className="text-slate-500 font-medium">
              {mode === "signin" ? "Acesse seu painel de gestão" : "Criar nova conta de acesso"}
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">
              E-mail de acesso
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="exemplo@patroseguros.com.br"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-slate-700 ml-1">
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
              className="h-12 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="••••••••"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-bold text-base shadow-lg shadow-primary/20 transition-all active:scale-[0.98]" 
            disabled={loading}
          >
            {loading ? "Autenticando..." : mode === "signin" ? "Entrar no Painel" : "Confirmar Cadastro"}
          </Button>
        </form>

        <div className="pt-4 border-t border-slate-100">
          <button
            type="button"
            className="w-full text-sm font-medium text-primary hover:underline transition-all"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin"
              ? "Não possui uma conta? Solicitar acesso"
              : "Já possui acesso? Voltar para o login"}
          </button>
        </div>
      </div>
      
      {/* Elementos decorativos de fundo para garantir contraste */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,51,102,0.05)_0%,rgba(255,255,255,0)_100%)] pointer-events-none"></div>
    </main>
  );
}