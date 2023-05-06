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
 
  // get API status
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
