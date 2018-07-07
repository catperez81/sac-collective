console.log("global js file");

$(function() {
  upvoteListener();
});

function upvoteListener() {
  $(".vote-badge").click(function() {
    console.log('testing');
    var counter = 0;
    counter++;
      $(".vote-badge").text(counter);
  });
}

