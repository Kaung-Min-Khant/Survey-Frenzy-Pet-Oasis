document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".bi-star");
  const ratingValue = document.getElementById("rating-value");
  const submitReviewButton = document.getElementById("submit-review");

  let currentRating = 0;
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      currentRating = star.getAttribute("data-value");
      updateStars(currentRating);
      ratingValue.textContent = `Your rating: ${currentRating}`;
    });
  });

  const callbackforCreateReview = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    // If the review is created successfully
    if (responseStatus == 201) {
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
    } 
    // If something else goes wrong
    else {
      alert(responseData.message);
    }
  };

  submitReviewButton.addEventListener("click", (event) => {
    console.log("submitReviewButton clicked");
    event.preventDefault();

    // Check if the user has selected a rating
    if (currentRating > 0 && currentRating <= 5) {
      console.log("Rating:", currentRating);

      const review_amt = currentRating;

      const data = {
        review_amt: review_amt,
      };

      // Perform create review api request
      fetchMethod(currentUrl + "/api/reviews", callbackforCreateReview, "POST", data, localStorage.getItem("token"));
    } else {
      alert("Please select a rating.");
    }
  });

  // Function to update the stars
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
