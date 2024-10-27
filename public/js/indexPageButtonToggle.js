document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("indexLoginButton");
  const registerButton = document.getElementById("indexRegisterButton");
  const profileButton = document.getElementById("indexRatingButton");
  const questionButton = document.getElementById("indexQuestionButton");

  // Check if token exists in local storage
  const token = localStorage.getItem("token");
  if (token) {
    // Token exists, show profile button and hide login and register buttons
    loginButton.classList.add("d-none");
    registerButton.classList.add("d-none");
    profileButton.classList.remove("d-none");
    questionButton.classList.remove("d-none");
  } else {
    // Token does not exist, show login and register buttons and hide profile buttons
    loginButton.classList.remove("d-none");
    registerButton.classList.remove("d-none");
    profileButton.classList.add("d-none");
    questionButton.classList.add("d-none");
  }
});
