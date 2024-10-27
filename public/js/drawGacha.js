document.addEventListener("DOMContentLoaded", function () {
  const showDrawItem = document.getElementById("drawGachaModalBody");
  const foodGachaButton = document.getElementById(`foodGachaButton`);
  const drawGachaModal = new bootstrap.Modal(document.getElementById("drawGachaModal"));

  foodGachaButton.addEventListener("click", (event) => {
    event.preventDefault();
    const callbackForGacha = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      // If the gacha is drawn successfully
      if (responseStatus == 200) {
        showDrawItem.innerText = `Congratulations You Draw ${responseData.rarity} items! You gain x ${responseData.reward_food_amount} Food`;
        drawGachaModal.show();
      }
      // If the user has not enough points to draw gacha or the gacha is not available
      else if (responseStatus == 404 || responseStatus == 402) {
        alert(responseData.message);
      } 
      // If the user is not logged in
      else if (responseStatus == 401) {
        localStorage.removeItem("token");
        window.location.href = "login.html";
      } 
      // If the server crashes
      else if (responseStatus == 500) {
        window.location.href = "serverCrash.html";
      } else {
        alert(responseData.message);
      }
    };

    // Perform draw gacha api request
    fetchMethod(currentUrl + `/api/gacha/draw`, callbackForGacha, "PUT", null, localStorage.getItem("token"));
  });
});
