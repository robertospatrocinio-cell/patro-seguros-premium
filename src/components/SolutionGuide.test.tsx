import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SolutionGuide from "./SolutionGuide";

describe("SolutionGuide", () => {
  it("prefills a supported insurance type without submitting anything", () => {
    const onSelectInsuranceType = vi.fn();
    render(
      <MemoryRouter>
        <SolutionGuide onSelectInsuranceType={onSelectInsuranceType} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Seguro Auto" }));

    expect(onSelectInsuranceType).toHaveBeenCalledOnce();
    expect(onSelectInsuranceType).toHaveBeenCalledWith("Auto");
  });

  it("changes profiles and maps app protections to Seguro Uber / APP", () => {
    const onSelectInsuranceType = vi.fn();
    render(
      <MemoryRouter>
        <SolutionGuide onSelectInsuranceType={onSelectInsuranceType} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("tab", { name: "Motorista de App / Uber" }));
    fireEvent.click(screen.getByRole("button", { name: /Cobertura para passageiros/ }));

    expect(onSelectInsuranceType).toHaveBeenCalledWith("Uber");
  });
});