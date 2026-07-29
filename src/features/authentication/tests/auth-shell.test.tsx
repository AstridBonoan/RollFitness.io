import { render, screen } from "@testing-library/react";

import { AuthShell } from "@/features/authentication/components/auth-shell";

describe("AuthShell", () => {
  it("renders landmark content and brand link", () => {
    render(
      <AuthShell title="Welcome back" description="Sign in to continue.">
        <p>Form goes here</p>
      </AuthShell>,
    );

    expect(
      screen.getByRole("link", { name: /^RollnFitness$/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Welcome back" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
