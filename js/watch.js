$(function(){function a(a){function b(a){a.toggleClass("icon-muted"),a.toggleClass("icon-eye-off"),a.toggleClass("icon-eye"),a.hasClass("icon-muted")?a.attr("title",Messages.get("validation.follow_post")):a.attr("title",Messages.get("validation.cancel_follow_post"))}a.preventDefault();var c=$(this),d=c.find("span");$.ajax({url:c.attr("href"),method:"POST",beforeSend:function(){b(d)},error:function(a){errorPopup(Messages.get("error.occured"),c,"center-popup"),console.log(a)}})}$(".watch").on("click",a)});