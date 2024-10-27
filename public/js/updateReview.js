document.addEventListener("DOMContentLoaded", function () {
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const review_id = urlParams.get("review_id");
  const ratingValue = document.getElementById("rating-value");
  const stars = document.querySelectorAll(".bi-star");
  const submitReviewButton = document.getElementById("submit-review");

  let currentRating = urlParams.get("rating");
  ratingValue.textContent = `Your rating: ${currentRating}`;
  updateStars(currentRating);

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      currentRating = star.getAttribute("data-value");
      updateStars(currentRating);
      ratingValue.textContent = `Your rating: ${currentRating}`;
    });
  });

  const callbackforUpdateReview = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    if (responseStatus == 200) {
      // Redirect to show myReview.html
      window.location.href = "myReview.html";
    } else if (responseStatus == 401) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    } else if (responseStatus == 500) {
      window.location.href = "serverCrash.html";
    } else {
      alert(responseData.message);
    }
  };

  submitReviewButton.addEventListener("click", (event) => {
    console.log("submitReviewButton clicked");
    event.preventDefault();

    if (currentRating > 0 && currentRating <= 5) {
      console.log("Rating:", currentRating);

      const review_amt = currentRating;

      const data = {
        review_amt: review_amt,
      };
      fetchMethod(currentUrl + "/api/reviews/" + review_id, callbackforUpdateReview, "PUT", data, localStorage.getItem("token"));
    } else {
      alert("Please select a rating.");
    }
  });

  // function to update the stars
  function updateStars(rating) {
    stars.forEach((star) => {
      if (star.getAttribute("data-value") <= rating) {
        star.classList.add("bi-star-fill");
        star.classList.remove("bi-star");
      } else {
        star.classList.add("bi-star");
        star.classList.remove("bi-star-fill");
      }
    });
  }
});
