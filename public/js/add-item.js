console.log("add item page");

$(function() {
  setFormListener()
});


function setFormListener(){

  $("#recommendation-form").submit(function(event){
    event.preventDefault();

    let recommendation = {
      businessName: $(".biz-name").val(),
      businessType: "coffee",
      recommendation: $(".recommendation").val()
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

function hamburger(){
 $(".hamburger").click(function(event){
    console.log('test');
    $(".hamburger-dropdown").toggle();
  });
}

hamburger();