document.addEventListener("DOMContentLoaded", function () {
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const userId = urlParams.get("user_id");

  const callbackForUserInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const userInfo = document.getElementById("userInfo");
    const userAnsweredQuestions = document.getElementById("userAnsweredQuestions");
    console.log(userAnsweredQuestions);
    const userCreatedQuestions = document.getElementById("userCreatedQuestions");
    const userCollectedPoints = document.getElementById("userCollectedPoints");
    const userCollectedPets = document.getElementById("userCollectedPets");

    // If the user is not found
    if (responseStatus == 404) {
      userInfo.className = "alert alert-danger text-center";
      userInfo.innerHTML = `${responseData.message}`;
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

    userInfo.innerHTML = `
          <div class="card">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="../images/gif/profile.gif" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <p class="card-text lead">
                  UserID: ${responseData.id} <br>
                  Username: ${responseData.username} <br>
                  Email: ${responseData.email} <br>
                  Created On: ${responseData.created_on} <br>
                  Updated On: ${responseData.updated_on} <br>
                  Last Login On: ${responseData.last_login_on} <br>
                  </p>
                </div>
             </div>
          </div>
        </div>
      `;

    userAnsweredQuestions.innerText = `${responseData.answered_questions}`;
    userCreatedQuestions.innerText = `${responseData.created_questions}`;
    userCollectedPoints.innerText = `${responseData.points}`;
    userCollectedPets.innerText = `${responseData.collected_pets}`;
  };

  // Callback function for user pets
  const callbackForUserPet = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const petList = document.getElementById("petList");

    // If the pet is not found
    if (responseStatus == 404) {
      petList.className = "alert alert-danger text-center";
      petList.innerHTML = `${responseData.message}`;
      return;
    } 
    // the server crashes
    else if (responseStatus == 500) {
      window.location.href = "serverCrash.html";
    }

    responseData.forEach((pet) => {
      const displayItem = document.createElement("div");
      displayItem.className = "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = `
              <div class="card h-100">
                  <img src="../images/gif/${pet.species}.gif" class="card-img-top" alt="Pet Image">
                  <div class="card-body">
                      <h4 class="card-title mb-4"><em>${pet.species}</em></h4>
                      <h6 class="card-text mb-2">petID: ${pet.pet_id}</h6>
                      <h6 class="card-text mb-2">Created On: ${pet.creation_date}</h6>
                      <p class="card-subtitle lead mb-2">
                        Owner: ${pet.owner}
                      </p>
                  </div>
              </div>
              `;
      petList.appendChild(displayItem);
    });
  };

  // Perfrom api request to get user info
  fetchMethod(currentUrl + `/api/users/${userId}`, callbackForUserInfo, "GET", null, localStorage.getItem("token"));

  // Fetch user pets info
  fetchMethod(currentUrl + `/api/users/${userId}/pets`, callbackForUserPet, "GET", null, localStorage.getItem("token"));
});
