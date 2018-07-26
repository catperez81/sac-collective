$(function() {
  setFormListener();
});

function setFormListener() {
  $("#login-form").submit(function(event) {
    event.preventDefault();

    let user = {
      email: $(".email").val(),
      password: $(".password").val()
    };

    console.log(user);

    $.ajax({
      url: `/api/auth/login`,
      data: JSON.stringify(user),
      error: function(error) {
        console.log("error", error);
      },
      success: function(data) {
        console.log(data);
        localStorage.setItem("token", data.authToken);
        location.replace("/feed.html");
      },
      // headers: {
      //   'Authorization': 'Bearer ' + authToken
      // },
      type: "POST",
      contentType: "application/json",
      dataType: "json"
    });
  });
}