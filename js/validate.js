// Pure validation helpers. No DOM access, so they can be unit tested with `node --test`.
// Every function returns an error message string, or "" when the value is valid.

var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Same shape as the original app: 11 digits, optionally grouped 3-4-4 (e.g. 010 1234 5678).
var PHONE_RE = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
var NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}' .-]*$/u;
var MIN_PASSWORD = 8;

function validateEmail(value) {
  var v = String(value || "").trim();
  if (!v) return "Enter your email address.";
  if (!EMAIL_RE.test(v)) return "Enter a valid email address, for example name@example.com.";
  return "";
}

function validatePhone(value) {
  var v = String(value || "").trim();
  if (!v) return "Enter your phone number.";
  if (!PHONE_RE.test(v)) return "Enter an 11-digit phone number, for example 010 1234 5678.";
  return "";
}

/** Sign-in accepts either an email address or a phone number. */
function validateIdentifier(value) {
  var v = String(value || "").trim();
  if (!v) return "Enter your email address or phone number.";
  if (!EMAIL_RE.test(v) && !PHONE_RE.test(v)) {
    return "Enter a valid email address or an 11-digit phone number.";
  }
  return "";
}

function validateName(value, label) {
  var v = String(value || "").trim();
  if (!v) return "Enter your " + label + ".";
  if (v.length > 50) return "Your " + label + " must be 50 characters or fewer.";
  if (!NAME_RE.test(v)) return "Your " + label + " can contain letters, spaces, apostrophes, dots and hyphens only.";
  return "";
}

function validatePassword(value) {
  var v = String(value || "");
  if (!v) return "Enter a password.";
  if (v.length < MIN_PASSWORD) return "Password must be at least " + MIN_PASSWORD + " characters.";
  return "";
}

function validateConfirm(password, confirm) {
  if (!confirm) return "Confirm your password.";
  if (password !== confirm) return "The two passwords do not match.";
  return "";
}

function validateGender(selected) {
  return selected ? "" : "Select a gender.";
}

/** value is "YYYY-MM-DD" (from <input type="date">), today is a Date. */
function validateBirthDate(value, today) {
  if (!value) return "Enter your birth date.";
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return "Enter a valid birth date.";
  var y = +m[1], mo = +m[2], d = +m[3];
  var date = new Date(Date.UTC(y, mo - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== mo - 1 || date.getUTCDate() !== d) {
    return "Enter a valid birth date.";
  }
  var now = today || new Date();
  var todayUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  if (date.getTime() > todayUtc) return "Birth date cannot be in the future.";
  if (y < 1900) return "Enter a birth year of 1900 or later.";
  return "";
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    validateEmail: validateEmail,
    validatePhone: validatePhone,
    validateIdentifier: validateIdentifier,
    validateName: validateName,
    validatePassword: validatePassword,
    validateConfirm: validateConfirm,
    validateGender: validateGender,
    validateBirthDate: validateBirthDate,
  };
}
