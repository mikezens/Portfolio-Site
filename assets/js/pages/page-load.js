// Preload
(function($) {
	var imgList = [];
	$.extend({
		preload: function(imgArr, option) {
			var setting = $.extend({
				init: function(loaded, total) {},
				loaded: function(img, loaded, total) {},
				loaded_all: function(loaded, total) {}
			}, option);
			var total = imgArr.length;
			var loaded = 0;
			
			setting.init(0, total);
			for(var i in imgArr) {
				imgList.push($("<img />")
					.attr("src", imgArr[i])
					.load(function() {
						loaded++;
						setting.loaded(this, loaded, total);
						if(loaded == total) {
							setting.loaded_all(loaded, total);
						}
					})
				);
			}
			
		}
	});
})(jQuery);


$(function() {
    var logoImg = $('.hdr-main h1 img').attr('src'),
        featureOne = $('.hdr-feature .-first img').attr('src'),
        featureTwo = $('.hdr-feature .-second img').attr('src'),
        featureThree = $('.hdr-feature .-last img').attr('src'),
        featureTimeout = 1100,
        device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    
    $.preload([logoImg, featureOne, featureTwo, featureThree], {
		loaded: function(img, loaded, total) {
            if(loaded == total) {
                $(".hdr-loading").fadeOut(250, function() {
                    
                    $(".hdr-main .hdr-animate").addClass('-animated');
                    $(".hdr-main .hdr-feature img").addClass('-sliden');
                    
                    setTimeout(function() {
                        $(".load-content").addClass('-animated');
                        $(".slide-nav .nav-animate").show();
                    }, featureTimeout);
                });
            }
            
            if($(window).width() > '768' && !device) {
                setTimeout(function() {
                    $('html').jackInTheBox({
                        boxClass: 'load-content',
                        animateClass: '-removed',
                        offset: 0
                    });
                    
                    $('body').jackInTheBox({
                        boxClass: 'animate-box',
                        animateClass: '-animated',
                        offset: 0
                    });
                }, featureTimeout);
            } else {
                setTimeout(function() {
                $('.load-content').addClass('-removed');
                $('.animate-box').addClass('-animated');
                }, featureTimeout);
            }
		}
	});
});