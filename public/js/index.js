function signUp() {
  $(".signup-button").on("click", function() {
    showSignUpForm();
  });
}

function showSignUpForm() {
  $("#home").hide();
  $("#signup").show("signup.html");
}

signUp();
