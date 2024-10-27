const callbackForQuestions = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const questionList = document.getElementById("myQuestionList");

  // If the question is not found
  if (responseStatus == 404) {
    questionList.className = "alert alert-danger text-center";
    questionList.innerHTML = `${responseData.message}`;
    return;
  }
  // If the user is not logged in
  else if (responseStatus == 401) {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }
  // If the server crashes
  else if (responseStatus == 500) {
    window.location.href = "serverCrash.html";
  }

  responseData.forEach((question) => {
    const displayItem = document.createElement("div");
    displayItem.className = "col-md-8 p-3";

    displayItem.innerHTML = `
              <div class="card ">
                <div class="card-body">
                    <h2 class="card-title mb-4">${question.question}</h2>
                    <p class="card-text mb-3 lead">created by: ${question.creator}</p>
                    <p class="card-text mb-3 text-muted">created: ${question.created_at}</p>
                    <a href="singleQuestionInfo.html?question_id=${question.question_id}" class="btn btn-primary">Answer</a>
                    <button id="delete-question-${question.question_id}" class="btn btn-danger float-end"><i class="bi bi-trash"></i></button>
            </div>
              `;
    questionList.appendChild(displayItem);

    const deleteButton = document.getElementById(`delete-question-${question.question_id}`);

    // Delete button event listener
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const callbackForDelete = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // if the question is deleted successfully
        if (responseStatus == 204) {
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
      fetchMethod(currentUrl + "/api/questions/" + question.question_id, callbackForDelete, "DELETE", null, localStorage.getItem("token"));
    });
  });
};

// Perform get my questions api request
fetchMethod(currentUrl + "/api/questions/creator", callbackForQuestions, "GET", null, localStorage.getItem("token"));
