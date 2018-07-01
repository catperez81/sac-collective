console.log("feed page");

const settings = {
    url: '/api/recommendations',
    dataType: "json",
    type: "GET",
    success: function(response) {
      console.log(response);
      renderResults(response)
    },
    error: function(error) {
      console.log(error);
    }
  };

  $.ajax(settings);

  function renderResults() {
    const results = settings.map((item, index) => renderResults(item, index));
    $(".feed").html(results);
    let totalResults = results.length;
		return `
      <div class="collection-item">
        <img src="images/placeholder-img.png" class="item-img" border="0" alt="profile-image">
        <div class="item-details">
          <h3 class="biz-name">${results.businessName}</h3>
          <p class="biz-type">${results.businessType}</p>
          <p class="recommendation">${results.recommendation}</p> 
        </div>
	      <div class="posted-by">
	        <img src="images/cat-profile.png" height="50px" border="0" alt="profile-image" class="posted-by-img">
	        <div class="friend-details">
	          <h3 class="friend-name">Jan Janetson</h3>
	          <p class="time-stamp">June 27, 2018</p>
	        </div>
	      </div>
	    </div>
  	<br>`;
  }

  renderResults();
