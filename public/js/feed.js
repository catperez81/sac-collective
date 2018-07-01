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
    const results = state.doctors.map((item, index) => renderDoctor(item, index));
    $(".doctors").html(results);
    let totalResults = results.length;
    var html = `
      <div class="results">
        <p class="total-results">We've found ${totalResults} doctors</p>
      </div>`;
    $(".total-results").html(html);
    if (state.doctors.length === 0) {
      $(".total-results").html(
        "Sorry, we could not find any doctors. Try another search."
      );
    }
  }

  function renderDoctor(doctor, index) {
    let distance = Math.round(doctor.practices[0].distance);
    let doctorSpecialties = doctor.specialties.map(function(specialty, index) {
      return `<span>${specialty.name}</span>`;
    });
    return `
      <div class="results">
        <div class="card-content">
          <div class="doc-image">
            <img src="${doctor.profile.image_url}" class="img-circle">
          </div>
          <div class="doctor-info">
            <h3>${doctor.profile.first_name} ${doctor.profile.last_name}</h3>
            <p>${doctor.profile.gender}</p>
            <p>${doctor.practices[0].visit_address.street},
               ${doctor.practices[0].visit_address.city},
               ${doctor.practices[0].visit_address.state_long}</p>
            <p>${distance} miles away</p>
            <p>${doctor.specialties[0] ? doctor.specialties[0].name : ""}</p>
          </div>
          <div class="doctor-profile-button">
            <button data-index="${index}" class="doctor-profile type="button">View profile</button>
          </div>
        </div>
      </div>
    <br>`;
  }
