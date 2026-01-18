import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import LeaderboardCategory from "../LeaderboardCategory.vue";

describe("LeaderboardCategory", () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    // Variante A (empfohlen, wenn verfügbar):
    // vi.stubEnv("VITE_BACKEND_BASE_URL", "https://example.com");

    // Variante B (fallback):
    (import.meta as any).env = {
      ...(import.meta as any).env,
      VITE_BACKEND_BASE_URL: "https://example.com",
    };
  });

  it("calls backend with metric/week/league/search params", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch" as any).mockResolvedValue({
      ok: true,
      json: async () => ({ rows: [] }),
    } as any);

    mount(LeaderboardCategory, {
      props: {
        title: "Test",
        metric: "goals",
        week: "2026-W03",
        league: "BL1",
        search: "haaland",
      },
    });

    await flushPromises();

    expect(fetchMock).toHaveBeenCalledTimes(1);

    const url = String(fetchMock.mock.calls[0][0]);
    expect(url).toContain("https://example.com/api/weekly/top?");
    expect(url).toContain("metric=goals");
    expect(url).toContain("week=2026-W03");
    expect(url).toContain("league=BL1");
    expect(url).toContain("search=haaland");
  });
});

