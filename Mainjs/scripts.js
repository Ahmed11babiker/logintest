// login
// let loginemail=document.getElementById('email')
// let loginpassword =document.getElementById('password')
// let loginbtn=document.getElementById('loginbtn')

// sign Up
let userName = document.getElementById("username");
let lastName = document.getElementById("lastname");
let emailE = document.getElementById("email");
let passwordSign = document.getElementById("password");
let ConfirmPassword = document.getElementById("confirmPassword");

function restInput() {
  userName.value = "";
  lastName.value = "";
  passwordSign.value = "";
  emailE.value = "";
  ConfirmPassword.value = "";
  userName.classList.remove("is-valid");
  lastName.classList.remove("is-valid");
  passwordSign.classList.remove("is-valid");
  emailE.classList.remove("is-valid");
  ConfirmPassword.classList.remove("is-valid");
}

let users = JSON.parse(localStorage.getItem("users")) || [];

document.addEventListener("DOMContentLoaded", () => {
  const signUpForm = document.getElementById("sign-up-form");
  const loginForm = document.getElementById("login-form");
  const logoutButton = document.getElementById("logout-button");

  if (signUpForm) {
    signUpForm.addEventListener("submit", signUp);
  }

  if (loginForm) {
    loginForm.addEventListener("submit", login);
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }

  console.log(window.location.pathname);
  
  if (window.location.pathname === "/home.html") {
    const usernameSpan = document.getElementById("username");
    const user = JSON.parse(localStorage.getItem("currentUser"));
    console.log('before',user);
    if (user) {
      console.log('after',user);
      
      usernameSpan.textContent = `${user.username}`;
    } else {
      window.location.href = "index.html";
    }
  }
});

function signUp(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  let lastname = document.getElementById("lastname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  if (
    validationinput(userName, "firstID") &&
    validationinput(lastName, "lastnameID") &&
    validationinput(emailE, "emailID") &&
    validationinput(passwordSign, "passID") &&
    validationinput(ConfirmPassword, "passwordconID")
  ) {
    if (password !== confirmPassword) {
      let message = document.getElementById("mess");
      message.classList.remove("d-none");
      return;
    }

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      alert("Email already exists");
      return;
    }

    const newUser = { username, lastname, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    window.location.href = "index.html";
  } else {
    showAlert();
    restInput();
  }
}

function login(e) {
  e.preventDefault();
  let email = document.getElementById("loginemail").value;
  let password = document.getElementById("loginpassword").value;
  if (
    validationinput(loginemail, "emailID") &&
    validationinput(loginpassword, "passwordconID")
  ) {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "home.html";
    } else {
      alert("Invalid email or password");
    }
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

function validationinput(element, msgID) {
  let text = element.value;
  let message = document.getElementById(msgID);

  regex = {
    username: /^[a-zA-Z_]{3,16}$/,
    lastname: /^[a-zA-Z_]{3,16}$/,
    loginemail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    loginpassword:
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    password: /^([A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    confirmPassword:
      /^([A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  };

  if (regex[element.id].test(text)) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    message.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    message.classList.remove("d-none");
    return false;
  }
}

function showAlert() {
  Swal.fire("Please fill the fields with valid infos!");
}

// window.addEventListener('DOMContentLoaded', event => {

//     // Navbar shrink function
//     var navbarShrink = function () {
//         const navbarCollapsible = document.body.querySelector('#mainNav');
//         if (!navbarCollapsible) {
//             return;
//         }
//         if (window.scrollY === 0) {
//             navbarCollapsible.classList.remove('navbar-shrink')
//         } else {
//             navbarCollapsible.classList.add('navbar-shrink')
//         }

//     };

//     // Shrink the navbar
//     navbarShrink();

//     // Shrink the navbar when page is scrolled
//     document.addEventListener('scroll', navbarShrink);

//     //  Activate Bootstrap scrollspy on the main nav element
//     const mainNav = document.body.querySelector('#mainNav');
//     if (mainNav) {
//         new bootstrap.ScrollSpy(document.body, {
//             target: '#mainNav',
//             rootMargin: '0px 0px -40%',
//         });
//     };

//     // Collapse responsive navbar when toggler is visible
//     const navbarToggler = document.body.querySelector('.navbar-toggler');
//     const responsiveNavItems = [].slice.call(
//         document.querySelectorAll('#navbarResponsive .nav-link')
//     );
//     responsiveNavItems.map(function (responsiveNavItem) {
//         responsiveNavItem.addEventListener('click', () => {
//             if (window.getComputedStyle(navbarToggler).display !== 'none') {
//                 navbarToggler.click();
//             }
//         });
//     });

// });
