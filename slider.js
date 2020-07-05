const slider = $('.slider').bxSlider({
    pager: false,
    controls: false
});

$('.arrow--direction--prev').click(e => {
    e.preventDefault();
    slider.goToPrevSlide();
})


$('.arrow--direction--next').click(e => {
    e.preventDefault();
    slider.goToNextSlide();
})