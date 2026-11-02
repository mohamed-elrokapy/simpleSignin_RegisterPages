const test = require("node:test");
const assert = require("node:assert/strict");
const v = require("../js/validate.js");

test("email: accepts normal addresses, including long TLDs the old regex rejected", () => {
  assert.equal(v.validateEmail("name@example.com"), "");
  assert.equal(v.validateEmail("first.last+tag@sub.example.tech"), "");
  assert.equal(v.validateEmail("a@b.info"), "");
});

test("email: rejects empty and malformed values", () => {
  for (const bad of ["", "   ", "plain", "a@b", "a@b.c", "a b@c.com", "@c.com", "a@@c.com"]) {
    assert.notEqual(v.validateEmail(bad), "", JSON.stringify(bad));
  }
});

test("phone: accepts 11 digits with common separators", () => {
  for (const ok of ["01012345678", "010 1234 5678", "010-1234-5678", "(010) 1234.5678"]) {
    assert.equal(v.validatePhone(ok), "", ok);
  }
});

test("phone: rejects wrong length and letters", () => {
  for (const bad of ["", "0101234567", "010123456789", "abc12345678", "010 1234 567x"]) {
    assert.notEqual(v.validatePhone(bad), "", JSON.stringify(bad));
  }
});

test("identifier: accepts email or phone, rejects everything else", () => {
  assert.equal(v.validateIdentifier("name@example.com"), "");
  assert.equal(v.validateIdentifier("010 1234 5678"), "");
  assert.notEqual(v.validateIdentifier(""), "");
  assert.notEqual(v.validateIdentifier("hello"), "");
});

test("name: letters from any script are fine, digits are not", () => {
  assert.equal(v.validateName("Mohamed", "first name"), "");
  assert.equal(v.validateName("محمد", "first name"), "");
  assert.equal(v.validateName("O'Brien-Smith Jr.", "last name"), "");
  assert.notEqual(v.validateName("R2D2", "first name"), "");
  assert.notEqual(v.validateName("  ", "first name"), "");
  assert.notEqual(v.validateName("x".repeat(51), "first name"), "");
});

test("password: minimum length 8, and confirmation must match", () => {
  assert.notEqual(v.validatePassword(""), "");
  assert.notEqual(v.validatePassword("1234567"), "");
  assert.equal(v.validatePassword("12345678"), "");
  assert.notEqual(v.validateConfirm("abcdefgh", ""), "");
  assert.notEqual(v.validateConfirm("abcdefgh", "abcdefgH"), "");
  assert.equal(v.validateConfirm("abcdefgh", "abcdefgh"), "");
});

test("gender must be selected", () => {
  assert.notEqual(v.validateGender(false), "");
  assert.equal(v.validateGender(true), "");
});

test("birth date: rejects empty, impossible, future and pre-1900 dates", () => {
  const today = new Date(2026, 10, 2); // 2 Nov 2026
  assert.equal(v.validateBirthDate("2000-02-29", today), "");
  assert.equal(v.validateBirthDate("2026-11-02", today), "");
  assert.notEqual(v.validateBirthDate("", today), "");
  assert.notEqual(v.validateBirthDate("2001-02-29", today), "");
  assert.notEqual(v.validateBirthDate("2026-11-03", today), "");
  assert.notEqual(v.validateBirthDate("1899-12-31", today), "");
  assert.notEqual(v.validateBirthDate("not-a-date", today), "");
});
