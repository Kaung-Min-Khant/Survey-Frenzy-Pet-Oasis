document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const shopList = document.getElementById("shopList");

    // If the shop items are not found
    if (responseStatus == 404) {
      shopList.className = "alert alert-danger text-center";
      shopList.innerHTML = `${responseData.message}`;
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

    responseData.forEach((shopItem) => {
      const displayItem = document.createElement("div");
      displayItem.className = "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = `
            <div class="card h-100">
                <img src="../images/gif/${shopItem.species}.gif" class="card-img-top" alt="shopItem Image">
                <div class="card-body">
                    <h4 class="card-title mb-4"><em>${shopItem.species}</em></h5>
                    <p class="card-subtitle">
                    Pet Wiki No: ${shopItem.pet_type} <br>
                    Refresh On: ${shopItem.refresh_date} <br>
                    </p>
                    <p class="card-text lead my-2 text-info">
                      price: ${shopItem.price} points
                    </p>
                    <button id="buy-item-${shopItem.item_id}" type="button" class="btn btn-primary w-100" data-bs-target="#purchaseModal">Buy</button>
                </div>
            </div>
            `;
      shopList.appendChild(displayItem);

      const showPurchaseItem = document.getElementById("purchaseModalBody");

      const buyButton = document.getElementById(`buy-item-${shopItem.item_id}`);

      // Buy button event listener
      buyButton.addEventListener("click", (event) => {
        const purchaseModal = new bootstrap.Modal(document.getElementById("purchaseModal"));

        event.preventDefault();
        const callbackForBuy = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);

          // If the shop item is not found or the user does not have enough points
          if (responseStatus == 404 || responseStatus == 402) {
            alert(responseData.message);
          }
          // If the user is not logged in
          else if (responseStatus == 401) {
            localStorage.removeItem("token");
            window.location.href = "login.html";
          }
          // If the shop item is successfully purchased
          else if (responseStatus == 201) {
            showPurchaseItem.innerText = `${responseData.species} has been successfully purchased!`;
            purchaseModal.show();
          }
          // If the server crashes
          else if (responseStatus == 500) {
            window.location.href = "serverCrash.html";
          }
        };
        // call the fetch api to buy the pet
        fetchMethod(currentUrl + `/api/shop/${shopItem.item_id}/pet`, callbackForBuy, "POST", null, localStorage.getItem("token"));
      });
    });
  };

  // Fetch all shop items
  fetchMethod(currentUrl + "/api/shop", callback, "GET", null, localStorage.getItem("token"));
});
