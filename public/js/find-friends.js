console.log("find friends page");

$(function() {
  setFormListener();
  getUsers("follow");
  getUsers("following");
});

function getUsers(type) {
  $.ajax({
    url: `/api/users/${type}`,
    // data: JSON.stringify({
    //   query: $(".search").val()
    // }),
    error: function(error) {
      console.log("error", error);
    },
    success: function(data) {
      renderResults(data, type);
    },

    headers: {
      Authorization: "Bearer " + authToken
    },
    type: "GET",
    contentType: "application/json",
    dataType: "json"
  });
}

function setFormListener() {
  $("#find-friends-form").submit(function(event) {
    event.preventDefault();
  });
}

function followUnfollowFriend(id, type) {
  $.ajax({
    url: `/api/users/follow`,
    data: JSON.stringify({
      followId: id,
      type
    }),
    error: function(error) {
      console.log("error", error);
    },
    success: function(friend) {
      getUsers("follow");
      getUsers("following");
    },

    headers: {
      Authorization: "Bearer " + authToken
    },
    type: "POST",
    contentType: "application/json",
    dataType: "json"
  });
}

$(".user-results").on("click", ".follow-unfollow-button", function() {
  var id = $(this).attr("data-id");
  var type = $(this).attr("data-type");
  followUnfollowFriend(id, type);
});

function result(friend, type) {
  let buttonText = type === "following" ? "Unfollow" : "Follow";

  return `
  <div class="friend-square">
    <div class="friend-img" style="background-image:url(${
      friend.image
    })"> </div>
    <p class="friend-name">${friend.name}</p>
    <button id=${
      friend.id
    } class="btn btn-default follow-unfollow-button" data-type="${buttonText.toLowerCase()}" data-id="${
    friend.id
  }">${buttonText}</button>
  </div>`;
}

function renderResults(friends, type) {
  const results = friends.map(item => result(item, type));
  $(`#${type}`).show();
  $(`#${type}`).html(results);
  $(`#${type}`).append(`<div class="clear"></div>`);
}

function hamburger() {
  $(".hamburger").click(function(event) {
    console.log("test");
    $(".hamburger-dropdown").toggle();
  });
}

hamburger();
