// name function#############################################################3
function user_name(i, l, w, ff) {
  i.value.trim();
  if (i.value == "") {
    l.innerHTML = `please enter your ${w} name`;
    l.style.cssText = "color:gold; font-size:1em";
    return false;
  }
  let x = i.value.split("");
  x.forEach((ele) => {
    if (!isNaN(parseInt(ele))) {
      l.innerHTML = "wrong typing";
      l.style.cssText = " color:red ; font-size:1em ";
      return false;
    }
    if (isNaN(ele)) {
      i.addEventListener("keydown", () => {
        l.innerHTML = "right typing";
        l.style.cssText = " color:green ; font-size:1em ";
      });
    }
    i.addEventListener("blur", () => {
      l.innerHTML = w + "name";
      l.style.cssText = " color:blue ; font-size:1em ";
    });
  });
  ff();
  return true;
}
// firstname###############################################################################
let user_firstname_label = document.querySelector("#user-firstname-label");
let user_firstname_input = document.querySelector("#user-firstname-input");

function firstname() {
  return user_name(
    user_firstname_input,
    user_firstname_label,
    "first ",
    lastname
  );
}
// lastname###############################################################################
let user_lastname_label = document.querySelector("#user-lastname-label");
let user_lastname_input = document.querySelector("#user-lastname-input");
function lastname() {
  return user_name(user_lastname_input, user_lastname_label, "last ", email);
}
// email and phone function ###############################################################################

function user_email_phone(i, l, n, v, f) {
  i.value.trim();
  if (i.value == "") {
    l.innerHTML = "please enter your " + n;
    l.style.cssText = "font-size: 1em; color:gold ";
    return false;
  }
  if (!v.test(i.value)) {
    l.innerHTML = "invalid user " + n;
    l.style.cssText = "font-size: 1em ; color:red";
    return false;
  }
  if (v.test(i.value)) {
    l.innerHTML = "valid user " + n;
    l.style.cssText = "font-size: 1em ; color:green";
  }
  i.addEventListener("blur", () => {
    l.innerHTML = n;
    l.style.color = "blue";
    return true;
  });
  f();
  return true;
}

// email###########################################################3

let emailvalidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let user_email_label = document.querySelector("#user-email-label");
let user_email_input = document.querySelector("#user-email-input");
function email() {
  return user_email_phone(
    user_email_input,
    user_email_label,
    "email",
    emailvalidation,
    phone
  );
}
// phone###############################################################################
let user_phone_label = document.querySelector("#user-phone-number-label");
let user_phone_input = document.querySelector("#user-phone-number-input");
let phonevalidation = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
function phone() {
  return user_email_phone(
    user_phone_input,
    user_phone_label,
    "phone num",
    phonevalidation,
    password
  );
}
// password###############################################################################
let user_password_label = document.querySelector("#user-password-label");
let user_password_input = document.querySelector("#user-password-input");
function password() {
  user_password_input.value.trim();
  if (user_password_input.value == "") {
    user_password_label.innerHTML = "please enter password";
    user_password_label.style.cssText = "font-size :1em ;color:gold ";
    return false;
  }
  if (user_password_input.value != "") {
    user_password_label.innerHTML = "valid password";
    user_password_label.style.cssText = "font-size :1em ;color:green ";
    user_password_input.addEventListener("blur", () => {
      user_password_label.innerHTML = "password";
      user_password_label.style.color = "blue";
    });
    confirm();
    return true;
  }
}
// confirm password###############################################################################
let user_confirm_input = document.querySelector("#user-confirm-password-input");
let user_confirm_label = document.querySelector("#user-confirm-password-label");
function confirm() {
  user_confirm_input.value.trim();
  if (user_confirm_input.value == "") {
    user_confirm_label.innerHTML = "please confirm your password ";
    user_confirm_label.style.cssText = "font-size :1em ;color:gold ";
    return false;
  }
  if (user_confirm_input.value != user_password_input.value) {
    user_confirm_label.innerHTML = "your password does't match !";
    user_confirm_label.style.cssText = "color:red ; font-size:1.5em";
    return false;
  }
  if (user_confirm_input.value == user_password_input.value) {
    user_confirm_label.innerHTML = "your password match your confimation ";
    user_confirm_label.style.cssText = "color:green ; font-size:1em";
    user_confirm_input.addEventListener("blur", () => {
      user_confirm_label.innerHTML = "confirmed password";
      user_confirm_label.style.color = "blue";
    });
    gender();
    return true;
  }
}
// gender###############################################################################
let user_gender_label = document.querySelector("#user-gender-label");
let user_male_input = document.querySelector("#user-male-gender-input");
let user_female_input = document.querySelector("#user-female-gender-input");
function gender() {
  if (user_male_input.checked == false && user_female_input.checked == false) {
    user_gender_label.innerHTML = "gender must be selected";
    user_gender_label.style.cssText = "color:gold; font-size:1em  ";
    return false;
  } else {
    user_gender_label.innerHTML = "gender is checked";
    user_gender_label.style.color = "green";
    date();
    return true;
  }
}
function myblur() {
  user_gender_label.style.color = "blue";
}

// date ###############################################################################
let user_date_label = document.querySelector("#user-date-label");
let user_date_input = document.querySelector("#user-date-input");
function date() {
  if (user_date_input.value == "") {
    user_date_label.innerHTML = "birth date must be selected";
    user_date_label.style.cssText = "color:gold; font-size:1em ";
    return false;
  } else if (user_date_input.value != "") {
    user_date_label.innerHTML = "long live the king";
    user_date_label.style.cssText = "color:blue; font-size:1em ";
    return true;
  }
}
function formsubmit() {
  if (
    firstname() == false ||
    lastname() == false ||
    email() == false ||
    phone() == false ||
    password() == false ||
    confirm() == false ||
    gender() == false ||
    date() == false
  ) {
    return false;
  } else {
    return true;
  }
}
console.log(user_date_input);
