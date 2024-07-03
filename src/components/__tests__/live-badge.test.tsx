import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { LiveBadge } from "../live-badge";

describe("LiveBadge", () => {
  test("show string 'Live'", () => {
    render(<LiveBadge />);
    expect(screen.getByText("Live")).toBeDefined();
  });
});
