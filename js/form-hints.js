$(function(){$(".hintable").each(function(a,b){var c=$(b),d=c.data("hint-id"),e=$("label[for="+c.attr("id")+"]"),f=$("<a class='hint-anchor' href='#"+d+"'> ?</a>");f.appendTo(e)});var a=function(a){var b=$("#"+$(a).data("hint-id"));$(b).is(":visible")||($(".hint").hide(),b.fadeIn(500))};$(".hintable").focus(function(){a(this)}),$(".hintable").focusout(function(){var a=$(".answer-form > .hint");a.fadeOut(500)}),$("#question-title").focus()});