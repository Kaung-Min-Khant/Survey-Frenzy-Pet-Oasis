document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      // If server crashes
      if (responseStatus == 500) {
        window.location.href = "serverCrash.html";
      }

      const reviewList = document.getElementById("reviewList");
      responseData.forEach((review) => {
        const displayItem = document.createElement("div");
        displayItem.className = "col-xl-3 col-lg-4 col-md-6 col-xs-12 p-3";
        
        displayItem.innerHTML = `
            <div class="card h-100">
                <div class="card-body text-center">
                    <h3 class="card-title mb-2">Rating: ${review.review_amt} Stars</h3>
                    <div class="lead text-warning my-3">
                    ${ review.review_amt >= 1 ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>'}
                    ${ review.review_amt >= 2 ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>'}
                    ${ review.review_amt >= 3 ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>'}
                    ${ review.review_amt >= 4 ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>'}
                    ${ review.review_amt == 5 ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>'}
                    </div>
                    <h5 class="card-text mb-2">Username: ${review.username}</h5>
                    <h5 class="card-text mb-4">Email: ${review.email}</h5>
            </div>
            `;
        reviewList.appendChild(displayItem);
      });
    };
  
    // Fetch all reviews
    fetchMethod(currentUrl + "/api/reviews", callback);
  });