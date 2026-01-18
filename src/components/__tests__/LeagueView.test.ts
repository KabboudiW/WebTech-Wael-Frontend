import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import LeagueView from "@/views/LeagueView.vue";

// Mock vue-router useRoute()
vi.mock("vue-router", () => ({
  useRoute: () => ({ params: { code: "BL1" } }),
}));

describe("LeagueView", () => {
  it("toggles between Player Stats and Match Results", async () => {
    const wrapper = mount(LeagueView, {
      global: {
        stubs: {
          RouterLink: { template: "<a><slot /></a>" },
          LeaderboardCategory: { template: "<div data-test='stats'>stats</div>" },
          LeagueResults: { template: "<div data-test='results'>results</div>" },
        },
      },
    });

    // Default: stats visible
    expect(wrapper.find("[data-test='stats']").exists()).toBe(true);
    expect(wrapper.find("[data-test='results']").exists()).toBe(false);

    // Click "Match Results" (2nd tab button)
    const buttons = wrapper.findAll("button");
    // Erwartung: 1st = Player Stats, 2nd = Match Results
    await buttons[1].trigger("click");

    expect(wrapper.find("[data-test='results']").exists()).toBe(true);
  });
});
