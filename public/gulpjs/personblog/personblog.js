$(document).ready(function() {
	$(document).on('click', "#deleteBlog", function() {
		if (confirm("即将删除本条博文")) {
			var blogId = $(this).closest(".row").find("#blogId").val();
			if (blogId) {
				$.ajax({
					type: "post",
					url: "/deleteBlog",
					datatype: "json",
					data: {
						blogId: blogId
					},
					success: function(data) {
						if (!data.err) {
							location.reload();
						};
					},
					error: function(err) {
						console.log(err);
					}
				})
			} else {
				alert("博文不存在!")
			}
		};
	});
	$(document).on("click", "#rewriteBlog", function() {
		var target = $(this).closest(".row"),
			blogData = {};
		blogData.blogId = target.find("#blogId").val();
		blogData.blogTitle = target.find(".blog-title").text();
		blogData.blogText = target.find(".blogText").attr("data-val");
		sessionStorage.setItem("blogData", JSON.stringify(blogData));
		document.location.href = "/blog?type=rewrite";
	});
});