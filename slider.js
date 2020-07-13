const slider = $('.slider').bxSlider({
    pager: false,
    controls: false
});

$('.arrow--direction--prev').click(e => {
    e.preventDefault();
    slider.goToPrevSlide();
})

$(window).on('resize', () => {
    slider.reloadSlider();
});

$('.arrow--direction--next').click(e => {
    e.preventDefault();
    slider.goToNextSlide();
})