import blogSeguroAuto from "@/assets/blog/blog-seguro-auto.webp";
import blogSeguroResidencial from "@/assets/blog/blog-seguro-residencial.webp";
import blogPlanoSaude from "@/assets/blog/blog-plano-saude.webp";
import blogSeguroEmpresarial from "@/assets/blog/blog-seguro-empresarial.webp";
import blogAgronegocio from "@/assets/blog/blog-agronegocio.webp";
import blogSeguroVida from "@/assets/blog/blog-seguro-vida.webp";
import blogRC from "@/assets/blog/blog-rc.webp";
import blogSeguroFianca from "@/assets/blog/blog-seguro-fianca.webp";
import blogSeguroFrota from "@/assets/blog/blog-seguro-frota.webp";
import blogSeguroMoto from "@/assets/blog/blog-seguro-moto.webp";
import blogSeguroViagem from "@/assets/blog/blog-seguro-viagem.webp";
import blogSeguroCondominio from "@/assets/blog/blog-seguro-condominio.webp";
import blogSeguroCyber from "@/assets/blog/blog-seguro-cyber.webp";
import blogPrevidencia from "@/assets/blog/blog-previdencia.webp";
import blogSeguroCelular from "@/assets/blog/blog-seguro-celular.webp";
import blogSeguroTransporte from "@/assets/blog/blog-seguro-transporte.webp";
import blogSeguroEngenharia from "@/assets/blog/blog-seguro-engenharia.webp";
import blogSeguroOdonto from "@/assets/blog/blog-seguro-odonto.webp";
import blogAcidentesPessoais from "@/assets/blog/blog-acidentes-pessoais.webp";
import blogSeguroImobiliario from "@/assets/blog/blog-seguro-imobiliario.webp";
import blogConsorcio from "@/assets/blog/blog-consorcio.webp";
import blogDicas from "@/assets/blog/blog-dicas.webp";
import blogSeguroGalpoes from "@/assets/blog/blog-seguro-galpoes.webp";
import blogRCEventos from "@/assets/blog/blog-rc-eventos.webp";

// Map each article slug to its specific image
export const blogImageMap: Record<string, string> = {
  // Seguro Auto
  "quanto-custa-seguro-auto": blogSeguroAuto,
  "seguro-auto-vale-a-pena": blogSeguroAuto,
  "seguro-auto-7-erros": blogSeguroAuto,
  "como-acionar-seguro-auto": blogSeguroAuto,
  "cobertura-vidros-retrovisores-farois-seguro-auto": blogSeguroAuto,
  "seguro-auto-premium-diferenciais": blogSeguroAuto,
  "seguro-carta-verde-mercosul": blogSeguroAuto,
  "carros-mais-roubados-furtados-sp-2025": blogSeguroAuto,
  "5-acoes-apos-acidente-veicular": blogSeguroAuto,
  "5-dicas-baratear-seguro-auto": blogSeguroAuto,
  "seguro-veiculos-blindados": blogSeguroAuto,

  // Seguro Residencial
  "o-que-seguro-residencial-cobre": blogSeguroResidencial,
  "coberturas-assistencia-24h-seguro-residencial": blogSeguroResidencial,

  // Planos de Saúde
  "quanto-custa-plano-de-saude": blogPlanoSaude,
  "melhor-plano-saude-guarulhos": blogPlanoSaude,
  "plano-saude-individual-vs-empresarial": blogPlanoSaude,
  "saude-mental-seguros-protecao": blogPlanoSaude,
  "plano-saude-empresarial-pme": blogPlanoSaude,

  // Seguro Empresarial
  "seguro-empresarial-o-que-cobre": blogSeguroEmpresarial,
  "como-escolher-seguro-empresa": blogSeguroEmpresarial,
  "seguro-cobertura-lucros-cessantes": blogSeguroEmpresarial,

  // Agronegócio
  "seguro-para-tratores": blogAgronegocio,
  "seguro-para-colheitadeiras": blogAgronegocio,
  "seguro-rural-como-funciona": blogAgronegocio,
  "seguro-agricola-contra-granizo": blogAgronegocio,
  "3-erros-produtor-rural-seguro-maquinas": blogAgronegocio,
  "penhor-rural-seguro-maquinas-agricolas": blogAgronegocio,
  "seguro-pivo-central-equipamentos-irrigacao": blogAgronegocio,

  // Dicas
  "7-seguros-proteger-familia": blogDicas,
  "como-funciona-cotacao-seguros": blogDicas,
  "dicas-evitar-sinistros": blogDicas,
  "seguros-contra-alagamentos": blogDicas,

  // Seguro Vida
  "seguro-vida-por-que-ter": blogSeguroVida,

  // Seguro Fiança
  "seguro-fianca-vs-caucao": blogSeguroFianca,
  "fianca-locaticia-guia-inquilinos-proprietarios": blogSeguroFianca,

  // RC
  "o-que-e-responsabilidade-civil": blogRC,
  "rc-clinicas-estetica": blogRC,
  "seguro-rc-medicos": blogRC,
  "rc-geral-profissional-do-diferencas": blogRC,
  "seguro-rc-eventos-exposicoes": blogRCEventos,

  // Seguro Frota
  "como-proteger-frota": blogSeguroFrota,

  // Seguro Moto
  "seguro-moto-vale-a-pena": blogSeguroMoto,

  // Seguro Viagem
  "seguro-viagem-internacional": blogSeguroViagem,

  // Seguro Condomínio
  "seguro-condominio-obrigatorio": blogSeguroCondominio,
  "seguro-condominio-guia-completo": blogSeguroCondominio,
  "seguro-condominio-responsabilidades-sindico": blogSeguroCondominio,

  // Seguro Cyber
  "seguro-cyber-empresas": blogSeguroCyber,

  // Previdência
  "previdencia-privada-vgbl-pgbl": blogPrevidencia,

  // Seguro Celular
  "seguro-celular-como-contratar": blogSeguroCelular,

  // Seguro Transporte
  "seguro-transporte-cargas": blogSeguroTransporte,

  // Seguro Engenharia
  "seguro-engenharia-obras": blogSeguroEngenharia,

  // Seguro Odonto
  "seguro-odontologico-coberturas": blogSeguroOdonto,

  // Acidentes Pessoais
  "seguro-acidentes-pessoais-passageiros-uber-vans": blogAcidentesPessoais,

  // Seguro Imobiliário
  "beneficios-seguro-imobiliario": blogSeguroImobiliario,

  // Consórcio
  "consorcio-imoveis-casa-propria": blogConsorcio,

  // Galpões
  "seguro-galpoes-industriais-guia": blogSeguroGalpoes,
};

export const getArticleImage = (slug: string): string => {
  return blogImageMap[slug] || blogDicas;
};
