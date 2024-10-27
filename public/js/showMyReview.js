const callbackForReviews = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const reviewList = document.getElementById("myReviewList");
  // If the user has not posted any reviews
  if (responseStatus == 404) {
    reviewList.className = "alert alert-danger text-center";
    reviewList.innerHTML = `${responseData.message}`;
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

  responseData.forEach((review) => {
    const displayItem = document.createElement("div");
    displayItem.className = "col-xl-3 col-lg-4 col-md-6 col-xs-12 p-3";

    displayItem.innerHTML = `
              <div class="card h-100">
                  <div class="card-body text-center">
                      <h3 class="card-title mb-2">Rating: ${review.review_amt} Stars</h3>
                      <div class="lead text-warning my-3">
                      ${review.review_amt >= 1 ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>'}
                      ${review.review_amt >= 2 ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>'}
                      ${review.review_amt >= 3 ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>'}
                      ${review.review_amt >= 4 ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>'}
                      ${review.review_amt == 5 ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>'}
                      </div>
                      <h5 class="card-text mb-2">Username: ${review.username}</h5>
                      <h5 class="card-text mb-4">Email: ${review.email}</h5>
                      <button id="update-review-${review.id}" class="btn btn-primary mb-4"><i class="bi bi-pencil-square"></i></button>
                      <button id="delete-review-${review.id}" class="btn btn-danger mb-4"><i class="bi bi-trash"></i></button>
              </div>
              `;
    reviewList.appendChild(displayItem);

    // Update button event listener
    const updateButton = document.getElementById(`update-review-${review.id}`);
    updateButton.addEventListener("click", (event) => {
      event.preventDefault();

      window.location.href = `updateReview.html?review_id=${review.id}&rating=${review.review_amt}`;
    });

    // Delete button event listener
    const deleteButton = document.getElementById(`delete-review-${review.id}`);
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const callbackForDelete = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // If the review is not found
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
        }
        // some other error
        else {
          alert(responseData.message);
        }
      };
      fetchMethod(currentUrl + "/api/reviews/" + review.id, callbackForDelete, "DELETE", null, localStorage.getItem("token"));
    });
  });
};

fetchMethod(currentUrl + "/api/reviews/owner", callbackForReviews, "GET", null, localStorage.getItem("token"));
