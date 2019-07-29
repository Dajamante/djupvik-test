$(document).ready(function() {
    $(document).ready(function(e){
			$(".navigation_menu-toggle a").click(function(e){
				/* there was a conflict with swipebox */
				e.stopPropagation();
				$(".navigation_menu").slideToggle(700)
			});
		});
});


$(document).ready(function () {
	/* Basic Gallery */
	$('.swipebox').swipebox({
		removeBarsOnMobile: false, // false will show top bar on mobile devices
		hideBarsDelay: 30000, // delay before hiding bars on desktop
		loopAtEnd: false // true will return to the first image after the last image is reached
	});
});
