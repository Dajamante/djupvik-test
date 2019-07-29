$(document).ready(function() {
    $(document).ready(function(e){
			$(".read_more_toggle button").click(function(e){
				/* there was a conflict with swipebox */
				e.stopPropagation();
				$(".read_more").slideToggle(700)
			});
		});
});
