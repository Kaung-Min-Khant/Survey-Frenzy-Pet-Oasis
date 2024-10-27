document.addEventListener("DOMContentLoaded", function () {
  const callbackForReviewStats = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    // If server crashes
    if (responseStatus == 500) {
      window.location.href = "serverCrash.html";
    }

    const reviewCounts = document.getElementById("reviewCounts");
    const averageRating = document.getElementById("averageRating");
    const totalRating = document.getElementById("totalRating");

    reviewCounts.innerText = `${responseData.count_reviews}`;
    averageRating.innerText = `${responseData.avg_review_amt}`;
    totalRating.innerText = `${responseData.total_review_amt}`;
  };

  // Perform get review stats api request
  fetchMethod(currentUrl + `/api/reviews/stats`, callbackForReviewStats);
});
