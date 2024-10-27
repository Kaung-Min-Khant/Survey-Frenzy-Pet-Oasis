window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    // Reload the page if it's loaded from the cache
    window.location.reload();
  }
});
