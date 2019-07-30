$(document).ready(function() {
    $(document).ready(function(e){
			$(".read_more_toggle button").click(function(e){
				/* there was a conflict with swipebox */
				e.stopPropagation();
				$(".read_more").slideToggle(700)
				let target_button = $("#myBtn")[0];
				if($(".read_more").is(':visible')){
					target_button.innerText = "Read less"
				}
				else{
					target_button.innerText = "Read more"
				}
			});
		});
});
