import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { SmartLink } from "@/components/SmartLink";
import { BAIRROS_MATRIZ } from "@/data/seoLocalBairrosGuarulhos";

const SiteMap = () => {
  return (
    <InsurancePageTemplate
      title="Mapa do Site | Patro Seguros Guarulhos"
      headline="Todos os nossos serviços e coberturas em um só lugar."
      subtitle="Navegue por todas as verticais de seguros, planos de saúde e consórcios em Guarulhos."
      metaDescription="Mapa completo do site Patro Seguros. Encontre todos os produtos de seguros para você e sua empresa, além de todas as páginas de bairros atendidos em Guarulhos."
      description="Para facilitar sua navegação, consolidamos aqui todos os nossos produtos, serviços e páginas de autoridade local. Encontre o que precisa em poucos cliques."
      icon="🗺️"
      coverages={[]}
      whoNeeds={[]}
      whyPatro={[]}
      faqs={[]}

      extraSections={
        <div className="mt-12 space-y-16">
          <section>
            <h2 className="text-2xl font-bold mb-8 border-b pb-2">Seguros para Você</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <ul className="space-y-3 text-sm">
                <li><SmartLink to="/seguro-auto" className="hover:text-primary underline">Seguro Auto</SmartLink></li>
                <li><SmartLink to="/seguro-moto" className="hover:text-primary underline">Seguro Moto</SmartLink></li>
                <li><SmartLink to="/seguro-residencial" className="hover:text-primary underline">Seguro Residencial</SmartLink></li>
                <li><SmartLink to="/seguro-vida" className="hover:text-primary underline">Seguro de Vida</SmartLink></li>
              </ul>
              <ul className="space-y-3 text-sm">
                <li><SmartLink to="/seguro-viagem" className="hover:text-primary underline">Seguro Viagem</SmartLink></li>
                <li><SmartLink to="/seguro-celular" className="hover:text-primary underline">Seguro Celular</SmartLink></li>
                <li><SmartLink to="/seguro-bike" className="hover:text-primary underline">Seguro Bike</SmartLink></li>
                <li><SmartLink to="/seguro-acidentes-pessoais" className="hover:text-primary underline">Acidentes Pessoais</SmartLink></li>
              </ul>
              <ul className="space-y-3 text-sm">
                <li><SmartLink to="/plano-de-saude-guarulhos" className="hover:text-primary underline">Plano de Saúde</SmartLink></li>
                <li><SmartLink to="/plano-odontologico-guarulhos" className="hover:text-primary underline">Plano Odontológico</SmartLink></li>
                <li><SmartLink to="/plano-pet" className="hover:text-primary underline">Plano Pet</SmartLink></li>
                <li><SmartLink to="/consorcio" className="hover:text-primary underline">Consórcio</SmartLink></li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-8 border-b pb-2">Seguros para Empresas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <ul className="space-y-3 text-sm">
                <li><SmartLink to="/seguro-empresarial" className="hover:text-primary underline">Seguro Empresarial</SmartLink></li>
                <li><SmartLink to="/seguro-frota" className="hover:text-primary underline">Seguro Frota</SmartLink></li>
                <li><SmartLink to="/seguro-transporte-carga-guarulhos" className="hover:text-primary underline">Transporte de Carga</SmartLink></li>
                <li><SmartLink to="/seguro-condominio" className="hover:text-primary underline">Seguro Condomínio</SmartLink></li>
              </ul>
              <ul className="space-y-3 text-sm">
                <li><SmartLink to="/seguro-cyber" className="hover:text-primary underline">Seguro Cibernético</SmartLink></li>
                <li><SmartLink to="/seguro-rc-profissional" className="hover:text-primary underline">RC Profissional</SmartLink></li>
                <li><SmartLink to="/seguro-garantia" className="hover:text-primary underline">Seguro Garantia</SmartLink></li>
                <li><SmartLink to="/seguro-rural" className="hover:text-primary underline">Seguro Agro / Rural</SmartLink></li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-8 border-b pb-2">Presença em Guarulhos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {BAIRROS_MATRIZ.map(b => (
                <ul key={b.id} className="space-y-3 text-sm">
                  <li><SmartLink to={`/seguros-guarulhos/${b.slug}`} className="hover:text-primary underline">Seguros em {b.nome}</SmartLink></li>
                </ul>
              ))}
              <ul className="space-y-3 text-sm">
                <li><SmartLink to="/seguros-guarulhos" className="hover:text-primary underline font-bold">Tudo sobre Seguros em Guarulhos</SmartLink></li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-8 border-b pb-2">Institucional e Suporte</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <ul className="space-y-3 text-sm">
                <li><SmartLink to="/quem-somos" className="hover:text-primary underline">Quem Somos</SmartLink></li>
                <li><SmartLink to="/contato" className="hover:text-primary underline">Contato</SmartLink></li>
                <li><SmartLink to="/blog" className="hover:text-primary underline">Blog da Patro</SmartLink></li>
              </ul>
              <ul className="space-y-3 text-sm">
                <li><SmartLink to="/central-de-sinistro" className="hover:text-primary underline">Central de Sinistro</SmartLink></li>
                <li><SmartLink to="/faq" className="hover:text-primary underline">Perguntas Frequentes</SmartLink></li>
                <li><SmartLink to="/politica-privacidade" className="hover:text-primary underline">Privacidade</SmartLink></li>
              </ul>
            </div>
          </section>
        </div>
      }
    />
  );
};

export default SiteMap;
