$(function(){function a(a){$(a).closest(".nav").find(".order-by").removeClass("selected"),$(a).addClass("selected")}function b(a){$(a).closest(".pager").find("li").removeClass("current"),$(a).addClass("current")}function c(a,b){var c=$(a).closest(".user-questions").find(".pager");c.find("a").each(function(a,c){var d=$(c).parent();d.removeClass("current"),0==a&&d.addClass("current"),$(c).attr("href",b+"&p="+$(c).html())})}$(".advanced-data-section").on("click",".order-by",function(b){b.preventDefault();var d=$(this),e=d.attr("href"),f=$("#"+d.data("target-id")).parent(),g=f.find(".subheader");a(d);var h=g[0].outerHTML;$.get(e,function(a){f.html(h+a),c(f,e)})}),$(".advanced-data-section").on("click",".pager a",function(a){a.preventDefault();var c=$(this),d=$("#"+c.data("target-id")).parent(),e=d.find(".subheader")[0].outerHTML;$.get(c.attr("href"),function(a){d.html(e+a),b(c.parent())})})});