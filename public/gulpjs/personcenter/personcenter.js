$(function() {
	$("#userForm").on("change", "input", function(e) {
		// e.preventDefault ();
		$(".userTip").removeClass("bg-success").addClass("bg-warning").text("信息未保存!");
	})
})