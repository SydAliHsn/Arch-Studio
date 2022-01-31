$(document).ready(() => {
  ////////////////////////////// LEAFLET MAP /////////////////////
  //   const mapCoords = {
  //     initial: [33.0, -90.9094],
  //     mainOffice: [35.952, -83.9919],
  //     officeII: [29.897, -97.827],
  //   };

  const mapDetails = {
    initial: {
      coords: [33.0, -90.9094],
    },
    mainOffice: {
      coords: [35.952, -83.9919],
      popupContent: '<h4>Main Office</h4> 1892 Chenoweth Drive, TN',
    },
    officeII: {
      coords: [29.897, -97.827],
      popupContent: '<h4>Office II</h4> 3399 Wines Lane, TX',
    },
  };

  // Giving intital zoom according to the scree size
  const smallerThan990 = window.matchMedia('(max-width: 989px)');
  const smallerThan530 = window.matchMedia('(max-width: 529px)');

  let initialZoom = 6;

  if (smallerThan990.matches) initialZoom = 5;
  if (smallerThan530.matches) initialZoom = 4;
  // End of Giving intital zoom according to the scree size

  //   Initializing the map
  const map = L.map('contact-details__map', {
    center: L.latLng(...mapDetails.initial.coords),
    zoom: initialZoom,
  });

  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic21hbGloYXNzYW4iLCJhIjoiY2t6MDBkbm9mMHpwaDJ2bXZuODlrdDdmaiJ9.t_-Ft50TKtiFl6db8nNx1Q',
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        'pk.eyJ1Ijoic21hbGloYXNzYW4iLCJhIjoiY2t6MDBkbm9mMHpwaDJ2bXZuODlrdDdmaiJ9.t_-Ft50TKtiFl6db8nNx1Q',
    }
  ).addTo(map);
  // End of Initializing the map

  const renderMarkerPopup = (coords, popupContent) => {
    const popup = L.popup({
      closeOnClick: false,
      autoClose: false,
    }).setContent(popupContent);

    const marker = L.marker(coords, { icon: blackIcon });
    marker.addTo(map).bindPopup(popup).openPopup();

    return { popup, marker };
  };

  // Creating a custom icon
  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [28],
    },
  });

  const blackIcon = new LeafIcon({
    iconUrl:
      'https://arch-studio-multi-page-website.vercel.app/assets/icons/map-pin.svg',
  });
  // End of Creating a custom icon

  // These variables store an objects with the related marker and popup
  const mainOfficeMarkerPopup = renderMarkerPopup(
    mapDetails.mainOffice.coords,
    mapDetails.mainOffice.popupContent
  );
  const officeIIMarkerPopup = renderMarkerPopup(
    mapDetails.officeII.coords,
    mapDetails.officeII.popupContent
  );

  // Contact Office details map btns
  $('.office-details__map-btn').click(e => {
    const coords = mapDetails[e.target.dataset.office].coords;

    map.flyTo(coords, 11, { duration: 1.25 });
  });
  // End of Contact Office details map btns
  //////////////////////////////////////////////////////
});
