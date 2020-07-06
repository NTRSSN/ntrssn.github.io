$(document).ready(function () {
    $('.team > li').click(e => {
        $(this).find('.triangle-icon').toggleClass('active');
        $(this).children("ul").slideToggle();
        event.stopPropagation();
    });
});