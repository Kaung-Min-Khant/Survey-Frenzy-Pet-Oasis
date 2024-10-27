document.addEventListener("DOMContentLoaded", function () {
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const question_id = urlParams.get("question_id");

  const callbackForQuestionInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const questionInfo = document.getElementById("questionInfo");

    // If the question is not found
    if (responseStatus == 404) {
      questionInfo.className = "alert alert-danger text-center";
      questionInfo.innerHTML = `${responseData.message}`;
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

    questionInfo.innerHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    <h2 class="card-title mb-4">${responseData.question}</h2>
                    <p class="card-text mb-3 lead">created by: ${responseData.creator}</p>
                    <p class="card-text mb-3 text-muted">created: ${responseData.created_at}</p>
                </div>
            </div>
        `;
  };

  // Callback function for answers
  const callbackForAnswers = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const answerList = document.getElementById("answerList");

    // If the answer is not found
    if (responseStatus == 404) {
      answerList.className = "alert alert-danger text-center";
      answerList.innerHTML = `${responseData.message}`;
      return;
    } 
    // If the server crashes
    else if (responseStatus == 500) {
      window.location.href = "serverCrash.html";
    }

    responseData.forEach((answer) => {
      const displayItem = document.createElement("div");
      displayItem.className = "col-md-8 p-3";
      displayItem.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title mb-4"><em>Answer: ${answer.answer}</em></h4>
                            <h5 class="card-subtitle lead mb-2">
                              Additional Notes: ${answer.additional_notes}
                            </h5>
                            <p class="card-text text-muted mb-2">Created: ${answer.created_at}</p>
                            <p class="card-text lead mb-2">participant: ${answer.participant}</p>
                            <a href="singleUserInfo.html?user_id=${answer.participant_id}" class="btn btn-primary">View Profile</a>
                        </div>
                    </div>
                    `;
      answerList.appendChild(displayItem);
    });
  };

  // Perform get single question api request
  fetchMethod(currentUrl + `/api/questions/${question_id}`, callbackForQuestionInfo, "GET", null, localStorage.getItem("token"));

  // Perform get answers of question api request
  fetchMethod(currentUrl + `/api/questions/${question_id}/answers`, callbackForAnswers, "GET", null, localStorage.getItem("token"));
});
