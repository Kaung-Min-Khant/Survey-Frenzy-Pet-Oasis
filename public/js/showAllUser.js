document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // If server crashes
        if (responseStatus == 500) {
            window.location.href = "serverCrash.html";
        }

        const userList = document.getElementById("userList");
        responseData.forEach((user) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
            displayItem.innerHTML = `
          <div class="card h-100">
              <img src="../images/gif/profile.gif" class="card-img-top" alt="Pet Image">
              <div class="card-body">
                  <h4 class="card-title lead"><em>${user.username}</em></h4>
                  <h5 class="card-text">Email: ${user.email} </h5>
                  <p class="card-text mb-4">
                  UserID: ${user.id} <br>
                  Created On: ${user.created_on} <br>
                  </p>
                  <a href="singleUserInfo.html?user_id=${user.id}" class="btn btn-primary">View User</a>
              </div>
          </div>
          `;
            userList.appendChild(displayItem);
        });
    };

    // Fetch all users
    fetchMethod(currentUrl + "/api/users", callback);
});