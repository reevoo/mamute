$(function(){function a(){b($(".simple-ajax-form a"),"click",c),b($(".simple-ajax-form .cancel"),"click",d),b($("form.ajax"),"submit",e)}function b(a,b,c){a.off(b,c),a.on(b,c)}function c(a){a.preventDefault();var b=$(this).siblings(".ajax-form");b.toggleClass("hidden"),b.find(".to-focus").focus(),commentLengthCounter(b.find("form textarea"))}function d(a){a.preventDefault();var b=$(this).closest("form.ajax");f(b,!0)}function e(a){a.preventDefault(),g($(this))}function f(a,b){var c=a.parent();a.removeClass("inactive"),a.find("input[type='submit']").attr("disabled",!1),c.addClass("hidden"),b||a.find(".comment-textarea").val("")}function g(b){if(b.valid()){b.find(".submit").attr("disabled",!0),b.find(".cancel").attr("disabled",!1);var c=function(a){return f(b,!1),400==a.status?void errorPopup(Messages.get("error.occured"),b.parent(),"center-popup"):(errorPopup(Messages.get("error.occured"),b.parent(),"center-popup"),void console.log(a))},d=function(c){var d=$("#"+b.data("ajax-result")),e=b.data("ajax-on-callback")||"replace-inner";"replace-inner"==e?d.html(c):"append"==e?d.append(c):"replace"==e&&d.replaceWith(c),d.removeClass("hidden"),f(b,!1),a()},e=b.attr("action");$.ajax(e,{success:d,error:c,dataType:"html",data:b.serialize(),method:"POST"})}}a()});