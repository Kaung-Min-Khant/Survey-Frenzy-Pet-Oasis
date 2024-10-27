document.addEventListener("DOMContentLoaded", function () {
  const callbackForUserInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const userInfo = document.getElementById("userInfo");
    const userAnsweredQuestions = document.getElementById("userAnsweredQuestions");
    console.log(userAnsweredQuestions);
    const userCreatedQuestions = document.getElementById("userCreatedQuestions");
    const userCollectedPoints = document.getElementById("userCollectedPoints");
    const userCollectedPets = document.getElementById("userCollectedPets");
    const userFoodAmt = document.getElementById("userFoodAmt");

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
                <img src="../images/gif/profile.gif" class="img-fluid rounded-start" alt="profile-img">
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
                  <button id="editUsernameButton" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editUsernameModal">Change Username</button>
                </div>
            </div>
          </div>
        </div>
      `;

    userAnsweredQuestions.innerText = `${responseData.answered_questions}`;
    userCreatedQuestions.innerText = `${responseData.created_questions}`;
    userCollectedPoints.innerText = `${responseData.points}`;
    userCollectedPets.innerText = `${responseData.collected_pets}`;
    userFoodAmt.innerHTML = `x ${responseData.food_amt}`;
  };

  //
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
                      <p class="card-subtitle lead mb-2">Hunger</p>
                      <div class="progress mb-2">
                        <div id="pet-hunger-${pet.pet_id}" class="progress-bar bg-danger progress-bar-striped progress-bar-animated" role="hungerBar" aria-valuenow="${pet.hunger}" aria-valuemin="0" aria-valuemax="100" style="width: ${pet.hunger}%"></div>
                      </div>
                      <button id="feed-pet-${pet.pet_id}" type="button" class="btn btn-danger w-100">Feed</button>
                  </div>
              </div>
              `;
      petList.appendChild(displayItem);

      // Feed button event listener
      const feedButton = document.getElementById(`feed-pet-${pet.pet_id}`);
      feedButton.addEventListener("click", (event) => {
        event.preventDefault();
        const callbackForFeed = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);

          // If the pet is not found
          if (responseStatus == 404) {
            alert(responseData.message);
          }
          // If the user is not logged in 
          else if (responseStatus == 401) {
            localStorage.removeItem("token");
            window.location.href = "login.html";
          } 
          // successfully feeding the pet
          else if (responseStatus == 200) {
            // window.location.reload(true);
            const hungerBar = document.getElementById(`pet-hunger-${pet.pet_id}`);
            hungerBar.style.width = `${responseData.hunger}%`;
            userFoodAmt.innerHTML = `x ${responseData.food_amt}`;
          } else {
            alert(responseData.message);
          }
        };

        // Fetch the pet feed API
        fetchMethod(currentUrl + `/api/pets/${pet.pet_id}/feed`, callbackForFeed, "PUT", null, localStorage.getItem("token"));
      });
    });
  };

  // Perform get user info api request
  fetchMethod(currentUrl + `/api/users/token`, callbackForUserInfo, "GET", null, localStorage.getItem("token"));

  // Fetch user pets info
  fetchMethod(currentUrl + `/api/users/token/pets`, callbackForUserPet, "GET", null, localStorage.getItem("token"));
});
