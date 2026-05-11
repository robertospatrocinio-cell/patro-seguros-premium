import { describe, it, expect } from "vitest";
import { validateEmail, validatePhone } from "./utils";

describe("validateEmail", () => {
  it("should return true for valid email addresses", () => {
    expect(validateEmail("test@example.com")).toBeTruthy();
    expect(validateEmail("user.name@domain.co.uk")).toBeTruthy();
    expect(validateEmail("user+tag@domain.com")).toBeTruthy();
  });

  it("should return false for invalid email addresses", () => {
    expect(validateEmail("invalid-email")).toBeFalsy();
    expect(validateEmail("@domain.com")).toBeFalsy();
    expect(validateEmail("user@")).toBeFalsy();
    expect(validateEmail("user@domain")).toBeFalsy();
  });
});

describe("validatePhone", () => {
  it("should return true for valid Brazilian phone numbers (10 or 11 digits)", () => {
    expect(validatePhone("(11) 99999-9999")).toBeTruthy();
    expect(validatePhone("11999999999")).toBeTruthy();
    expect(validatePhone("1144445555")).toBeTruthy();
  });

  it("should return false for invalid phone numbers", () => {
    expect(validatePhone("123456789")).toBeFalsy(); // Too short
    expect(validatePhone("119999999999")).toBeFalsy(); // Too long
    expect(validatePhone("abc")).toBeFalsy();
  });
});