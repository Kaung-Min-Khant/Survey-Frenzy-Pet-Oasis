document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const questionList = document.getElementById("questionList");

    // If question list is empty
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
            <div class="card">
                <div class="card-body">
                    <h2 class="card-title mb-4">${question.question}</h2>
                    <p class="card-text lead">created by: ${question.creator}</p>
                    <p class="card-text mb-3 text-muted">created: ${question.created_at}</p>
                    <a href="singleQuestionInfo.html?question_id=${question.question_id}" class="btn btn-primary">Answer</a>
                    <a href="singleUserInfo.html?user_id=${question.creator_id}" class="btn btn-outline-dark">View Profile</a>
                </div>
            </div>
            `;
      questionList.appendChild(displayItem);
    });
  };

  // Fetch all questions
  fetchMethod(currentUrl + "/api/questions", callback, "GET", null, localStorage.getItem("token"));
});
