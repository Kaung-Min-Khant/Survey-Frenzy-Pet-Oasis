document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    // If server crashes
    if (responseStatus == 500) {
      window.location.href = "serverCrash.html";
    }
    
    const petList = document.getElementById("petList");
    responseData.forEach((pet) => {
      const displayItem = document.createElement("div");
      displayItem.className = "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = `
          <div class="card h-100">
              <img src="../images/gif/${pet.species}.gif" class="card-img-top" alt="Pet Image">
              <div class="card-body">
                  <h4 class="card-title mb-4"><em>${pet.species}</em></h5>
                  <p class="card-subtitle">
                  PetID: ${pet.pet_id} <br>
                  Created On: ${pet.creation_date} <br>
                  </p>
                  <p class="card-text lead my-2">
                    Owner: ${pet.owner}
                  </p>
                  <a href="singleUserInfo.html?user_id=${pet.owner_id}" class="btn btn-primary">View Owner</a>
              </div>
          </div>
          `;
      petList.appendChild(displayItem);
    });
  };

  // Fetch all pets
  fetchMethod(currentUrl + "/api/pets", callback);
});