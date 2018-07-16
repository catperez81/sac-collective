console.log("find friends page");

$(function() {
  setFormListener();
});

function setFormListener() {
  $("#find-friends-form").submit(function(event) {
    event.preventDefault();

    let search = {
      query: $(".search").val()
    };

    $.ajax({
      url: `/api/users/`,
      data: search,
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
  });
}

function result(friend, index) {
  return `
    		<div class="friend">
    	    <div class="friend-details">
            <img src="images/cat-profile.png" border="0" alt="profile-image" class="friend-img">
    	      <p class="friend-name">${friend.name}</p>
    	      <p class="friend-email">${friend.email}</p>
            <div class="follow-button">
              <button class="btn btn-default follow-friend">Follow</button>
            </div>
          </div>
        </div>`;
}

function renderResults(friends) {
  const results = friends.map((item, index) => result(item, index));
  $("#friend-results").show();
  $("#friend-results").html(results);
}
