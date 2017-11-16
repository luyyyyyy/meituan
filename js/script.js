function initNavbar() {
    //jquery 导航插件
    var SCROLL_SPEED = 750;
    var SCROLL_OFFSET = 50;
    var EASING = "swing";

    var $navTop = $("#navbar-top");
    var $navBar = $(".navbar");
    var $navExternal = $(".nav-external");
    
	//滑动定位
    $navBar.onePageNav({
        currentClass: "active",
        changeHash: false,
        scrollSpeed: SCROLL_SPEED,
        scrollOffset: SCROLL_OFFSET,
        scrollThreshold: 0.5,
        filter: ":not(.external)",
        easing: EASING
    });
   //导航栏固定
    $(window).on("scroll", function(event) {

        var scroll = $(window).scrollTop();
        if (scroll >= $("#home").height()) {
            $navBar.addClass("fixed");
        } else {
            $navBar.removeClass("fixed");
        }
    }).trigger("scroll");

    $navExternal.click(function(e) {
        e.preventDefault();
        $("html, body").stop().animate({
            scrollTop: $($(this).attr("href")).offset().top - SCROLL_OFFSET
        }, SCROLL_SPEED, EASING);
    });
}
//action
function initPortfolio() {

    var $portfolio = $("#portfolio");
    var $items = $portfolio.find(".items");
    var $filters = $portfolio.find(".filters li a");
   

   //判断图片记载
    $items.imagesLoaded(function() {
        $items.isotope({
            itemSelector: ".item",
            layoutMode: "fitRows",
            transitionDuration: "0.7s"
        });
    });

    $filters.click(function() {

        var $el = $(this);

        $filters.removeClass("active");

        $el.addClass("active");

        var selector = $el.attr("data-filter");

        $items.isotope({
            filter: selector
        });

    });

	 $('.venobox').venobox({
        framewidth: '700px',
        frameheight: '350px',
        border: '6px',
        bordercolor: '#ba7c36',
        numeratio: false
    })
}

function initAnimations() {
    var $animated = $(".animated");

    $animated.appear({
        force_process: true
    });

    $animated.on("appear", function() {

        var $el = $(this);

        var animation = $el.data("animation");
        var delay = $el.data("delay");

        // Mofile fix
        if ($(window).width() < 768) {
            delay = 0;
        }

        if (delay) {

            setTimeout(function() {
                $el.addClass(animation);
                $el.addClass("showing");
                $el.removeClass("hiding");
            }, delay);
        } else {

            $el.addClass(animation);
            $el.addClass("showing");
            $el.removeClass("hiding");
        }
    });

    // know hover animation
    $(".know").hover(function() {
        $("i", this).addClass("animated tada");
    }, function() {
        $("i", this).removeClass("animated tada");
    });
}

$(document).ready(function() {

    initNavbar();
    initPortfolio();
    initAnimations();
});


