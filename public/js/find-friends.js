console.log("find friends page");

$(function() {
  setFormListener();
  getUsers();
});

function getUsers(searchTerm) {
  $.ajax({
    url: `/api/users/`,
    // data: JSON.stringify({
    //   query: $(".search").val()
    // }),
    error: function(error) {
      console.log("error", error);
    },
    success: function(data) {
      console.log(data);
      renderResults(data);
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
    success: function(data) {
      console.log(data);
      alert(data);
    },

    headers: {
      Authorization: "Bearer " + authToken
    },
    type: "POST",
    contentType: "application/json",
    dataType: "json"
  });
}

$("#friend-results").on("click", ".follow-friend", function() {
  var id = $(this).attr("data-id");
  followFriend(id);
});

function result(friend, index) {
  return `
  <div class="friend-square">
    <div class="friend-img" style="background-image:url(${
      friend.image
    })"> </div>
    <p class="friend-name">${friend.name}</p>
    <button id=${friend.id} class="btn btn-default follow-friend" data-id="${
    friend.id
  }">Follow</button>
  </div>`;
}

function renderResults(friends) {
  const results = friends.map((item, index) => result(item, index));
  $("#friend-results").show();
  $("#friend-results").html(results);
}
