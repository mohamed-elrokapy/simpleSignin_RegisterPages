let invalid_user = document.querySelector("h2");
let email_phone_input = document.querySelector("#email-phonenumber-input");
let password_input = document.querySelector("#password-input");
let showpassword_input = document.querySelector("#checkbox-input");
let passwordinfo = document.querySelector("h4");
let phonevalidation = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
let emailvalidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
function submitfunction() {
  // email and phone number validation*************************************************************************
  email_phone_input.value = email_phone_input.value.trim();
  if (email_phone_input.value == "") {
    invalid_user.innerHTML = "invalid user name or password";
    invalid_user.style.cssText =
      "font-size :15px ; color:red; text-align :center ";
    return false;
  }
  if (
    !(
      emailvalidation.test(email_phone_input.value) ||
      phonevalidation.test(email_phone_input.value)
    )
  ) {
    invalid_user.innerHTML = "invalid email or phone number !";
    invalid_user.style.cssText = " margin-left: 1.5em; font-size: 1.3em;";
    return false;
  }
  return password_check();
}

// email and phone number validation*************************************************************************
//   password validation*******************************************************************************
function password_check() {
  password_input.value = password_input.value.trim();
  if (password_input.value == "") {
    invalid_user.innerHTML = "invalid password !";
    passwordinfo.innerHTML = "please enter your password";
    return false;
  }
  if (password_input.value.length <= 6) {
    passwordinfo.innerHTML = "password should be more than 6 characters";
    passwordinfo.style.color = "red";

    return false;
  }
  if (password_input.value.length > 6) {
    passwordinfo.innerHTML = "password should be more than 6 characters";
    passwordinfo.style.color = "blue";
  }
}
// check box action***********************************************************************************
function checkbox() {
  password_input.type == "password"
    ? (password_input.type = "text")
    : (password_input.type = "password");
}
function showinfo() {
  passwordinfo.innerHTML = "password should be more than 6 characters";
  passwordinfo.style.color = "red";
}