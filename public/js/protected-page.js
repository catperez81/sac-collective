var authToken = localStorage.getItem("token");

if (!authToken) {
  location.replace("/login.html");
}

$(setUpListeners);

function setUpListeners() {
  $(".logout").click(function(event) {
    event.preventDefault();
    localStorage.setItem("token", "");
    location.replace("/index.html");
  });
}
