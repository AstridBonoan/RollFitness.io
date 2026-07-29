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

  it("shows a saved confirmation when visible", () => {
    render(<ProfileSavedBanner visible />);
    expect(screen.getByText("Your profile has been saved.")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders nothing when not visible", () => {
    const { container } = render(<ProfileSavedBanner visible={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("closes when the dismiss button is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ProfileSavedBanner visible />);

    await user.click(
      screen.getByRole("button", { name: /dismiss saved message/i }),
    );

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(replaceMock).toHaveBeenCalledWith("/profile", { scroll: false });
  });

  it("auto-dismisses after five seconds", () => {
    render(<ProfileSavedBanner visible />);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(replaceMock).toHaveBeenCalledWith("/profile", { scroll: false });
  });
});
