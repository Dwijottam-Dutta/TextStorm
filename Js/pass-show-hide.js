const passField = document.querySelector("#password");
  const toggleIcon = document.getElementById("eye");

  toggleIcon.onclick = () => {
    if (passField.type == "password") {
      passField.type = "text";
      toggleIcon.classList.add("active");
    } else {
      passField.type = "password";
      toggleIcon.classList.remove("active");
    }
  }

  const passField_login = document.querySelector("#password_login");
  const toggleIcon_login = document.getElementById("eye_login");
  toggleIcon_login.onclick = () => {
    if (passField_login.type == "password") {
      passField_login.type = "text";
      toggleIcon_login.classList.add("active");
    } else {
      passField_login.type = "password";
      toggleIcon_login.classList.remove("active");
    }
  }