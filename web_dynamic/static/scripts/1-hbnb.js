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
    $('.amenities h4').text(amenitiesList);
  });
});
