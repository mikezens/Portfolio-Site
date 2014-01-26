function animateScroll(id, speed, offset, timerDelay) {
    var menuOpen = 'nav-opened';
    var menuTrasitioned = 'nav-trasitioned';
    
    var container = '.page-wrapper';
    var $container = $(container);
    
    
    speed = speed?speed:500;
    offset = offset?offset:2;
    idOffset = id!='#'?$(id).offset().top+offset:0;
    timerDelay = timerDelay?timerDelay:0;
    timerDelay = $container.hasClass(menuOpen) && $container.hasClass(menuTrasitioned)?250:timerDelay;
    
    
    setTimeout(function() {
        $('html,body').animate({
            scrollTop: idOffset
        }, speed);
    }, timerDelay);
}

(function($, window) {
    $('.animate-href').click(function(e) {
        e.preventDefault();
        
        animateScroll($(this).attr('href'), $(this).data('speed'), $(this).data('offset'), $(this).data('delay'));
    });
})(jQuery, window);