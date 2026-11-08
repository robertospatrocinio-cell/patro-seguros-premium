import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AvaliarNoGoogle from "./AvaliarNoGoogle";
import { EMPRESA, GOOGLE_MAPS_URL, NAP_LINHA_1, NAP_LINHA_2 } from "@/config/empresa";
import { PATRO_SOCIAL_PROOF } from "@/lib/patroSocialProof";
import { trackInternalLinkClick } from "@/lib/tracking";

vi.mock("@/components/Header", () => ({ default: () => null }));
vi.mock("@/components/Footer", () => ({ default: () => null }));
vi.mock("@/components/PageMeta", () => ({ default: () => null }));
vi.mock("@/components/Breadcrumb", () => ({ default: () => null }));
vi.mock("@/components/FAQSchema", () => ({
  default: ({ faqs }: { faqs: { question: string; answer: string }[] }) => (
    <script type="application/json" data-testid="review-faqs">{JSON.stringify(faqs)}</script>
  ),
}));
vi.mock("@/lib/tracking", () => ({ trackInternalLinkClick: vi.fn(), trackWhatsAppClick: vi.fn() }));

afterEach(() => { cleanup(); vi.clearAllMocks(); });
const openPage = () => render(<MemoryRouter><AvaliarNoGoogle /></MemoryRouter>);

describe("Convite ético para avaliações", () => {
  it("abre o perfil cadastrado sem prometer um formulário direto e mantém rastreamento", () => {
    openPage();
    const link = screen.getByRole("link", { name: /Abrir perfil no Google Maps/ });
    expect(link).toHaveAttribute("href", GOOGLE_MAPS_URL);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByText(/O botão não abre diretamente o formulário/)).toBeInTheDocument();
    fireEvent.click(link);
    expect(trackInternalLinkClick).toHaveBeenCalledWith(expect.objectContaining({ destination: GOOGLE_MAPS_URL }));
    expect(PATRO_SOCIAL_PROOF.leaveReviewUrl).toBe(GOOGLE_MAPS_URL);
  });

  it("não pede cinco estrelas nem oferece elogios prontos para copiar", () => {
    const { container } = openPage();
    expect(container.textContent).not.toMatch(/5 estrelas|cinco estrelas|copiar avaliação|texto copiado/i);
    expect(screen.getByText(/seja positiva, neutra ou negativa/)).toBeInTheDocument();
    expect(screen.getByText(/Não pedimos uma nota específica nem oferecemos vantagens/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /copiar/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Outras formas de contato" })).toHaveAttribute("href", "/contato");
  });

  it("usa os contatos da configuração e as mesmas perguntas e respostas no conteúdo e na marcação", () => {
    const { container } = openPage();
    expect(screen.getByText(NAP_LINHA_1)).toBeInTheDocument();
    expect(screen.getByText(NAP_LINHA_2)).toBeInTheDocument();
    expect(screen.getByText(EMPRESA.horario)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: EMPRESA.telefone })).toHaveAttribute("href", `tel:${EMPRESA.telefoneE164}`);
    expect(screen.getByRole("link", { name: EMPRESA.email })).toHaveAttribute("href", `mailto:${EMPRESA.email}`);
    const faqs = JSON.parse(screen.getByTestId("review-faqs").textContent || "[]");
    expect(faqs).toHaveLength(6);
    expect(container.querySelectorAll("details")).toHaveLength(6);
    for (const faq of faqs) {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
      expect(screen.getByText(faq.answer)).toBeInTheDocument();
    }
  });
});
