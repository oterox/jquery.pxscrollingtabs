(function($){  
	$.fn.pxscrollingtabs = function(options) {  

		var defaults = {  
			jumpSize: 200  
		};  
		
		var options = $.extend(defaults, options);  

		return this.each(function() {   

			var iPosition = 0;
			var iTabJumpSize = 200;
			var oPrev = $('.px-prev');
			var oNext = $('.px-next');

			var iInitialOffset = Math.ceil($('.tabs').offset().left);
			
			var iContainerWidth = Math.ceil($('.px-tabs').outerWidth());
			var iTabFirstOffset = Math.ceil($('.tabs li:first').offset().left);
			var iTabLastOffset = Math.ceil($('.tabs li:last').offset().left);
			var iFinalTabWidth = Math.ceil($('.tabs li:last').outerWidth());

			var iLeftLimit = -1 * (iTabLastOffset - iTabFirstOffset - iContainerWidth + iFinalTabWidth) ;	
			
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
					//console.log ( Math.ceil($('.tabs').offset().left) );
					//console.log ( 'left:' + Math.ceil($('.tabs').position().left) );
				});
			
			}

			$('.tabs li a').live("click", function(event) {
		      $(this).parent().toggleClass('selected');
		      $('.tabs li a').not(this).parent().removeAttr('class');
		    });

		});  
    };  
})(jQuery);  