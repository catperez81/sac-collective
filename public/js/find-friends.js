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
      console.log(data);
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

function followFriend(id) {
  $.ajax({
    url: `/api/users/follow`,
    data: JSON.stringify({
      followId: id
    }),
    error: function(error) {
      console.log("error", error);
    },
    success: function(friend) {
      console.log(friend);
      alert("You are now following " + friend.name);
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

$("#follow").on("click", ".follow-friend", function() {
  var id = $(this).attr("data-id");
  followFriend(id);
});

function result(friend, type) {
  let followButton = "";
  if (type === "follow") {
    followButton = `<button id=${
      friend.id
    } class="btn btn-default follow-friend" data-id="${
      friend.id
    }">Follow</button>`;
  }

  return `
  <div class="friend-square">
    <div class="friend-img" style="background-image:url(${
      friend.image
    })"> </div>
    <p class="friend-name">${friend.name}</p>
    ${followButton}
  </div>`;
}

function renderResults(friends, type) {
  const results = friends.map(item => result(item, type));
  $(`#${type}`).show();
  $(`#${type}`).html(results);
  $(`#${type}`).append(`<div class="clear"></div>`);
}
