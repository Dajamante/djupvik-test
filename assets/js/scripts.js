$(document).ready(function() {
    $(document).ready(function(e){
			$(".navigation_menu-toggle a").click(function(e){
				/* there was a conflict with swipebox */
				e.stopPropagation();
				$(".navigation_menu").slideToggle(700)
			});
		});
});

