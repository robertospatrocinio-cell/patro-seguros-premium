import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-lg mb-4 text-primary">Patro Corretora de Seguros</h3>
            <p className="text-sm text-muted-foreground mb-4">
              A melhor corretora de seguros de Guarulhos. Proteção inteligente para você, sua família e sua empresa.
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              www.patroseguros.com.br
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/patroseguros" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-base">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/patroseguros" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-base">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/patro-seguros" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-base">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/sobre" className="text-muted-foreground hover:text-primary transition-base">Sobre</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-base">Blog</Link></li>
              <li><Link to="/parceiros" className="text-muted-foreground hover:text-primary transition-base">Seguradoras</Link></li>
              <li><Link to="/indique-um-amigo" className="text-muted-foreground hover:text-primary transition-base">Indique um Amigo</Link></li>
              <li><Link to="/cotacao" className="text-muted-foreground hover:text-primary transition-base">Cotação</Link></li>
              <li><Link to="/contato" className="text-muted-foreground hover:text-primary transition-base">Contato</Link></li>
            </ul>
          </div>

          {/* Seguros */}
          <div>
            <h4 className="font-semibold mb-4">Seguros</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/seguro-auto" className="text-muted-foreground hover:text-primary transition-base">Seguro Auto</Link></li>
              <li><Link to="/seguro-vida" className="text-muted-foreground hover:text-primary transition-base">Seguro de Vida</Link></li>
              <li><Link to="/seguro-residencial" className="text-muted-foreground hover:text-primary transition-base">Seguro Residencial</Link></li>
              <li><Link to="/seguro-empresarial" className="text-muted-foreground hover:text-primary transition-base">Seguro Empresarial</Link></li>
              <li><Link to="/planos-de-saude" className="text-muted-foreground hover:text-primary transition-base">Planos de Saúde</Link></li>
              <li><Link to="/seguro-frota" className="text-muted-foreground hover:text-primary transition-base">Seguro de Frota</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Av. Salgado Filho, 2120 - Sala 219<br />Guarulhos/SP</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:1151997500" className="text-muted-foreground hover:text-primary transition-base">
                  (11) 5199-7500
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:contato@patroseguros.com.br" className="text-muted-foreground hover:text-primary transition-base">
                  contato@patroseguros.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Patro Corretora de Seguros. Todos os direitos reservados.</p>
            <div className="flex gap-4">
              <Link to="/privacidade" className="hover:text-primary transition-base">Política de Privacidade</Link>
              <Link to="/termos" className="hover:text-primary transition-base">Termos de Uso</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
