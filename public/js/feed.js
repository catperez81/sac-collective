console.log("feed page");

const settings = {
  url: "/api/recommendations",
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
		<div class="posted-by">
    	<img src="images/cat-profile.png" height="50px" border="0" alt="profile-image" class="posted-by-img">
    	<div class="friend-details">
      	<h3 class="friend-name">Jan Janetson</h3>
      	<p class="time-stamp">June 27, 2018</p>
    	</div>
    </div>
		<div class="collection-item">
      <img src="${
        recommendation.image_url
          ? recommendation.image_url
          : "images/placeholder-img.png"
      }" class="item-img" border="0" alt="profile-image">
      <div class="item-details">
        <h3>${recommendation.businessName}</h3>
        <p>${recommendation.recommendation}</p>
        <div class="item-type"><p>${recommendation.businessType}</p></div>
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
  $(".recommendations").html(results);
}
