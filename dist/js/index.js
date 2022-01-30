'use strict';

//////////////////////// MOBILE NAVBAR ///////////////////
$(document).ready(() => {
  $('.nav__icons').click(() => {
    $('.nav-links--mobile').toggleClass('nav-links--mobile--toggled');
    $('.nav__hamburger').toggleClass('hidden');
    $('.nav__close-icon').toggleClass('hidden');
    // Disable scroll
    $('body, html').toggleClass('disable-scroll');
  });

  $('body').click(e => {
    if (e.target.classList.contains('nav__hamburger')) return;
    $('.nav-links--mobile').removeClass('nav-links--mobile--toggled');
  });
  //////////////////////////////////////////////////////////

  ////////////////////// SLIDER ////////////////////
  const nextSlide = slideNum => {
    // First hide the prev slide and button
    $('.slide--active').removeClass('slide--active');
    $('.slider__btn--active').removeClass('slider__btn--active');

    // Show the new slide and button
    $(`.slide-${slideNum}`).addClass('slide--active');
    $(`.slider__btn[data-slide="${slideNum}"]`).addClass('slider__btn--active');
  };

  $('.slider__btn-container').click(e => {
    if (!e.target.classList.contains('slider__btn')) return;

    const nextSlideNum = e.target.dataset.slide;

    nextSlide(nextSlideNum);
  });
  ///////////////////////////////////////////////////

  ////////////////////// AUTO SLIDER ON MOBILE SCREEN ///////////////
  if (window.matchMedia('(max-width:1020px)').matches) {
    let currSlide = 1;
    setInterval(() => {
      currSlide === 4 ? (currSlide = 1) : currSlide++;
      nextSlide(currSlide);
    }, 3000);
  }
  ///////////////////////////////////////////////////////////////////

  ////////////////////////////// LEAFLET MAP /////////////////////
  const mapCoords = {
    initial: [33.0, -90.9094],
    mainOffice: [35.952, -83.9919],
    officeII: [29.897, -97.827],
  };

  const smallerThan990 = window.matchMedia('(max-width: 989px)');
  const smallerThan530 = window.matchMedia('(max-width: 529px)');

  let initialZoom = 6;

  if (smallerThan990.matches) initialZoom = 5;
  if (smallerThan530.matches) initialZoom = 4;

  const map = L.map('contact-details__map', {
    center: L.latLng(...mapCoords.initial),
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

  const mainOfficeContent = '<h4>Main Office</h4> 1892 Chenoweth Drive, TN';
  const officeIIContent = '<h4>Office II</h4> 3399 Wines Lane, TX';

  // These variables store an objects with the related marker and popup
  const mainOfficeMarkerPopup = renderMarkerPopup(
    mapCoords.mainOffice,
    mainOfficeContent
  );
  const officeIIMarkerPopup = renderMarkerPopup(
    mapCoords.officeII,
    officeIIContent
  );

  // Contact Office details map btns
  $('.office-details__map-btn').click(e => {
    const coords = mapCoords[e.target.dataset.office];

    map.flyTo(coords, 11, { duration: 1.25 });
  });
  // End of Contact Office details map btns
  //////////////////////////////////////////////////////
});
