import {
  buildExerciseMediaPath,
  validateExerciseImageFile,
  validateExerciseVideoFile,
} from "@/features/admin/lib/exercise-media";

describe("exercise media validation", () => {
  it("accepts a normal JPEG photo", () => {
    const file = new File([new Uint8Array(100)], "demo.jpg", {
      type: "image/jpeg",
    });
    expect(validateExerciseImageFile(file)).toBeNull();
  });

  it("rejects oversized photos", () => {
    const file = new File([new Uint8Array(6 * 1024 * 1024)], "big.jpg", {
      type: "image/jpeg",
    });
    expect(validateExerciseImageFile(file)).toMatch(/5 MB/i);
  });

  it("accepts mp4 video", () => {
    const file = new File([new Uint8Array(100)], "demo.mp4", {
      type: "video/mp4",
    });
    expect(validateExerciseVideoFile(file)).toBeNull();
  });

  it("builds stable storage paths from slug", () => {
    expect(buildExerciseMediaPath("seated-row-band", "photo", "image/png")).toBe(
      "seated-row-band/photo.png",
    );
    expect(buildExerciseMediaPath("seated-row-band", "video", "video/mp4")).toBe(
      "seated-row-band/video.mp4",
    );
  });
});
