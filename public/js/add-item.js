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
      data: JSON.stringify(query),
      error: function(error) {
        console.log("error", error);
      },
      success: function(data) {
        console.log("got data");
        console.log(data);
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

function hamburger() {
  $(".hamburger").click(function(event) {
    console.log("test");
    $(".hamburger-dropdown").toggle();
  });
}

hamburger();
