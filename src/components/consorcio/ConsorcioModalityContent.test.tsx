import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { trackWhatsAppClick } from "@/lib/tracking";
import { consorcioInstitutionalGuidance } from "@/data/consorcioVertical";
import { MemoryRouter } from "react-router-dom";
import ConsorcioModalityContent from "./ConsorcioModalityContent";
import { CONSORCIO_NATIONAL_PAGES } from "@/data/consorcioNacional";
import { CONSORCIO_INTENT_PAGES } from "@/data/consorcioVertical";
import { getModalityExperience } from "@/data/consorcioModalityExperience";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

vi.mock("@/components/Breadcrumb", () => ({ default: () => <nav aria-label="Breadcrumb" /> }));
vi.mock("@/lib/tracking", () => ({ trackWhatsAppClick: vi.fn(), trackCotacaoClick: vi.fn() }));
afterEach(cleanup);

const national = CONSORCIO_NATIONAL_PAGES.filter(page => page.path !== "/consorcio-servicos");
describe("Modalidades de consórcio: conteúdo e atendimento", () => {
  for (const page of national) {
    it(`${page.path}: preserva conteúdo e usa WhatsApp oficial personalizado`, () => {
      render(<MemoryRouter><ConsorcioModalityContent page={page} /></MemoryRouter>);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(page.h1);
      expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
      for (const section of page.sections) {
        expect(screen.getByRole("heading", { name: section.heading })).toBeInTheDocument();
        expect(screen.getByText(section.body)).toBeInTheDocument();
      }
      for (const faq of page.faqs) expect(screen.getByText(faq.answer)).toBeInTheDocument();
      for (const label of ["O que pode ser planejado", "Para quem pode fazer sentido", "Como funciona para o seu objetivo", "Custos e condições importantes", "Lances e contemplação"]) {
        expect(screen.getByRole("heading", { name: label })).toBeInTheDocument();
      }
      const copy = getModalityExperience(page);
      const request = screen.getAllByRole("link", { name: copy.cta, exact: true })[0];
      const url = new URL(request.getAttribute("href")!);
      expect(url.hostname).toBe("wa.me");
      expect(url.pathname).toBe(`/${WHATSAPP_NUMBER}`);
      expect(url.searchParams.get("text")).toContain(copy.message);
      expect(request).toHaveAttribute("target", "_blank");
      expect(request).toHaveAttribute("rel", "noopener noreferrer");
      expect(screen.getByRole("link", { name: "Prefiro solicitar contato pelo formulário" })).toHaveAttribute("href", "/consorcio#simulacao");
      expect(screen.getByRole("link", { name: "Comparar no simulador educativo" })).toHaveAttribute("href", "/consorcio#comparar");
      for (const item of copy.articles) expect(screen.getByRole("link", { name: item.label })).toHaveAttribute("href", item.href);
    });
  }

  for (const page of [...national, ...CONSORCIO_INTENT_PAGES]) {
    it(`${page.path}: mantém responsabilidades, fontes oficiais e jornada local`, () => {
      const local = CONSORCIO_INTENT_PAGES.some(item => item.path === page.path);
      const { container } = render(<MemoryRouter><ConsorcioModalityContent page={page} local={local} /></MemoryRouter>);
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(screen.getByText(consorcioInstitutionalGuidance.role)).toBeInTheDocument();
      expect(screen.getByText(consorcioInstitutionalGuidance.after)).toBeInTheDocument();
      for (const source of consorcioInstitutionalGuidance.sources) {
        expect(screen.getByRole("link", { name: source.label })).toHaveAttribute("href", source.href);
      }
      for (const anchor of container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
        expect(container.querySelector(anchor.getAttribute("href")!)).not.toBeNull();
      }
      const copy = getModalityExperience(page);
      const request = screen.getAllByRole("link", { name: copy.cta, exact: true })[0];
      const message = new URL(request.getAttribute("href")!).searchParams.get("text");
      expect(message).toContain(copy.message);
      if (local) expect(message).toContain("Guarulhos e região");
      vi.mocked(trackWhatsAppClick).mockClear();
      fireEvent.click(request);
      expect(trackWhatsAppClick).toHaveBeenCalledWith(`${page.whatsappOrigem}_simulacao`);
      expect(screen.getAllByRole("link", { name: "Solicitar contato pelo formulário", exact: true }).length).toBeGreaterThan(0);
      if (local) {
        const nav = screen.getByRole("navigation", { name: "Atendimento local de consórcio" });
        for (const other of CONSORCIO_INTENT_PAGES.filter(item => item.path !== page.path)) {
          expect(nav.querySelector(`a[href="${other.path}"]`)).not.toBeNull();
        }
      }
    });
  }

  it("separa veículos de motos na mensagem de atendimento", () => {
    const page = national.find(item => item.path === "/consorcio-veiculos")!;
    render(<MemoryRouter><ConsorcioModalityContent page={page} /></MemoryRouter>);
    const moto = screen.getByRole("link", { name: "Simular consórcio de moto" });
    expect(new URL(moto.getAttribute("href")!).searchParams.get("text")).toContain("simulação para uma moto");
  });

  it("mantém máquinas agrícolas como seção da URL de pesados", () => {
    const page = national.find(item => item.path === "/consorcio-pesados-maquinas")!;
    const { container } = render(<MemoryRouter><ConsorcioModalityContent page={page} /></MemoryRouter>);
    expect(container.querySelector("#maquinas-agricolas")).toBeInTheDocument();
    expect(container.querySelector("#caminhoes")).toBeInTheDocument();
    expect(screen.getByText("Posso contar com a máquina para a próxima safra?")).toBeInTheDocument();
    expect(screen.getByText("Qualquer máquina agrícola pode ser adquirida?")).toBeInTheDocument();
    const request = screen.getByRole("link", { name: "Simular consórcio de máquina agrícola" });
    expect(new URL(request.getAttribute("href")!).searchParams.get("text")).toContain("máquina agrícola");
    expect(screen.getByRole("link", { name: "Seguro Agronegócio" })).toHaveAttribute("href", "/seguro-agro");
  });

  it("trata empresa como pessoa jurídica sem nova URL", () => {
    const page = CONSORCIO_INTENT_PAGES.find(item => item.path.includes("empresarial"))!;
    render(<MemoryRouter><ConsorcioModalityContent page={page} local /></MemoryRouter>);
    expect(screen.getAllByRole("link", { name: "Conversar sobre consórcio para minha empresa", exact: true })).toHaveLength(2);
    expect(screen.getAllByText(/CNPJ, contrato social e alterações/).length).toBeGreaterThan(0);
    expect(getModalityExperience(page).bids).toContain("não assegura data de contemplação");
    expect(getModalityExperience(CONSORCIO_INTENT_PAGES[0]).cta).toBe("Solicitar simulação de consórcio");
  });
});
