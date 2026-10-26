import { describe, expect, it } from "vitest";
import appSource from "../App.tsx?raw";
import {
  cidadesNacionais,
  cidadeBySlug,
  cidadePath,
  estadosDaRegiao,
  estadosNacionais,
  estadoPath,
  regioesNacionais,
  regiaoPath,
} from "./atendimentoNacional";

// Referências geográficas revisadas; não representam escritórios ou carteira de clientes.
const cidadesPorUf: Record<string, string[]> = {
  PR: ["Curitiba", "Londrina", "Maringá", "Cascavel", "Ponta Grossa", "Toledo"],
  SC: ["Florianópolis", "Joinville", "Blumenau", "Chapecó", "Itajaí"],
  RS: ["Porto Alegre", "Caxias do Sul", "Passo Fundo", "Santa Maria", "Cruz Alta"],
  SP: ["Campinas", "Ribeirão Preto", "Sorocaba", "São José dos Campos", "Piracicaba", "Bauru", "Santos"],
  MG: ["Belo Horizonte", "Uberlândia", "Uberaba", "Patos de Minas", "Montes Claros"],
  RJ: ["Rio de Janeiro", "Niterói", "Campos dos Goytacazes", "Volta Redonda"],
  ES: ["Vitória", "Serra", "Linhares", "Cachoeiro de Itapemirim"],
  MT: ["Cuiabá", "Rondonópolis", "Sinop", "Sorriso", "Lucas do Rio Verde", "Primavera do Leste"],
  MS: ["Campo Grande", "Dourados", "Três Lagoas", "Maracaju"],
  GO: ["Goiânia", "Rio Verde", "Jataí", "Anápolis", "Cristalina"],
  DF: ["Brasília"],
  BA: ["Salvador", "Luís Eduardo Magalhães", "Barreiras", "Feira de Santana", "Juazeiro"],
  MA: ["São Luís", "Balsas", "Imperatriz"],
  PI: ["Teresina", "Uruçuí", "Bom Jesus"],
  PE: ["Recife", "Petrolina", "Caruaru"],
  CE: ["Fortaleza", "Juazeiro do Norte", "Sobral"],
  RN: ["Natal", "Mossoró"],
  PB: ["João Pessoa", "Campina Grande"],
  AL: ["Maceió", "Arapiraca"],
  SE: ["Aracaju", "Itabaiana"],
  TO: ["Palmas", "Araguaína", "Gurupi", "Porto Nacional"],
  PA: ["Belém", "Paragominas", "Marabá", "Santarém"],
  RO: ["Porto Velho", "Vilhena", "Ji-Paraná"],
  AM: ["Manaus"],
  AC: ["Rio Branco"],
  RR: ["Boa Vista"],
  AP: ["Macapá"],
};

const ufsPorRegiao: Record<string, string[]> = {
  sul: ["PR", "SC", "RS"],
  sudeste: ["SP", "MG", "RJ", "ES"],
  "centro-oeste": ["MT", "MS", "GO", "DF"],
  nordeste: ["BA", "MA", "PI", "PE", "CE", "RN", "PB", "AL", "SE"],
  norte: ["TO", "PA", "RO", "AM", "AC", "RR", "AP"],
};

describe("Atendimento nacional: geografia e páginas publicadas", () => {
  it("inclui as 27 UFs sem duplicação, nas cinco regiões corretas", () => {
    expect(estadosNacionais).toHaveLength(27);
    expect(new Set(estadosNacionais.map((e) => e.uf)).size).toBe(27);
    expect(new Set(estadosNacionais.map((e) => e.slug)).size).toBe(27);
    expect(regioesNacionais.map((r) => r.slug).sort()).toEqual(Object.keys(ufsPorRegiao).sort());
    for (const [regiao, ufs] of Object.entries(ufsPorRegiao)) {
      expect(estadosDaRegiao(regiao).map((e) => e.uf).sort()).toEqual([...ufs].sort());
    }
  });

  it("mantém as 92 cidades de referência vinculadas à UF correta", () => {
    expect(cidadesNacionais).toHaveLength(92);
    expect(new Set(cidadesNacionais.map((c) => c.slug)).size).toBe(92);
    for (const estado of estadosNacionais) {
      expect(estado.cidades).toEqual(cidadesPorUf[estado.uf]);
      expect(estado.perfil.trim().length).toBeGreaterThan(40);
    }
    for (const cidade of cidadesNacionais) {
      expect(cidade.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(cidade.slug.endsWith(`-${cidade.estado.uf.toLowerCase()}`)).toBe(true);
      expect(cidadeBySlug(cidade.slug)).toBe(cidade);
    }
  });

  it("mantém uma rota registrada para cada região, UF e cidade listada", () => {
    for (const regiao of regioesNacionais) {
      expect(appSource).toContain(`path="${regiaoPath(regiao.slug)}" element={<SeguroRegiaoEstado regiaoSlug="${regiao.slug}"`);
    }
    for (const estado of estadosNacionais) {
      expect(appSource).toContain(`path="${estadoPath(estado.slug)}" element={<SeguroRegiaoEstado estadoSlug="${estado.slug}"`);
    }
    for (const cidade of cidadesNacionais) {
      expect(appSource).toContain(`path="${cidadePath(cidade.slug)}" element={<SeguroRegiaoEstado cidadeSlug="${cidade.slug}"`);
    }
  });

  it("distingue o DF dos estados e preserva o endereço histórico de São Paulo", () => {
    expect(estadosNacionais.find((e) => e.uf === "DF")?.perfil).toContain("não em municípios");
    expect(estadosNacionais.find((e) => e.uf === "SP")).toMatchObject({
      nome: "São Paulo",
      slug: "sao-paulo-interior",
    });
    expect(cidadeBySlug("cidade-inexistente-sp")).toBeUndefined();
  });
});
