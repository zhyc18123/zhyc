$(function() {
	$(document).on("click", "#logoutLink", function() {
		$.ajax({
			type: "post",
			url: "/logout",
			datatype: "json",
			success: function(data) {
				if (!data.err) {
					location.reload();
				}
				console.log(data);
			},
			error: function(err) {
				console.log(err);
			}
		})
	});
	$(document).on("click", "#login", function(e) {
		e.preventDefault();
		$.ajax({
			type: "post",
			url: "/login",
			datatype: "json",
			data: $("#userForm").serialize(),
			success: function(data) {
				console.log(data);
				var $tip = $("#tip");
				if (data.err) {
					$tip.text(data.msg);
					$tip.removeClass("hide");
				} else {
					history.back();
				}
			},
			error: function(err) {
				console.log(err);
			}
		})
	});
	$(document).on("click", "#register", function(e) {
		e.preventDefault();
		$.ajax({
			type: "post",
			url: "/register",
			datatype: "json",
			data: $("#userForm").serialize(),
			success: function(data) {
				console.log(data);
				var $tip = $("#tip");
				if (data.err) {
					$tip.text(data.msg);
					$tip.removeClass("hide");
				} else {
					// history.back();
				}
			},
			error: function(err) {
				console.log(err);
			}
		})
	});
})