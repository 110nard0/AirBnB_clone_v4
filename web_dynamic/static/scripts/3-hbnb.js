$(document).ready(function () {
    const amenities = {};
  
    $("li input[type='checkbox']").change(function () {
      const amenityName = $(this).data('name');
      const amenityId = $(this).data('id');
  
      if (this.checked) {
        amenities[amenityName] = amenityId;
      } else {
        delete amenities[amenityName];
      }
  
      const amenitiesList = Object.keys(amenities).sort().join(', ');
      $('div.amenities h4').text(amenitiesList);
    });
  
    $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    });
  
    $.post({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
      },
      success: function (data) {
        data.forEach(function (place) {
          const article = `
            <article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
              </div>
              <div class="description">${place.description}</div>
            </article>
          `;
          $('section.places').append(article);
        });
      },
      dataType: 'json',
    });
  });
