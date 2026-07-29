"use client";

import { useId, useState } from "react";

import { ProfileAvatar } from "@/features/user-profile/components/profile-avatar";
import { AVATAR_MAX_BYTES } from "@/features/user-profile/lib/avatar";
import { Label } from "@/components/ui/label";

type AvatarUploadFieldProps = {
  displayName?: string | null;
  avatarUrl?: string | null;
};

export function AvatarUploadField({
  displayName,
  avatarUrl,
}: AvatarUploadFieldProps) {
  const inputId = useId();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [removeChecked, setRemoveChecked] = useState(false);

  const shownUrl = removeChecked ? null : (previewUrl ?? avatarUrl);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-foreground">Profile picture</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          JPG, PNG, WEBP, or GIF up to 2 MB.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <ProfileAvatar
          name={displayName}
          avatarUrl={shownUrl}
          size="lg"
        />

        <div className="space-y-3">
          <div>
            <Label htmlFor={inputId}>Upload photo</Label>
            <input
              id={inputId}
              name="avatar"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="mt-2 block w-full max-w-xs text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-sm file:font-medium file:text-secondary-foreground hover:file:bg-secondary/80"
              onChange={(event) => {
                const file = event.target.files?.[0];
                setRemoveChecked(false);

                if (!file) {
                  setPreviewUrl(null);
                  return;
                }

                if (file.size > AVATAR_MAX_BYTES) {
                  setPreviewUrl(null);
                  return;
                }

                setPreviewUrl(URL.createObjectURL(file));
              }}
            />
          </div>

          {avatarUrl ? (
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                name="removeAvatar"
                value="true"
                checked={removeChecked}
                onChange={(event) => {
                  setRemoveChecked(event.target.checked);
                  if (event.target.checked) {
                    setPreviewUrl(null);
                  }
                }}
                className="size-4 accent-[var(--primary)]"
              />
              Remove current photo
            </label>
          ) : null}
        </div>
      </div>
    </div>
  );
}
