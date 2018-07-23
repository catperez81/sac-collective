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

    	<img src="${
        recommendation.user.image
      }" height="50px" border="0" alt="profile-image" class="posted-by-img">
    	<div class="friend-details">
      	<h3 class="friend-name">${recommendation.user.name}</h3>

      	<p class="time-stamp">${recommendation.creationDate}</p>
    	</div>

    </div>
		<div class="collection-item">
      <div style="background-image: url(${
          recommendation.image_url
            ? recommendation.image_url
            : "images/placeholder-img.png"
        });" class="item-img" border="0" alt="profile-image">
      </div>
      
      <div class="item-details">

        <a href="${recommendation.yelp_url}">
          <h3>${recommendation.businessName}</h3>
        </a>

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
  $(".recommendations").html(results);
}
