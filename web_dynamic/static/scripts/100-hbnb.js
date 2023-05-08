$(document).ready(function () {
  const states = {};
  const cities = {};
  const amenities = {};

  // filter places by states
  $(".locations .popover>ul>li>input[type='checkbox']").change(function () {
    const stateName = $(this).attr('data-name');
    const stateId = $(this).attr('data-id');

    if ($(this).is(':checked')) {
      states[stateName] = stateId;
    } else {
      delete states[stateName];
    }

    const statesList = Object.keys(states).sort().join(', ');
    $('div.locations h4').text(statesList);
  });

  // filter places by cities
  $(".locations .popover>ul>li>ul>li>input[type='checkbox']").change(function () {
    const cityName = $(this).attr('data-name');
    const cityId = $(this).attr('data-id');

    if ($(this).is(':checked')) {
      cities[cityName] = cityId;
    } else {
      delete cities[cityName];
    }

    const citiesList = Object.keys(cities).sort().join(', ');
    $('div.locations h4').text(citiesList);
  });

  // filter places by amenities
  $(".amenities li>input[type='checkbox']").change(function () {
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

  // get api status
  // $.getJSON('http://0.0.0.0:5001/api/v1/status/', (data) => {
  $.getJSON('http://127.0.0.1:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  // fetch places through api request
  $.post({
    // url: 'http://0.0.0.0:5001/api/v1/places_search',
    url: 'http://127.0.0.1:5001/api/v1/places_search',
    data: JSON.stringify({}),
    contentType: 'application/json',
    success: (data) => {
      data.forEach(place => {
        const article =
          '<article><div class="title_box"><h2>' +
          place.name +
          '</h2><div class="price_by_night">$' +
          place.price_by_night +
          '</div></div><div class="information"><div class="max_guest">' +
          place.max_guest +
          ' Guests</div><div class="number_rooms">' +
          place.number_rooms +
          ' Bedrooms</div><div class="number_bathrooms">' +
          place.number_bathrooms +
          'Bathrooms</div></div><div class="description">' +
          place.description +
          '</div></article>';
        $('section.places').append(article);
      });
    }
  });

  // filter places by state, city, and amenity
  $('button').on('click', () => {
    const stateIDList = Object.values(states);
    const cityIDList = Object.values(cities);
    const amenityIDList = Object.values(amenities);
    $.post({
      // url: 'http://0.0.0.0:5001/api/v1/places_search',
      url: 'http://127.0.0.1:5001/api/v1/places_search',
      data: JSON.stringify({ states: stateIDList, cities: cityIDList, amenities: amenityIDList }),
      contentType: 'application/json',
      success: (data) => {
        $('section.places').empty();
        data.forEach(place => {
          const article =
            '<article><div class="title_box"><h2>' +
            place.name +
            '</h2><div class="price_by_night">$' +
            place.price_by_night +
            '</div></div><div class="information"><div class="max_guest">' +
            place.max_guest +
            ' Guests</div><div class="number_rooms">' +
            place.number_rooms +
            ' Bedrooms</div><div class="number_bathrooms">' +
            place.number_bathrooms +
            'Bathrooms</div></div><div class="description">' +
            place.description +
            '</div></article>';
          $('section.places').append(article);
        });
      }
    });
  });
});
