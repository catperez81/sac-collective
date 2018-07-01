console.log("feed page");

const settings = {
    url: '/api/recommendations',
    dataType: "json",
    type: "GET",
    success: function(response) {
      console.log(response);
    },
    error: function(error) {
      console.log(error);
    }
  };

  $.ajax(settings);
