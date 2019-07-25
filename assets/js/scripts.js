$(document).ready(function() {
    $(document).ready(function(e){
			$(".navigation_menu-toggle a").click(function(e){
				e.stopPropagation();
				$(".navigation_menu").slideToggle(700)
			});
		});
});
