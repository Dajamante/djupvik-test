$(document).ready(function() {
    $(document).ready(function(e){
			$(".read_more_toggle button").click(function(e){
				/* there was a conflict with swipebox */
				e.stopPropagation();
				$(".read_more").slideToggle(700)

				let target_button = $("#myBtn")[0];

				if(target_button.innerText=="Read more"){
					target_button.innerText = "Read less"
				}
				else if(target_button.innerText=="Read less"){
					target_button.innerText = "Read more"
				}
			});
		});
});
