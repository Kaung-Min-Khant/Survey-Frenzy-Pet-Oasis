document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    // If server crashes
    if (responseStatus == 500) {
      window.location.href = "serverCrash.html";
    }
    
    const petWikiList = document.getElementById("petWikiList");
    responseData.forEach((petWiki) => {
      const displayItem = document.createElement("div");
      displayItem.className = "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = `
          <div class="card h-100">
              <img src="../images/gif/${petWiki.name}.gif" class="card-img-top" alt="Pet Image">
              <div class="card-body">
                  <h4 class="card-title mb-4"><em>${petWiki.name}</em></h4>
                  <h6 class="card-text mb-2 text-muted">Number: ${petWiki.type_number}</h6>
                  <h6 class="card-text mb-2 text-muted">Price: $${petWiki.price}</h6>
                  <p class="card-subtitle">
                    ${petWiki.description}
                  </p>
          </div>
          `;
      petWikiList.appendChild(displayItem);
    });
  };

  // Fetch all pets wiki
  fetchMethod(currentUrl + "/api/petWiki", callback);
});