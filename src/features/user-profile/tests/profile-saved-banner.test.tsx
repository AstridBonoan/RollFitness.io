import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ProfileSavedBanner } from "@/features/user-profile/components/profile-saved-banner";

const replaceMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
}));

describe("ProfileSavedBanner", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    replaceMock.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("shows a saved confirmation when mounted", () => {
    render(<ProfileSavedBanner />);
    expect(screen.getByText("Your profile has been saved.")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("clears the saved query when dismiss is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ProfileSavedBanner />);

    await user.click(
      screen.getByRole("button", { name: /dismiss saved message/i }),
    );

    expect(replaceMock).toHaveBeenCalledWith("/profile", { scroll: false });
  });

  it("auto-clears the saved query after five seconds", () => {
    render(<ProfileSavedBanner />);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(replaceMock).toHaveBeenCalledWith("/profile", { scroll: false });
  });
});
