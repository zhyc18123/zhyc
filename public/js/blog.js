$(document).ready(function() {
	var $txtEditor = $("#txtEditor"),
		$blogTitle = $("#blogTitle");
	$txtEditor.Editor();
	// 页面初始化,判断是写博文还是修改博文
	if ($("#finishRewrite")) {
		var blogData = JSON.parse(sessionStorage.getItem("blogData"));
		$txtEditor.Editor("setText", blogData.blogText);
		$blogTitle.val(blogData.blogTitle);
	};
	$("#publish").on('click', function() {
		var blogTitle = $blogTitle.val();
		var blogText = $txtEditor.Editor("getText");
		var data = {
			blogText: blogText,
			blogTitle: blogTitle
		};
		if (blogData.blogId) {
			data.blogId = blogData.blogId;
		};
		console.log(blogData)
		if (blogText && blogTitle) {
			$.ajax({
				type: "post",
				url: "/publish",
				datatype: "json",
				data: data,
				success: function(data) {
					console.log(data);
					if (!data.err) {
						$("#blogTitle").val("");
						$txtEditor.Editor("setText", "");
						alert(data.msg)
					};
				},
				error: function(err) {
					console.log(err);
				}
			})
		} else {
			alert("内容和标题不许为空!")
		}
	});
});