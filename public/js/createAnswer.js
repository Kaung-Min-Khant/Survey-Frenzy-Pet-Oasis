document.addEventListener("DOMContentLoaded", function () {
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const question_id = urlParams.get("question_id");
  const createAnswerForm = document.getElementById("createAnswerForm");

  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    if (responseStatus == 201) {
      // Reset the form fields
      createAnswerForm.reset();
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

  // Function to convert "yes" or "no" to boolean
  function convertYesNoToBoolean(input) {
    const normalizedInput = input.trim().toLowerCase();

    if (normalizedInput === "yes") {
      return true;
    } else if (normalizedInput === "no") {
      return false;
    }
  }

  // Event listener for create answer form
  createAnswerForm.addEventListener("submit", function (event) {
    console.log("createAnswerForm.addEventListener");
    event.preventDefault();

    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    const additional_notes = document.getElementById("additionalNotes").value;

    // Check if an answer is selected
    if (selectedAnswer) {
      const data = {
        answer: convertYesNoToBoolean(selectedAnswer.value),
        additional_notes: additional_notes,
      };

      // Perform create answer api request
      fetchMethod(currentUrl + `/api/questions/${question_id}/answers`, callback, "POST", data, localStorage.getItem("token"));
    } else {
      console.log("No answer selected");
      alert("Please select an answer before submitting the form.");
    }
  });
});
