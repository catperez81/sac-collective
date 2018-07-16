// console.log("profile page");

$(function() {
  showProfileData();
});

function showProfileData() {
  var user = parseJwt(authToken).user;
  console.log(user);

  $(".profile-image").attr("src", user.image);
  $(".profile-bio").text(user.bio);
  $(".profile-name").text(user.name);
  console.log($(".profile-bio"));
}

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

// function setVoteListener() {
//   $(".vote-badge").click(function() {
//   	console.log('testing');
//   	let voteCount = parseInt($("~ .count", this).text());
// 		if($(this).hasClass("up")) {
//       var voteCount = voteCount + 1;
//        $("~ .vote-count", this).text(count);
//     } else {
//       var count = count - 1;
//       $("~ .vote-count", this).text(count);
//     	}
// 		});
// }
