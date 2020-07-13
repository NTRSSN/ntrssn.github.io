const playerContainer = $('.player');
var video = document.getElementById('video');
const muteContainer = $('.player__mute')

$('.player__start').on('click', () => {
    
    if (playerContainer.hasClass('paused')) {
        playerContainer.removeClass('paused');
        video.pause();
    } else {
        playerContainer.addClass('paused');
        video.play();
    }

  });


  // $("video").prop('muted', true);


  $('.player__volume').on('click', () => {
    
    if (muteContainer.hasClass('mute-active')) {
        muteContainer.removeClass('mute-active');
        $("video").prop('muted', false);
    } else {
        muteContainer.addClass('mute-active');
        $("video").prop('muted', true);
    }

  });

// let eventsInit = () => {
//     $('.player__start').click(e => {
//         e.preventDefault();

//         const btn = $(e.currentTarget);

//         playerContainer.addClass('paused');

// };


// eventsInit();