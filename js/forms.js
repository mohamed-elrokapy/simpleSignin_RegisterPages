// Small form helper shared by both pages: inline errors, validation timing, show/hide password.
// Passwords are only ever read to validate them. Nothing is stored, logged or sent anywhere.
(function () {
  function setError(field, message) {
    field.error.textContent = message;
    field.inputs.forEach(function (input) {
      if (message) input.setAttribute("aria-invalid", "true");
      else input.removeAttribute("aria-invalid");
    });
  }

  function check(field) {
    var message = field.validate();
    setError(field, message);
    return message === "";
  }

  /**
   * fields: [{ inputs: [HTMLElement], error: HTMLElement, validate: () => string }]
   * Validates on blur/change, then live while typing once a field has been touched,
   * and for all fields on submit (focusing the first invalid one).
   */
  function bindForm(form, fields, onValid) {
    fields.forEach(function (field) {
      var touched = false;
      field.inputs.forEach(function (input) {
        var isChoice = input.type === "radio" || input.type === "date";
        input.addEventListener(isChoice ? "change" : "blur", function () {
          touched = true;
          check(field);
        });
        input.addEventListener("input", function () {
          if (touched) check(field);
        });
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var firstInvalid = null;
      fields.forEach(function (field) {
        if (!check(field) && !firstInvalid) firstInvalid = field.inputs[0];
      });
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }
      onValid();
    });

    form.addEventListener("reset", function () {
      fields.forEach(function (field) {
        setError(field, "");
      });
    });
  }

  function bindPasswordToggles(root) {
    root.querySelectorAll("[data-toggle-password]").forEach(function (button) {
      var input = document.getElementById(button.getAttribute("data-toggle-password"));
      button.addEventListener("click", function () {
        var show = input.type === "password";
        input.type = show ? "text" : "password";
        button.textContent = show ? "Hide" : "Show";
        button.setAttribute("aria-label", show ? "Hide password" : "Show password");
      });
    });
  }

  window.Forms = { bindForm: bindForm, bindPasswordToggles: bindPasswordToggles };
})();
