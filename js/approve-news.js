$(".approve-news").click(function(a){a.preventDefault();var b=$(this);$.post(b.attr("href"),function(){b.closest(".post-item").removeClass("post-under-review"),b.remove()})});