$(function(){$("body").on("click",".show-popup",function(a){a.preventDefault(),$(this).parent().find(".popup").toggle()}),$("body").on("click",".close-popup",function(a){a.preventDefault();var b=$(this);b.hasClass("popup")?b.remove():b.closest(".popup").remove()})});