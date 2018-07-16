console.log("global js file");

$(function() {
  upvoteListener();
});

function upvoteListener() {
  $("#up-arrow").click(function() {
    console.log("testing");
    var counter = 0;
    counter++;
    $(".vote-count").text(counter);
  });
}

$(function() {
  downvoteListener();
});

function downvoteListener() {
  $("#down-arrow").click(function() {
    console.log("testing");
    var counter = 0;
    counter--;
    $(".vote-count").text(counter);
  });
}
