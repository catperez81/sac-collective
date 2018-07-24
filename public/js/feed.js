$(getPosts);

function getPosts() {
  $.ajax({
    url: "/api/recommendations/feed",
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
  });
}

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
        <div class="item-type ${recommendation.businessType}"><p>${
    recommendation.businessType
  }</p></div>
      </div>

      <div class="vote">
        <img src="images/upvote-button.png"
             height="36px" id="up-arrow"
             border="0"
             data-id=${recommendation.id}
             class="vote-button"
             data-type="upvote"
             alt="upvote arrow">
        <span class="vote-count">${recommendation.vote_score}</span>
        <img src="images/downvote-button.png"
             height="36px" id="down-arrow"
             border="0"
             data-id=${recommendation.id}
             class="vote-button"
             data-type="downvote"
             alt="downvote arrow">
      </div>
      <div class="clear"></div>
    </div>`;
}

$(".recommendations").on("click", ".vote-button", function() {
  var postId = $(this).attr("data-id");
  var type = $(this).attr("data-type");
  vote(postId, type);
});

function vote(postId, type) {
  console.log(postId, type);
  $.ajax({
    url: `/api/recommendations/vote`,
    data: JSON.stringify({
      postId,
      type
    }),
    error: function(error) {
      console.log("error", error);
    },
    success: function(message) {
      console.log(message);
      getPosts();
    },

    headers: {
      Authorization: "Bearer " + authToken
    },
    type: "POST",
    contentType: "application/json",
    dataType: "json"
  });
}

function renderResults(recommendations) {
  const results = recommendations.map((item, index) => result(item, index));
  $(".recommendations").html(results);
  if (results.length === 0) {
    $(".recommendations")
      .html(`Sorry, there are no items recommended yet. <a href="/add-item.html">Add an item</a>
      or <a href="/find-friends.html">Follow friends</a>`);
  }
}
