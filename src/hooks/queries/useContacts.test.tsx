import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  queryClient: { invalidateQueries: vi.fn() },
  refetch: vi.fn(),
  success: vi.fn(),
  error: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => mocks.queryClient,
  useQuery: () => ({
    data: [],
    isLoading: false,
    error: null,
    refetch: mocks.refetch,
    isRefetching: false,
  }),
  useMutation: () => ({}),
}));
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
vi.mock("sonner", () => ({
  toast: { success: mocks.success, error: mocks.error },
}));

import { useContacts } from "./useContacts";

describe("Sincronização de contatos sem consultas duplicadas", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.queryClient.invalidateQueries.mockResolvedValue(undefined);
    mocks.refetch.mockResolvedValue({ data: [], error: null });
  });

  it("invalida sem buscar e faz apenas uma atualização explícita", async () => {
    const { result } = renderHook(() => useContacts());
    await act(async () => { await result.current.forceRefetch(); });

    expect(mocks.queryClient.invalidateQueries).toHaveBeenCalledExactlyOnceWith({
      queryKey: ["contacts"],
      refetchType: "none",
    });
    expect(mocks.refetch).toHaveBeenCalledTimes(1);
    expect(mocks.success).toHaveBeenCalledWith(
      "Agenda e contatos sincronizados com o servidor.",
    );
  });

  it("mantém a função estável para não reiniciar o intervalo do CRM", () => {
    const { result, rerender } = renderHook(() => useContacts());
    const previous = result.current.forceRefetch;
    rerender();
    expect(result.current.forceRefetch).toBe(previous);
  });

  it("mantém a mensagem de erro quando a atualização falha", async () => {
    mocks.refetch.mockRejectedValueOnce(new Error("Falha de rede"));
    const { result } = renderHook(() => useContacts());
    await expect(result.current.forceRefetch()).rejects.toThrow("Falha de rede");
    expect(mocks.error).toHaveBeenCalledWith("Erro ao sincronizar dados: Falha de rede");
    expect(mocks.success).not.toHaveBeenCalled();
  });
});
