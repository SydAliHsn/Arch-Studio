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
});
