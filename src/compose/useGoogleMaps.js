import lodashEach from 'lodash/each'

export default function () {
  // function gPlaceFromLocation(gLocation) {
  //   var geocoder = new google.maps.Geocoder()
  //   // var that = this
  //   let gPlace = {}
  //   geocoder.geocode(
  //     {
  //       latLng: gLocation.latLng,
  //     },
  //     function (results, status) {
  //       if (status === google.maps.GeocoderStatus.OK) {
  //         if (results[0]) {
  //           gPlace = results[0]
  //           // let newAddressDetails = that.getAddressFromPlaceDetails(
  //           //   results[0]
  //           // )
  //           // that.$emit("updatePropAddress", newAddressDetails)
  //         } else {
  //           // alert("No results found");
  //         }
  //       } else {
  //         // alert("Geocoder failed due to: " + status);
  //       }
  //     }
  //   )
  //   return gPlace
  // }
  function getAddressFromPlaceDetails(gPlaceDetails) {
    const newAddressFromMap = {}
    if (gPlaceDetails.geometry) {
      newAddressFromMap.street_address = gPlaceDetails.formatted_address
      // below is to support cases where jsonapi is used on the server:
      newAddressFromMap['street-address'] = gPlaceDetails.formatted_address
      // this.agencyAddress.google_place_id = gPlaceDetails.place_id
      // this.agencyAddress.latitude = gPlaceDetails.geometry.location.lat()
      // this.agencyAddress.longitude = gPlaceDetails.geometry.location.lng()
      newAddressFromMap.google_place_id = gPlaceDetails.place_id
      newAddressFromMap.latitude = gPlaceDetails.geometry.location.lat()
      newAddressFromMap.longitude = gPlaceDetails.geometry.location.lng()
      lodashEach(
        gPlaceDetails.address_components,
        function (addressComponent, i) {
          // iterate through addressComponent array
          console.log('addressComponent:' + i)
          console.log(newAddressFromMap)
          if (addressComponent.types[0] === 'route') {
            // console.log(i + ": route:" + addressComponent.long_name)
            newAddressFromMap.street_name = addressComponent.long_name
          }
          if (addressComponent.types[0] === 'locality') {
            // console.log("town:" + addressComponent.long_name)
            newAddressFromMap.city = addressComponent.long_name
          }
          if (addressComponent.types[0] === 'country') {
            // console.log("country:" + addressComponent.long_name)
            newAddressFromMap.country = addressComponent.long_name
          }
          if (addressComponent.types[0] === 'postal_code_prefix') {
            // console.log("pc:" + addressComponent.long_name)
            // newAddress.postalCode = addressComponent.long_name
          }
          if (addressComponent.types[0] === 'postal_code') {
            // console.log("pc:" + addressComponent.long_name)
            newAddressFromMap['postal-code'] = addressComponent.long_name
            newAddressFromMap.postal_code = addressComponent.long_name
          }
          if (addressComponent.types[0] === 'street_number') {
            // console.log("street_number:" + addressComponent.long_name)
            newAddressFromMap['street-number'] = addressComponent.long_name
            newAddressFromMap.street_number = addressComponent.long_name
          }
          if (addressComponent.types[0] === 'administrative_area_level_1') {
            // eg: andalucia
            console.log(
              'administrative_area_level_1:' + addressComponent.long_name
            )
            // newAddress.province = addressComponent.long_name
            newAddressFromMap.region = addressComponent.long_name
          }
          if (addressComponent.types[0] === 'administrative_area_level_2') {
            console.log(
              'administrative_area_level_1:' + addressComponent.long_name
            )
            // newAddress.aal2 = addressComponent.long_name
          }
          if (addressComponent.types[0] === 'administrative_area_level_3') {
            console.log(
              'administrative_area_level_1:' + addressComponent.long_name
            )
            // newAddress.aal3 = addressComponent.long_name
          }
          if (addressComponent.types[0] === 'administrative_area_level_4') {
            console.log(
              'administrative_area_level_1:' + addressComponent.long_name
            )
            // newAddress.aal4 = addressComponent.long_name
          }
          // return false // break the loop
        }
      )
    }
    return newAddressFromMap
  }

  return {
    // gPlaceFromLocation,
    getAddressFromPlaceDetails,
  }
}
