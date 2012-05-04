(function($){  
	$.fn.pxscrollingtabs = function(options) {  

		var defaults = {  
			jumpSize: 100  
		};  
		
		var options = $.extend(defaults, options);  

		return this.each(function() {   

			var iPosition = 0;
			var oPrev = $('.px-prev');
			var oNext = $('.px-next');	
			var iContainerWidth = Math.ceil($('.px-tabs').outerWidth());
			var iTabFirstOffset = Math.ceil($('.tabs li:first').offset().left);
			var iTabLastOffset = Math.ceil($('.tabs li:last').offset().left);
			var iFinalTabWidth = Math.ceil($('.tabs li:last').outerWidth());
			var iLeftLimit = -1 * (iTabLastOffset - iTabFirstOffset - iContainerWidth + iFinalTabWidth) ;	
			
			//Enable disable buttons
			if(iTabLastOffset < iContainerWidth){
				oNext.addClass('disabled-next');
			}
			oPrev.addClass('disabled-prev');
				
			var t = setTimeout(function(){ 
				//event.preventDefault();
				if(Math.ceil($('.tabs').position().left) < 0 ){
					iPosition += options.jumpSize;
					moveTabs(iPosition);
				}
			}, 200);			
			
			oPrev.live("click", function(event) {
				clearTimeout(t); // clears previous timeout
				t = setTimeout(function(){ 
					event.preventDefault();
					if(Math.ceil($('.tabs').position().left) < 0 ){
						iPosition += options.jumpSize;
						moveTabs(iPosition);

					}
				}, 200); //set new timeout
			});
			
			oNext.live("click", function(event) {
				event.preventDefault();
				if(Math.ceil($('.tabs').position().left) > iLeftLimit ){
					iPosition -= options.jumpSize;
					moveTabs(iPosition);
				}
			});    

			function moveTabs(iTabLeft){
				$('.tabs').stop().animate({
					left: iTabLeft,
					queue: false
				}, 500, function() {
					if(iPosition < 0){
						oPrev.removeClass('disabled-prev');
					} else {
						oPrev.addClass('disabled-prev');
					}
					if(iPosition > iLeftLimit){
						oNext.removeClass('disabled-next');
					} else {
						oNext.addClass('disabled-next');
					}				
				});
			
			}
		
			$('.tabs li a').live("click", function(event) {
		      $(this).parent().toggleClass('selected');
		      $('.tabs li a').not(this).parent().removeAttr('class');
			  return false;
		    });
			
		});  
    };  
})(jQuery);  