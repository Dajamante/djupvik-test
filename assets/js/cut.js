$(document).ready(function() {
    $(document).ready(function(e){
			$(".read_more_toggle button").click(function(e){
				/* there was a conflict with swipebox */
				e.stopPropagation();
				$(".read_more").slideToggle(700)

				let target_button = $("#myBtn")[0];

				if(target_button.innerText=="more..."){
					target_button.innerText = "less!"
				}
				else if(target_button.innerText=="less!"){
					target_button.innerText = "more..."
				}
			});
		});
});
