import { render, screen } from "@testing-library/react";

import { ProfileSavedBanner } from "@/features/user-profile/components/profile-saved-banner";

describe("ProfileSavedBanner", () => {
  it("shows a saved confirmation when visible", () => {
    render(<ProfileSavedBanner visible />);
    expect(screen.getByText("Your profile has been saved.")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders nothing when not visible", () => {
    const { container } = render(<ProfileSavedBanner visible={false} />);
    expect(container).toBeEmptyDOMElement();
  });
});
