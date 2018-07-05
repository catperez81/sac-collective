console.log("signup page");

$(function() {
  setFormListener()
});


function setFormListener(){

  $("#signup-form").submit(function(event){
    event.preventDefault();

    let user = {
      name: $(".name").val(),
      email: $(".email").val(),
      password: $(".password").val(),
      bio: $(".bio").val(),
      image: $(".image").val()
    }
    
    $.ajax({
      url: `/api/users/`,
      data:  JSON.stringify(user),
      error: function(error) {
        console.log('error', error);
      },
      success: function(data) {
        console.log(data)
        location.replace('/login.html');
      },
      // headers: {
      //   'Authorization': 'Bearer ' + authToken
      // },
     type: 'POST',
      contentType: 'application/json',
      dataType: "json",
    });

  })
}