document.addEventListener("DOMContentLoaded", function () {
  const editUsernameForm = document.getElementById("editUsernameForm");
  const editUsernameModal = new bootstrap.Modal(document.getElementById("editUsernameModal"));

  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    if (responseStatus == 200) {
      // Reset the form fields
      editUsernameForm.reset();
      editUsernameModal.hide();
      window.location.href = "profile.html";
    } 
    // If the server crashes
    else if (responseStatus == 500) {
      window.location.href = "serverCrash.html";
    } else {
      warningCard.classList.remove("d-none");
      warningText.innerText = responseData.message;
    }
  };

  editUsernameForm.addEventListener("submit", function (event) {
    console.log("editUsernameForm.addEventListener");
    event.preventDefault();

    const username = document.getElementById("editUsername").value;

    const data = {
      username: username,
    };

    console.log("data:", data);
    // Perform Edit Username api request
    fetchMethod(currentUrl + "/api/users/token/username", callback, "PUT", data, localStorage.getItem("token"));
  });
});
