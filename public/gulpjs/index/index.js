$(function() {
	var init = function() {
		var $blogText = $(".blogText");
		console.log($blogText[0])
		$blogText.html($blogText.data('val'));
	};
	setTimeout(init(), 1000);
})