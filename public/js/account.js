$(function() {
	$(document).on("click", "#logoutLink", function() {
		var url = window.location.search;
		var loc = url.substring(url.indexOf('/') + 1, url.length);
		var data = {
			redirectUrl: loc
		};
		$.ajax({
			type: "post",
			url: "/logout",
			datatype: "json",
			data: data,
			success: function(data) {
				console.log(data);
			},
			error: function(err) {
				console.log(err);
			}
		})
	});
})