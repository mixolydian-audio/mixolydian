import { describe, expect, it, vi } from "vitest";
import { createProxyStore } from "./store";

describe("store", () => {
  it("should allow attaching listeners to a key", () => {
    const store = createProxyStore();
    const listener = vi.fn();
    store.subscribe("foo", listener);
    store.set("foo", 1);
    expect(listener).toBeCalledWith(1);
  });
});
