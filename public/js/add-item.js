console.log("add item page");



$(function() {
  setFormListener()
});


function setFormListener(){

  $("#recommendation-form").submit(function(event){
    event.preventDefault();

    let recommendation = {
      businessName: $(".search").val(),
      businessType: "coffee",
      recommendation:  $(".great-for").val()
    }

    $.ajax({
      url: `/api/recommendations/`,
      data:  JSON.stringify(recommendation),
      error: function(error) {
        console.log('error', error);
      },
      success: function(data) {
        console.log("created")
        location.replace('/feed.html');
      },
      // headers: {
      //   'Authorization': 'Bearer ' + authToken
      // },
     type: 'POST',
      contentType: 'application/json',
      dataType: "json",
    });

  })
}
