console.log("find friends page"); 

$(function() {
  setFormListener()
});


function setFormListener(){

  $("#find-friends-form").submit(function(event){
    event.preventDefault();

    let search = {
      query: $(".search").val()
      }
    
    $.ajax({
      url: `/api/users/`,
      data:  search,
      error: function(error) {
        console.log('error', error);
      },
      success: function(data) {
        console.log(data);
        renderResults(data)
      },

      // headers: {
      //   'Authorization': 'Bearer ' + authToken
      // },
     type: 'GET',
      contentType: 'application/json',
      dataType: "json",
    });
  })
}

function result(friend, index) {
	return `
		<div class="posted-by">
	    <img src="images/cat-profile.png" height="50px" border="0" alt="profile-image" class="posted-by-img">
	    <div class="friend-details">
	      <h3 class="friend-name">${friend.name}</h3>
	      <h3 class="friend-email">${friend.email}</h3>
    	</div>
    </div>`
}

function renderResults(friends) {
  const results = friends.map((item, index) => result(item, index));
  $(".friend-results").html(results);
}