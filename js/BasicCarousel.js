/*
 Plugin name : BasicCarousel
 Author : Bouraoui KACEM  ** Front-End Developer
 */
(function ( $ ) {
$.fn.BasicCarousel = function(options) {

    //settings for slider
    var settings = $.extend({
        // These are the defaults.
        animationSpeed: 1000,
        pause: 2000,
        pager: true
    }, options );

    var width = this.width();
    var animationSpeed = settings.animationSpeed;
    var pause = settings.pause ;
    var currentSlide = 1;
    var pager= settings.pager ;
    //cache DOM elements

    var $slider = this;
    var $slides = $('.slide', $slider)
    var $CarouselContainer = $('.slides', $slider);
    $CarouselContainer.css({'width':$slides.length*width+'px'});
    var $slides = $('.slide', $slider)
    var interval;

    function startCarousel() {
        interval = setInterval(function() {
            if(currentSlide==$slides.length)
            {
                currentSlide=0;
            }
            $CarouselContainer.animate({'margin-left': '-'+width*(currentSlide)+"px"}, animationSpeed,"linear", function() {
                if((currentSlide) > $slides.length) {
                    currentSlide = 1;
                    $CarouselContainer.css('margin-left', 0);
                    $('.pager li').removeClass('active');
                    $('.pager li a[href="#'+currentSlide+'"]').parent('li').addClass('active');
                }else
                {
                    ++currentSlide;
                    $('.pager li').removeClass('active');
                    $('.pager li a[href="#'+currentSlide+'"]').parent('li').addClass('active');
                }


            });
        }, pause);
    }
    //Pause the slider
    function pauseCarousel() {
        clearInterval(interval);
    }
    //build pager by creat the pagination items according to the number of slide
    function Pagination()
    {
        var slideNbr=$('#slider .slide').length;
        $('.pager ').append("<ul></ul>");
        for (var i = 1; i < slideNbr+1; i++) {
            if(i==1)
            {
                $('.pager ul').append('<li class="active"><a href="#'+i+'" ></a></li>');
            }else
            {
                $('.pager ul').append('<li><a href="#'+i+'" ></a></li>');
            }
        }


    }
    //Define events for stop and restart  Slider
    $CarouselContainer
        .on('mouseenter', pauseCarousel)
        .on('mouseleave', startCarousel);
    //Creat the pagination items and bind click event if option.pager is equal to true
    if(pager )
    {
        //the pagination items
        Pagination();
        //bind click event
        $('.pager li').bind('click',function(){
            pauseCarousel();
            currentSlide=$(this).find('a').attr('href').split('#')[1];
            $('.pager li').removeClass('active');
            $('.pager li a[href="#'+currentSlide+'"]').parent('li').addClass('active');
            currentSlide=currentSlide-1;
            $CarouselContainer.animate({'margin-left': '-'+width*(currentSlide)+"px"}, animationSpeed);
            startCarousel();
        });
    }

    startCarousel();

}
}( jQuery ));
