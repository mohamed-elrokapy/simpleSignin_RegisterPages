// Demo sign-in. There is no server and no account: a valid-looking form just opens the demo page.
(function () {
  var form = document.getElementById("signin-form");
  var identifier = document.getElementById("identifier");
  var password = document.getElementById("password");

  Forms.bindPasswordToggles(form);

  Forms.bindForm(
    form,
    [
      {
        inputs: [identifier],
        error: document.getElementById("identifier-error"),
        validate: function () {
          return validateIdentifier(identifier.value);
        },
      },
      {
        inputs: [password],
        error: document.getElementById("password-error"),
        validate: function () {
          return validatePassword(password.value);
        },
      },
    ],
    function () {
      // Navigate without putting any form value in the URL.
      window.location.assign(form.getAttribute("data-success-url"));
    }
  );
})();
