type ProfileSavedBannerProps = {
  visible: boolean;
};

export function ProfileSavedBanner({ visible }: ProfileSavedBannerProps) {
  if (!visible) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="mb-8 rounded-md border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-primary"
    >
      Your profile has been saved.
    </div>
  );
}
