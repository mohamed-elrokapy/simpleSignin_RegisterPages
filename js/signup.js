// Demo sign-up. Nothing is sent or saved: a valid form just opens the demo page.
(function () {
  var form = document.getElementById("signup-form");
  var $ = function (id) {
    return document.getElementById(id);
  };

  var first = $("first-name");
  var last = $("last-name");
  var email = $("email");
  var phone = $("phone");
  var password = $("password");
  var confirmInput = $("confirm-password");
  var male = $("gender-male");
  var female = $("gender-female");
  var birth = $("birth-date");

  // The birth date cannot be in the future.
  var now = new Date();
  var pad = function (n) {
    return String(n).padStart(2, "0");
  };
  birth.max = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());

  Forms.bindPasswordToggles(form);

  var passwordField = {
    inputs: [password],
    error: $("password-error"),
    validate: function () {
      return validatePassword(password.value);
    },
  };
  var confirmField = {
    inputs: [confirmInput],
    error: $("confirm-password-error"),
    validate: function () {
      return validateConfirm(password.value, confirmInput.value);
    },
  };

  Forms.bindForm(
    form,
    [
      { inputs: [first], error: $("first-name-error"), validate: function () { return validateName(first.value, "first name"); } },
      { inputs: [last], error: $("last-name-error"), validate: function () { return validateName(last.value, "last name"); } },
      { inputs: [email], error: $("email-error"), validate: function () { return validateEmail(email.value); } },
      { inputs: [phone], error: $("phone-error"), validate: function () { return validatePhone(phone.value); } },
      passwordField,
      confirmField,
      { inputs: [male, female], error: $("gender-error"), validate: function () { return validateGender(male.checked || female.checked); } },
      { inputs: [birth], error: $("birth-date-error"), validate: function () { return validateBirthDate(birth.value, new Date()); } },
    ],
    function () {
      window.location.assign(form.getAttribute("data-success-url"));
    }
  );

  // Editing the password should re-check an already-filled confirmation field.
  password.addEventListener("input", function () {
    if (confirmInput.value) {
      var message = confirmField.validate();
      confirmField.error.textContent = message;
      if (message) confirmInput.setAttribute("aria-invalid", "true");
      else confirmInput.removeAttribute("aria-invalid");
    }
  });
})();
