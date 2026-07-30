import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

class IntersectionObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

if (typeof window !== "undefined") {
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    value: IntersectionObserverMock,
  });
}
