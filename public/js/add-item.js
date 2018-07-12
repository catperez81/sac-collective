console.log("add item page");
const YELP_API_KEY =
  "62SPynvgdMjqoIbpDs0cmVmGDIwTEe2NwCzgKJ8YGjOxJO5IqSYBULIq0cwNuv0dVxQvY5P3BqLsxgxjOhlOy9S3Bysr3OyKpkJ_Rv7PFEwnkSRHkKUficpMvXtDW3Yx";
$(function() {
  setFormListener();
});

let state = {
  businesses: [],
  recommendedPlace: ""
};

function setFormListener() {
  $("#item-form").submit(function(event) {
    event.preventDefault();

    let query = {
      term: $(".biz-name").val()
    };

    $.ajax({
      url: "/api/yelp",
      data: query,
      error: function(error) {
        console.log("error", error);
      },
      success: function(businesses) {
        console.log(businesses);
        state.businesses = businesses;
        renderResults(state.businesses);
      },
      // headers: {
      //   Authorization: "Bearer " + YELP_API_KEY
      // },
      type: "GET",
      contentType: "application/json",
      dataType: "json"
    });
  });

  $("#recommendation-form").submit(function(event) {
    event.preventDefault();

    let recommendation = {
      businessName: state.recommendedPlace.name,
      businessType: $("#recommendation-form input[type='radio']:checked").val(),
      recommendation: $(".recommendation").val(),
      image_url: state.recommendedPlace.image_url,
      yelp_id: state.recommendedPlace.id,
      yelp_url: state.recommendedPlace.url
    };
    console.log(recommendation);

    $.ajax({
      url: `/api/recommendations/`,
      data: JSON.stringify(recommendation),
      error: function(error) {
        console.log("error", error);
      },
      success: function(data) {
        console.log("created");
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

function result(recommendation, index) {
  return `
		<div class="business-recommendation" data-index="${index}">
      <div class="item-details">
       <img class="business-img" src="${
         recommendation.image_url
       }" class="item-img" border="0" alt="profile-image">
        <h3>${recommendation.name}</h3>
        <p>${recommendation.location.address1}</p>
        <div class="item-type"><p>${recommendation.display_phone}</p></div>
        <div class="add-row">
          <button class="btn btn-default add-button" type="add">Add</button>
        </div>
      </div>
      <div class="clear"></div>
    </div>`;
}

function renderResults(businesses) {
  const results = businesses.map((item, index) => result(item, index));
  $(".results").html(results);
}

function hamburger() {
  $(".hamburger").click(function(event) {
    console.log("test");
    $(".hamburger-dropdown").toggle();
  });
}

hamburger();
businessClick();

function businessClick() {
  $(".results").on("click", ".business-recommendation", function(event) {
    $(".selected").html("<h1>Currently recommending: </h1> ");
    $(".selected").append($(this));
    $(".results").hide();
    $("#item-form").hide();
    $("#recommendation-form").show();
    state.recommendedPlace = state.businesses[$(this).attr("data-index")];
    console.log(state.recommendedPlace);
  });
}
