(function(){function a(a){this.tokens=[],this.tokens.links={},this.options=a||h.defaults,this.rules=i.normal,this.options.gfm&&(this.rules=this.options.tables?i.tables:i.gfm)}function b(a,b){if(this.options=b||h.defaults,this.links=a,this.rules=j.normal,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.rules=this.options.breaks?j.breaks:j.gfm:this.options.pedantic&&(this.rules=j.pedantic)}function c(a){this.tokens=[],this.token=null,this.options=a||h.defaults}function d(a,b){return a.replace(b?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function e(a,b){return a=a.source,b=b||"",function c(d,e){return d?(e=e.source||e,e=e.replace(/(^|[^\[])\^/g,"$1"),a=a.replace(d,e),c):new RegExp(a,b)}}function f(){}function g(a){for(var b,c,d=1;d<arguments.length;d++){b=arguments[d];for(c in b)Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c])}return a}function h(b,e){try{return e&&(e=g({},h.defaults,e)),c.parse(a.lex(b,e),e)}catch(f){if(f.message+="\nPlease report this to https://github.com/chjj/marked.",(e||h.defaults).silent)return"<p>An error occured:</p><pre>"+d(f.message+"",!0)+"</pre>";throw f}}var i={newline:/^\n+/,fences:f,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:f,lheading:/^([^\n]+)\n *(=|-){3,} *\n*/,blockquote:/^( *>[^\n]+(\n[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:f,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};i.bullet=/(?:[*+-]|\d+\.)/,i.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,i.item=e(i.item,"gm")(/bull/g,i.bullet)(),i.list=e(i.list)(/bull/g,i.bullet)("hr",/\n+(?=(?: *[-*_]){3,} *(?:\n+|$))/)(),i._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|@)\\b",i.html=e(i.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,i._tag)(),i.paragraph=e(i.paragraph)("hr",i.hr)("heading",i.heading)("lheading",i.lheading)("blockquote",i.blockquote)("tag","<"+i._tag)("def",i.def)(),i.normal=g({},i),i.gfm=g({},i.normal,{fences:/^ *(`{3,}|~{3,}) *(\w+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,paragraph:/^/}),i.gfm.paragraph=e(i.paragraph)("(?!","(?!"+i.gfm.fences.source.replace("\\1","\\2")+"|")(),i.tables=g({},i.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),a.rules=i,a.lex=function(b,c){var d=new a(c);return d.lex(b)},a.prototype.lex=function(a){return a=a.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(a,!0)},a.prototype.token=function(a,b){for(var c,d,e,f,g,h,j,k,l,a=a.replace(/^ +$/gm,"");a;)if((e=this.rules.newline.exec(a))&&(a=a.substring(e[0].length),e[0].length>1&&this.tokens.push({type:"space"})),e=this.rules.fences.exec(a))a=a.substring(e[0].length),this.tokens.push({type:"code",lang:e[2],text:e[3]});else if(e=this.rules.heading.exec(a))a=a.substring(e[0].length),this.tokens.push({type:"heading",depth:e[1].length,text:e[2]});else if(b&&(e=this.rules.nptable.exec(a))){for(a=a.substring(e[0].length),h={type:"table",header:e[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:e[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:e[3].replace(/\n$/,"").split("\n")},k=0;k<h.align.length;k++)h.align[k]=/^ *-+: *$/.test(h.align[k])?"right":/^ *:-+: *$/.test(h.align[k])?"center":/^ *:-+ *$/.test(h.align[k])?"left":null;for(k=0;k<h.cells.length;k++)h.cells[k]=h.cells[k].split(/ *\| */);this.tokens.push(h)}else if(e=this.rules.lheading.exec(a))a=a.substring(e[0].length),this.tokens.push({type:"heading",depth:"="===e[2]?1:2,text:e[1]});else if(e=this.rules.hr.exec(a))a=a.substring(e[0].length),this.tokens.push({type:"hr"});else if(e=this.rules.blockquote.exec(a))a=a.substring(e[0].length),this.tokens.push({type:"blockquote_start"}),e=e[0].replace(/^ *> ?/gm,""),this.token(e,b),this.tokens.push({type:"blockquote_end"});else if(e=this.rules.list.exec(a)){for(a=a.substring(e[0].length),f=e[2],this.tokens.push({type:"list_start",ordered:f.length>1}),e=e[0].match(this.rules.item),c=!1,l=e.length,k=0;l>k;k++)h=e[k],j=h.length,h=h.replace(/^ *([*+-]|\d+\.) +/,""),~h.indexOf("\n ")&&(j-=h.length,h=this.options.pedantic?h.replace(/^ {1,4}/gm,""):h.replace(new RegExp("^ {1,"+j+"}","gm"),"")),this.options.smartLists&&k!==l-1&&(g=i.bullet.exec(e[k+1])[0],f===g||f.length>1&&g.length>1||(a=e.slice(k+1).join("\n")+a,k=l-1)),d=c||/\n\n(?!\s*$)/.test(h),k!==l-1&&(c="\n"===h[h.length-1],d||(d=c)),this.tokens.push({type:d?"loose_item_start":"list_item_start"}),this.token(h,!1),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(e=this.rules.html.exec(a))a=a.substring(e[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:"pre"===e[1],text:e[0]});else if(b&&(e=this.rules.def.exec(a)))a=a.substring(e[0].length),this.tokens.links[e[1].toLowerCase()]={href:e[2],title:e[3]};else if(b&&(e=this.rules.table.exec(a))){for(a=a.substring(e[0].length),h={type:"table",header:e[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:e[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:e[3].replace(/(?: *\| *)?\n$/,"").split("\n")},k=0;k<h.align.length;k++)h.align[k]=/^ *-+: *$/.test(h.align[k])?"right":/^ *:-+: *$/.test(h.align[k])?"center":/^ *:-+ *$/.test(h.align[k])?"left":null;for(k=0;k<h.cells.length;k++)h.cells[k]=h.cells[k].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(h)}else if(b&&(e=this.rules.paragraph.exec(a)))a=a.substring(e[0].length),this.tokens.push({type:"paragraph",text:"\n"===e[1][e[1].length-1]?e[1].slice(0,-1):e[1]});else if(e=this.rules.text.exec(a))a=a.substring(e[0].length),this.tokens.push({type:"text",text:e[0]});else if(a)throw new Error("Infinite loop on byte: "+a.charCodeAt(0));return this.tokens};var j={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:f,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:f,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};j._inside=/(?:\[[^\]]*\]|[^\]]|\](?=[^\[]*\]))*/,j._href=/\s*<?([^\s]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,j.link=e(j.link)("inside",j._inside)("href",j._href)(),j.reflink=e(j.reflink)("inside",j._inside)(),j.normal=g({},j),j.pedantic=g({},j.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),j.gfm=g({},j.normal,{escape:e(j.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:e(j.text)("]|","~]|")("|","|https?://|")()}),j.breaks=g({},j.gfm,{br:e(j.br)("{2,}","*")(),text:e(j.gfm.text)("{2,}","*")()}),b.rules=j,b.output=function(a,c,d){var e=new b(c,d);return e.output(a)},b.prototype.output=function(a){for(var b,c,e,f,g="";a;)if(f=this.rules.escape.exec(a))a=a.substring(f[0].length),g+=f[1];else if(f=this.rules.autolink.exec(a))a=a.substring(f[0].length),"@"===f[2]?(c=this.mangle(":"===f[1][6]?f[1].substring(7):f[1]),e=this.mangle("mailto:")+c):(c=d(f[1]),e=c),g+='<a href="'+e+'">'+c+"</a>";else if(f=this.rules.url.exec(a))a=a.substring(f[0].length),c=d(f[1]),e=c,g+='<a href="'+e+'">'+c+"</a>";else if(f=this.rules.tag.exec(a))a=a.substring(f[0].length),g+=this.options.sanitize?d(f[0]):f[0];else if(f=this.rules.link.exec(a))a=a.substring(f[0].length),g+=this.outputLink(f,{href:f[2],title:f[3]});else if((f=this.rules.reflink.exec(a))||(f=this.rules.nolink.exec(a))){if(a=a.substring(f[0].length),b=(f[2]||f[1]).replace(/\s+/g," "),b=this.links[b.toLowerCase()],!b||!b.href){g+=f[0][0],a=f[0].substring(1)+a;continue}g+=this.outputLink(f,b)}else if(f=this.rules.strong.exec(a))a=a.substring(f[0].length),g+="<strong>"+this.output(f[2]||f[1])+"</strong>";else if(f=this.rules.em.exec(a))a=a.substring(f[0].length),g+="<em>"+this.output(f[2]||f[1])+"</em>";else if(f=this.rules.code.exec(a))a=a.substring(f[0].length),g+="<code>"+d(f[2],!0)+"</code>";else if(f=this.rules.br.exec(a))a=a.substring(f[0].length),g+="<br>";else if(f=this.rules.del.exec(a))a=a.substring(f[0].length),g+="<del>"+this.output(f[1])+"</del>";else if(f=this.rules.text.exec(a))a=a.substring(f[0].length),g+=d(f[0]);else if(a)throw new Error("Infinite loop on byte: "+a.charCodeAt(0));return g},b.prototype.outputLink=function(a,b){return"!"!==a[0][0]?'<a href="'+d(b.href)+'"'+(b.title?' title="'+d(b.title)+'"':"")+">"+this.output(a[1])+"</a>":'<img src="'+d(b.href)+'" alt="'+d(a[1])+'"'+(b.title?' title="'+d(b.title)+'"':"")+">"},b.prototype.mangle=function(a){for(var b,c="",d=a.length,e=0;d>e;e++)b=a.charCodeAt(e),Math.random()>.5&&(b="x"+b.toString(16)),c+="&#"+b+";";return c},c.parse=function(a,b){var d=new c(b);return d.parse(a)},c.prototype.parse=function(a){this.inline=new b(a.links,this.options),this.tokens=a.reverse();for(var c="";this.next();)c+=this.tok();return c},c.prototype.next=function(){return this.token=this.tokens.pop()},c.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},c.prototype.parseText=function(){for(var a=this.token.text;"text"===this.peek().type;)a+="\n"+this.next().text;return this.inline.output(a)},c.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return"<hr>\n";case"heading":return"<h"+this.token.depth+">"+this.inline.output(this.token.text)+"</h"+this.token.depth+">\n";case"code":if(this.options.highlight){var a=this.options.highlight(this.token.text,this.token.lang);null!=a&&a!==this.token.text&&(this.token.escaped=!0,this.token.text=a)}return this.token.escaped||(this.token.text=d(this.token.text,!0)),'<pre class="prettyprint"><code'+(this.token.lang?' class="'+this.options.langPrefix+this.token.lang+'"':"")+">"+this.token.text+"</code></pre>\n";case"table":var b,c,e,f,g,h="";for(h+="<thead>\n<tr>\n",c=0;c<this.token.header.length;c++)b=this.inline.output(this.token.header[c]),h+=this.token.align[c]?'<th align="'+this.token.align[c]+'">'+b+"</th>\n":"<th>"+b+"</th>\n";for(h+="</tr>\n</thead>\n",h+="<tbody>\n",c=0;c<this.token.cells.length;c++){for(e=this.token.cells[c],h+="<tr>\n",g=0;g<e.length;g++)f=this.inline.output(e[g]),h+=this.token.align[g]?'<td align="'+this.token.align[g]+'">'+f+"</td>\n":"<td>"+f+"</td>\n";h+="</tr>\n"}return h+="</tbody>\n","<table>\n"+h+"</table>\n";case"blockquote_start":for(var h="";"blockquote_end"!==this.next().type;)h+=this.tok();return"<blockquote>\n"+h+"</blockquote>\n";case"list_start":for(var i=this.token.ordered?"ol":"ul",h="";"list_end"!==this.next().type;)h+=this.tok();return"<"+i+">\n"+h+"</"+i+">\n";case"list_item_start":for(var h="";"list_item_end"!==this.next().type;)h+="text"===this.token.type?this.parseText():this.tok();return"<li>"+h+"</li>\n";case"loose_item_start":for(var h="";"list_item_end"!==this.next().type;)h+=this.tok();return"<li>"+h+"</li>\n";case"html":return this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);case"paragraph":return"<p>"+this.inline.output(this.token.text)+"</p>\n";case"text":return"<p>"+this.parseText()+"</p>\n"}},f.exec=f,h.options=h.setOptions=function(a){return g(h.defaults,a),h},h.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-"},h.Parser=c,h.parser=c.parse,h.Lexer=a,h.lexer=a.lex,h.InlineLexer=b,h.inlineLexer=b.output,h.parse=h,"object"==typeof exports?module.exports=h:"function"==typeof define&&define.amd?define(function(){return h}):this.marked=h}).call(function(){return this||("undefined"!=typeof window?window:global)}());