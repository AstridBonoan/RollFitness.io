import {
  forgotPasswordSchema,
  loginSchema,
  signupSchema,
  updatePasswordSchema,
} from "@/features/authentication/schemas/auth";

describe("authentication schemas", () => {
  it("accepts a valid login payload", () => {
    expect(
      loginSchema.safeParse({
        email: "member@rollnfitness.test",
        password: "secret-pass",
      }).success,
    ).toBe(true);
  });

  it("rejects invalid emails on login", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "secret-pass",
    });
    expect(result.success).toBe(false);
  });

  it("requires matching passwords on signup", () => {
    const result = signupSchema.safeParse({
      displayName: "Alex",
      email: "alex@rollnfitness.test",
      password: "password123",
      confirmPassword: "password999",
    });
    expect(result.success).toBe(false);
  });

  it("accepts a complete signup payload", () => {
    expect(
      signupSchema.safeParse({
        displayName: "Alex",
        email: "alex@rollnfitness.test",
        password: "password123",
        confirmPassword: "password123",
      }).success,
    ).toBe(true);
  });

  it("validates forgot-password email", () => {
    expect(
      forgotPasswordSchema.safeParse({ email: "alex@rollnfitness.test" })
        .success,
    ).toBe(true);
  });

  it("requires matching passwords on update", () => {
    const result = updatePasswordSchema.safeParse({
      password: "password123",
      confirmPassword: "different",
    });
    expect(result.success).toBe(false);
  });
});
