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
    
    // Garantir que elementos persistentes do index.html não cubram o login
    const persistentBg = document.getElementById('persistent-hero-bg');
    if (persistentBg) {
      persistentBg.style.display = 'none';
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate(next, { replace: true });
    });

    return () => {
      if (persistentBg) {
        persistentBg.style.display = '';
      }
    };
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
      className="min-h-screen flex items-center justify-center p-6 relative" 
      style={{ backgroundColor: "#f8fafc", zIndex: 50 }}
    >
      <div 
        className="w-full max-w-md space-y-6 rounded-2xl p-8 shadow-2xl relative z-50 border-4"
        style={{ 
          backgroundColor: "#ffffff", 
          borderColor: "#003366",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        }}
      >
        <header className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <Shield className="w-16 h-16" style={{ color: "#003366" }} />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight" style={{ color: "#003366" }}>
              Patro CRM PRO
            </h1>
            <p className="text-lg font-bold" style={{ color: "#1e293b" }}>
              {mode === "signin" ? "Área Restrita: Login" : "Área Restrita: Cadastro"}
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 text-left">
            <Label htmlFor="email" className="text-base font-bold ml-1" style={{ color: "#0f172a" }}>
              E-mail de acesso
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 border-2 transition-all text-lg font-medium"
              style={{ 
                backgroundColor: "#f1f5f9", 
                color: "#0f172a",
                borderColor: "#94a3b8"
              }}
              placeholder="seu-email@patroseguros.com.br"
            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="password" className="text-base font-bold ml-1" style={{ color: "#0f172a" }}>
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
              className="h-14 border-2 transition-all text-lg font-medium"
              style={{ 
                backgroundColor: "#f1f5f9", 
                color: "#0f172a",
                borderColor: "#94a3b8"
              }}
              placeholder="••••••••"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full h-14 text-white font-black text-xl shadow-xl transition-all active:scale-[0.98] border-b-4 border-black/20" 
            style={{ 
              backgroundColor: "#003366"
            }}
            disabled={loading}
          >
            {loading ? "CARREGANDO..." : mode === "signin" ? "ENTRAR NO CRM" : "CRIAR CONTA"}
          </Button>
        </form>

        <div className="pt-6" style={{ borderTop: "2px solid #e2e8f0" }}>
          <button
            type="button"
            className="w-full text-base font-bold underline hover:no-underline transition-all"
            style={{ color: "#003366" }}
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin"
              ? "Ainda não tem acesso? Clique aqui"
              : "Já tem acesso? Clique para entrar"}
          </button>
        </div>
      </div>
      
      {/* Overlay de segurança para garantir que nada do fundo apareça */}
      <div className="fixed inset-0 bg-slate-50 -z-10"></div>
    </main>
  );
}