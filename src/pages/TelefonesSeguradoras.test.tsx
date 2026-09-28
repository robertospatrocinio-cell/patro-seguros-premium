import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TelefonesSeguradoras from "./TelefonesSeguradoras";

describe("TelefonesSeguradoras", () => {
  it("filters insurers by text", () => {
    render(
      <MemoryRouter>
        <TelefonesSeguradoras />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText("Buscar seguradora"), { target: { value: "allianz" } });

    expect(screen.getByRole("heading", { name: "Allianz" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Porto Seguro" })).not.toBeInTheDocument();
  });
});