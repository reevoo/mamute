!function(){var a,b=function(a){$("*:not(.autocomplete)").click(function(){$(".autocompleted-tags").addClass("hidden")}),$.getJSON(ALL_TAGS_URL,function(b){var c=b,d=$(".autocomplete");for(var e in a){var f=a[e];f.forElement(d,c)}})},c=function(){function b(a,b){var d=new RegExp(".*"+a+".*"),e=$(b).map(function(a,b){return b.name.match(d)?b:void 0});return c(e,a)}function c(a,b){return a.sort(function(a,c){return a.name.indexOf(b)-c.name.indexOf(b)}).slice(0,9)}function d(a){return keyboardCtrlAutoCompleteBox=[13,27,37,38,39,40],$.inArray(a,keyboardCtrlAutoCompleteBox)<0}function e(a){return specialCharacters=["+",".","|","$","*","^","(",")"],pattern=specialCharacters.join(""),a=a.replace(new RegExp("(["+pattern+"])","g"),"\\$1")}var f=TAGS_SPLITTER_CHAR,g=function(a){a.removeClass("hidden"),setLoading(a)},h=function(a,c,d,e){void 0!=c&&c!=f&&c&&(suggestions=b(c,e),i(suggestions,a))},i=function(a,b){if(0!=a.length){var c="";$(a).each(function(a,b){c+="<li class='complete-tag'><a class='tag-brutal'>"+b.name+"</a> x "+b.usageCount,c+="<div class='tag-description'>"+b.description+"</div></li>"}),$(b).html(c).removeClass("hidden"),$(".autocompleted-tags .complete-tag").click(function(){var a=$(this);j(a.find(".tag-brutal").text())})}else b.addClass("hidden")},j=function(a){var b=$("input[name=tagNames]"),c=b.val(),d=c.split(f);d=d.slice(0,d.length-1),d.push(a),b.val(d.join(f)+f),$(b).valid(),b.focus(),$(".autocompleted-tags").html("")};return{forElement:function(b,c){b.keyup(function(b){var i=$(this),j=$("#"+i.data("autocomplete-id")),k=$(i.val().split(f)).last().get(0);return k?void(d(b.which)&&(g(j),clearTimeout(a),a=setTimeout(function(){h(j,e(k),i,c)},100))):void j.addClass("hidden")})}}},d=function(){return{forElement:function(a){pos=-3,a.keydown(function(a){arrow={left:37,up:38,right:39,down:40},control={esc:27,enter:13};var b=$(".complete-tag");switch(a.which){case arrow.down:pos<b.length-3&&(pos+=3);break;case arrow.up:pos>0&&(pos-=3);break;case arrow.right:pos<b.length-1&&pos++;break;case arrow.left:pos>0&&pos--;break;case control.enter:a.preventDefault(),b.eq(pos).click(),pos=-3,$(".autocompleted-tags").addClass("hidden");case control.esc:$(".autocompleted-tags").addClass("hidden");break;default:return}b.removeClass("tag-selected"),b.eq(pos).addClass("tag-selected")})}}},e=function(){var a=TAGS_SPLITTER_CHAR;return{forElement:function(b,c){function d(a,b){return b=[],a.each(function(a,c){""!=c&&e(f,c)&&e(b,c)&&b.push(c)}),b}function e(a,b){return a.indexOf(b)<0}var f=$.makeArray($(c).map(function(a,b){return b.name})),g=[];$.validator.addMethod("only-existent-tags",function(b,c){var e=$($(c).val().split(a));g=d(e,g);var f=g.length<=0;return f},function(){return Messages.get("validation.use_only_existing_tags")+"<b>"+g+"</b>"})}}},f=[new c,new d];"true"==ANYONE_CAN_CREATE_TAGS&&f.push(new e),new b(f)}();