document.addEventListener("DOMContentLoaded", function () {
  const createQuestionForm = document.getElementById("createQuestionForm");

  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    if (responseStatus == 201) {
      // Reset the form fields
      createQuestionForm.reset();
      // Reload the page
      window.location.reload(true);
    } 
    // If the user is not logged in
    else if (responseStatus == 401) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    } 
    // If the server crashes
    else if (responseStatus == 500) {
      window.location.href = "serverCrash.html";
    } else {
      alert(responseData.message);
    }
  };

  // Event listener for create question form
  createQuestionForm.addEventListener("submit", function (event) {
    console.log("createQuestionForm.addEventListener");
    event.preventDefault();

    const question = document.getElementById("createQuestion").value;

    const data = {
      question: question,
    };

    // Perform create question api request
    fetchMethod(currentUrl + "/api/questions", callback, "POST", data, localStorage.getItem("token"));
  });
});
