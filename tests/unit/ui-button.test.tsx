import { render, screen } from "@testing-library/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("merges conflicting Tailwind classes", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });
});

describe("Button", () => {
  it("renders accessible button text", () => {
    render(<Button>Start session</Button>);
    expect(
      screen.getByRole("button", { name: /start session/i }),
    ).toBeInTheDocument();
  });
});
