import {
  buildAvatarObjectPath,
  getAvatarExtension,
  validateAvatarFile,
} from "@/features/user-profile/lib/avatar";

describe("avatar helpers", () => {
  it("maps mime types to extensions", () => {
    expect(getAvatarExtension("image/jpeg")).toBe("jpg");
    expect(getAvatarExtension("image/png")).toBe("png");
    expect(getAvatarExtension("application/pdf")).toBeNull();
  });

  it("builds a user-scoped object path", () => {
    expect(buildAvatarObjectPath("user-123", "image/webp")).toBe(
      "user-123/avatar.webp",
    );
  });

  it("rejects oversized files", () => {
    const file = new File([new Uint8Array(3 * 1024 * 1024)], "big.png", {
      type: "image/png",
    });
    expect(validateAvatarFile(file)).toMatch(/2 MB/i);
  });

  it("accepts a valid image file", () => {
    const file = new File([new Uint8Array(128)], "avatar.jpg", {
      type: "image/jpeg",
    });
    expect(validateAvatarFile(file)).toBeNull();
  });
});
