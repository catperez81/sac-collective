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

const settings = {
  url: "/api/recommendations/own",
  dataType: "json",
  type: "GET",
  success: function(response) {
    console.log(response);
    renderResults(response);
  },
  error: function(error) {
    console.log(error);
  },
  headers: {
    Authorization: "Bearer " + authToken
  }
};

$.ajax(settings);

function result(recommendation, index) {
  return `
		<div class="collection-item">
	      <img src="${recommendation.image_url ? recommendation.image_url: "images/placeholder-img.png"} " class="item-img" border="0" alt="profile-image">
	      <div class="item-details">
	        <a href="${recommendation.yelp_url}"><h3>${recommendation.businessName}</h3></a>
	      	<p>${recommendation.recommendation}</p>
	      <div class="item-type ${recommendation.businessType}"><p>${recommendation.businessType}</p></div>
	    </div>

      <div class="vote">
        <img src="images/upvote-button.png" height="36px" id="up-arrow" border="0" alt="upvote arrow">
        <span class="vote-count">0</span>
        <img src="images/downvote-button.png" height="36px" id="down-arrow" border="0" alt="downvote arrow">
      </div>

      <div class="clear"></div>
    </div>`;
}

function renderResults(recommendations) {
  const results = recommendations.map((item, index) => result(item, index));
  $(".profile-feed").html(results);
}

function hamburger() {
  $(".hamburger").click(function(event) {
    console.log("test");
    $(".hamburger-dropdown").toggle();
  });
}

hamburger();