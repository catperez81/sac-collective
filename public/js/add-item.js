console.log("add item page");
const YELP_API_KEY =
  "62SPynvgdMjqoIbpDs0cmVmGDIwTEe2NwCzgKJ8YGjOxJO5IqSYBULIq0cwNuv0dVxQvY5P3BqLsxgxjOhlOy9S3Bysr3OyKpkJ_Rv7PFEwnkSRHkKUficpMvXtDW3Yx";
$(function() {
  setFormListener();
});

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
        renderResults(businesses);
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
      // businessName: $(".biz-name").val(),
      businessType: "coffee",
      recommendation: $(".recommendation").val()
    };

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
		<div class="business-recommendation">
      <img class="business-img" src="${
        recommendation.image_url
      }" class="item-img" border="0" alt="profile-image">
      <div class="item-details">
        <h3>${recommendation.name}</h3>
        <p>${recommendation.location.address1}</p>
        <div class="item-type"><p>${recommendation.display_phone}</p></div>
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
    $(".selected").html($(this));
    $(".results").hide();
    $("#item-form").hide();
    $("#recommendation-form").show();
  });
}
