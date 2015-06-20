/*
  Plugin name : BasicCarousel 
  Author : Bouraoui KACEM  ** Front-End Developer
*/ 
 
 $.fn.BasicCarousel = function(option) {

      //settings for slider
	  
   
    //Default settings for slider
    var width = $('#slider').width();
    var animationSpeed = option.animationSpeed ||1000;
    var pause = option.pause || 2000;
    var currentSlide = 1;

    //cache DOM elements
	
    var $slider = this;
    var $slideContainer = $('.slides', $slider);
	    $slideContainer.css({'width':width*100+'%'});
    var $slides = $('.slide', $slider)
    var interval;

    function startSlider() {
        interval = setInterval(function() {
		    if(currentSlide==$slides.length)
			{
			   currentSlide=0;
			}
		    $slideContainer.animate({'margin-left': '-'+width*(currentSlide)+"px"}, animationSpeed, function() {
			    if((currentSlide) > $slides.length) {
				   currentSlide = 1;
                   $slideContainer.css('margin-left', 0);
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
    function pauseSlider() {
        clearInterval(interval);
    }
    //build pager
	function Pagination()
	{
	  var slideNbr=$('#slider .slide').length;
	  $('.pager ').append("<ul></ul>");
	  for (i = 1; i < slideNbr+1; i++) { 
	  
         $('.pager ul').append('<li><a href="#'+i+'" ></a></li>');
		   
       }
	  
	
	}
	Pagination();
    $slideContainer
        .on('mouseenter', pauseSlider)
        .on('mouseleave', startSlider);
	
     $('.pager li').bind('click',function(){
	        pauseSlider();
	        currentSlide=$(this).find('a').attr('href').split('#')[1];
		    $('.pager li').removeClass('active');
		    $('.pager li a[href="#'+currentSlide+'"]').parent('li').addClass('active');
		    currentSlide=currentSlide-1;
			$slideContainer.animate({'margin-left': '-'+width*(currentSlide)+"px"}, animationSpeed);
			startSlider();		
	 });
    startSlider();

}
