import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import LeagueView from "@/views/LeagueView.vue";

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

    expect(wrapper.find("[data-test='stats']").exists()).toBe(true);
    expect(wrapper.find("[data-test='results']").exists()).toBe(false);

    const resultsBtn = wrapper
      .findAll("button")
      .find((b) => b.text().includes("Match Results"));

    expect(resultsBtn).toBeTruthy();
    await resultsBtn!.trigger("click");

    expect(wrapper.find("[data-test='results']").exists()).toBe(true);
  });
});
