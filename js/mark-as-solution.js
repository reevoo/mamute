$(function(){function a(a){function b(){c()&&d(g),d(f)}function c(){return e[0]!=h[0]}function d(a){a.toggleClass("solution-container").toggleClass("not-solution-container")}a.preventDefault();var e=$(this),f=$(e).parent(),g=$(".solution-container"),h=$(g).find(".mark-as-solution");$.ajax({url:e.attr("href"),method:"POST",beforeSend:function(){b()},error:function(a){b(),errorPopup(Messages.get("error.occured"),e,"center-popup"),console.log(a)}})}$(".mark-as-solution").on("click",a)});