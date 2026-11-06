import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import PetPlanMoments from "./PetPlanMoments";
import { trackCotacaoClick } from "@/lib/tracking";

vi.mock("@/lib/tracking", () => ({ trackCotacaoClick: vi.fn() }));
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Momentos com pets", () => {
  it("mostra tutores com gato e cachorro sem apresentar as fotos como depoimentos", () => {
    render(<PetPlanMoments />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Tem amor nos pequenos momentos");
    const photos = screen.getAllByRole("img");
    expect(photos).toHaveLength(2);
    expect(photos[0]).toHaveAccessibleName(/Tutor abraça seu gato/);
    expect(photos[1]).toHaveAccessibleName(/Pais e criança/);
    for (const photo of photos) {
      expect(photo).toHaveAttribute("loading", "lazy");
      expect(photo).toHaveAttribute("width", "1536");
      expect(photo).toHaveAttribute("height", "1024");
      expect(photo.getAttribute("src")).toMatch(/^\/images\/plano-pet-/);
    }
    expect(screen.getByText("Imagens ilustrativas.")).toBeInTheDocument();
  });

  it("leva ao formulário existente e registra o interesse em comparar opções", () => {
    render(<PetPlanMoments />);
    const cta = screen.getByRole("link", { name: "Ver opções para meu pet" });
    expect(cta).toHaveAttribute("href", "#opcoes-plano-pet");
    fireEvent.click(cta);
    expect(trackCotacaoClick).toHaveBeenCalledWith("plano-pet:momentos", {
      origin: "plano-pet-momentos",
      insuranceType: "Plano Pet (Petlove)",
    });
  });
});
