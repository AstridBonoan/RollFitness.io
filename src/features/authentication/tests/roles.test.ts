import { isAdminRole, isAppRole } from "@/features/authentication/lib/roles";

describe("app roles", () => {
  it("recognizes valid roles", () => {
    expect(isAppRole("member")).toBe(true);
    expect(isAppRole("admin")).toBe(true);
    expect(isAppRole("superuser")).toBe(false);
  });

  it("only treats admin as privileged", () => {
    expect(isAdminRole("admin")).toBe(true);
    expect(isAdminRole("member")).toBe(false);
    expect(isAdminRole(undefined)).toBe(false);
  });
});
