var authToken = localStorage.getItem("token");

if (authToken) {
  location.replace("/feed.html");
}
