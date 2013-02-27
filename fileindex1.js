           /*3OGGO3(^
       ~Q@@@BBBBB@#(B@@S/
     O@@BBBBBBBBBB@O R@B@@O
    O@BBB@@@@@@BBB@G S@@@@@O    Extends Browsers
  /B@BBB@t    /#@B@( //     /		Script controlled by Hakan Bilgin © 2009
 ~@BBB@R(       BB~   /tC/  %@/		http://www.cloudo.com
 O@BB@#CCQ##s  /R(  e#@@O  C@@s
/@BBBBBBBBB@O (@( /@#7 /6R@@BB@/
%@BBBBBBB@B~ KR    ^(CG3   t@B@%
3@BBBBBB@O (@R   Q@@@@Q^ /#@BB@%
%@BBBBB@#  K@e   K@@BC  tR@BBB@t
^B@B@SC3  »%   ^^ /sB@BBBBB@R^R
 %KC/      //(     C@@BBBBBBB@t
  QQQ#G    e@@/     C@BBBBBB@R
   K@@#   sRRB@%S@@@(C@BBBB@Q
    (B@K 7@BBBBBBBB@S6@BB@R/
     ~R@G e@BBBBBBB@GS@B@#/			This code is licensed under a Creative Commons License.
        (#@S#@BBBB@#Q@Q(			http://creativecommons.org/licenses/LGPL/2.1/
             ^/~~/*/

/*	EXTENDS STRING	*/
String.prototype.trim		= function() {return this.replace(/(^\s*)|(\s*$)/g,'');};
String.prototype.fill		= function(i,c) {var str = this; c = c || ' '; for (; str.length<i; str+=c){}; return str;};
String.prototype.friendlyHTML = function() {return this.replace(/<scrip.*?>|<\/script>|<applet.*?>|<\/applett>|<embe.*?>|<objec.*?>.*?<\/object>/ig, '').replace(/ on.+?=.+?>/ig, '>').replace(/ href=.javascript:.+?.>/ig, '>');};
String.prototype.stripHTML	= function() {return this.replace(/<.*?>/g, '');};
String.prototype.stripNS	= function() {return this.replace(/<hbi:.*?>|<\/hbi:.*?>/g, '');};
String.prototype.sha1		= function() {return sha1.binb2hex(sha1.core_sha1(sha1.str2binb(this),this.length * sha1.chrsz));};
String.prototype.toHex		= function() {var a = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']; var i = parseInt(parseInt(this)/16); return a[i] + a[parseInt(this)-i*16];};
String.prototype.encrypt	= function(k) {k=k||9999;var r='';for(i=0;i<this.length;++i){r+=String.fromCharCode(k^this.charCodeAt(i));}return r;};
String.prototype.decrypt	= function(k) {k=k||9999;var r='';for(i=0;i<this.length;i++){r+=String.fromCharCode(k^this.charCodeAt(i));}return r;};

/*	EXTENDS ARRAY	*/
Array.prototype.sort_int	= function(d) {var d = d || -1;return this.sort(function(a,b) {var a = a || new Number(a);var b = b || new Number(b);if (a>b) return 1*d;if (a<b) return -1*d;if (isNaN(a)) return -1*d;if (isNaN(b)) return 1*d;return 0;});};
Array.prototype.indexOf		= function(e) {for (var i=0; i<this.length; i++) {if (this[i] == e) return i;}return -1;};
Array.prototype.subtract	= function(a) {if (!a) return this; if (!a.length) a = [a]; var ra = new Array();for (var i=0; i<this.length; i++) {if (a.indexOf(this[i]) == -1) ra.push(this[i]);}return ra;};
Array.prototype.remove		= function(e) {if (!e) return this;return this.subtract([e]);};
Array.prototype.sum			= function() {var r = 0;for (var i=0; i<this.length; i++) {if (typeof(this[i]) != 'number') continue;r += this[i];}return r;};
Array.prototype.foreach		= function(f) {for (var i=0; i<this.length; i++) {f(this[i], i);}};
Array.prototype.clone		= function() {var n = new Array(this.length); for (var i=0; i<this.length; i++) {if (this[i].length) {n[i] = this[i].clone(); continue;} n[i] = this[i];} return n;};

/*	EXTENDS DATE	*/
Date.prototype.getWeek		= function() {var nYear = new Date(this.getFullYear(), 0, 1);var offset = 7 + 1 - nYear.getDay();if (offset == 8) offset = 1;var dNum = ((Date.UTC(this.getFullYear(), this.getMonth(), this.getDate(),0,0,0) - Date.UTC(this.getFullYear(),0,1,0,0,0)) /1000/60/60/24) + 1;var wNum = Math.floor((dNum-offset+7)/7);if (wNum == 0) {this.getFullYear()--;var pnYear = new Date(this.getFullYear(),0,1);var pOffset = 7 + 1 - pnYear.getDay();wNum = (pOffset == 2 || pOffset == 8)? 53 : 52;}return wNum+1;};

/*	EXTENDS MATH	*/
Math.rnd					= function(n,x) {n=n||10; var i=(!x)?n:x-n;var p=(!x)?0:n;return p+parseInt(Math.random()*i);};
Math.tween = {
	linear : function(t,b,c,d) {return c*t/d+b;},
	bounce : function(t,b,c,d) {return c*Math.sin(t/d*(Math.PI))+b;},
	easeIn : function(t,b,c,d) {return c*(t/=d)*t*t+b;},
	easeOut : function(t,b,c,d) {return c*((t=t/d-1)*t*t+1)+b;},
	easeInOut : function(t,b,c,d) {return ((t/=d/2)<1)? c/2*t*t*t+b : c/2*((t-=2)*t*t+2)+b;},
	gb2 : function (t,b,c,d) {return c-Math.tween.gb1(d-t,0,c,d)+b;},
	gb3 : function (t,b,c,d) {return (t<d/2)? Math.tween.gb2(t*2,0,c,d)*.5+b : Math.tween.gb1(t*2-d,0,c,d)*.5+c*.5+b;},
	gb1 : function (t,b,c,d) {
		if ((t/=d)<(1/2.75)) return c*(7.5625*t*t)+b;
		else if (t<(2/2.75)) return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;
		else if (t<(2.5/2.75)) return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;
		else return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;
	}
};

/*	ENVIRONMENT	*/
var _env = {
	mac : /mac/i.test(navigator.userAgent),
	win : /win|windows/i.test(navigator.userAgent),
	linux : /inux/i.test(navigator.userAgent),
	ie : /msie/i.test(navigator.userAgent),
	gk : /gecko/i.test(navigator.userAgent),
	ff : /firefox/i.test(navigator.userAgent),
	sf : /safari/i.test(navigator.userAgent),
	ax : typeof(ActiveXObject) == 'function',
	xhr : typeof(XMLHttpRequest) == 'function',
	cancelEvent : function() {event.cancelBubble = true; event.returnValue = null;}
};
_env.os = (_env.win)?'win':((_env.mac)?'mac':((_env.linux)? 'linux':'other'));
_env.br = (_env.ie)?'ie':((_env.ff)?'ff':((_env.sf)? 'sf':'other'));

/*	FIREBUG CONSOLE	(mimicing) */
if (typeof(console) == 'undefined') {
	var console = {
		log : function(s) {
			alert(s);
		}
	};
}

/*	EXTENDS GECKO	*/
if (!_env.ie) {
	Node.prototype.setCapture =				function()		{};
	Node.prototype.releaseCapture =			function()		{};
	Node.prototype.fireEvent =				function(eType) {var e = document.createEvent('MouseEvents'); e.initEvent(eType.slice(2), true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); this.dispatchEvent(e);};
	Node.prototype.attachEvent =			function(e, h)	{this.addEventListener(e.slice(2), h, false);};
	Node.prototype.detachEvent =			function(e, h)	{this.removeEventListener(e.slice(2), h, false);};
	Document.prototype.selectNodes =		function(XPath, XNode) {if(!XNode) XNode = this; this.ns = this.createNSResolver(this.documentElement); this.qI = this.evaluate(XPath, XNode, this.ns, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); aResult = []; for(i=0; i<this.qI.snapshotLength; i++) aResult[i] = this.qI.snapshotItem(i); return aResult;};
	Document.prototype.selectSingleNode =	function(XPath, XNode) {if(!XNode) XNode = this; this.xI = this.selectNodes(XPath, XNode); return (this.xI.length > 0)? this.xI[0] : null ;};
	Element.prototype.selectNodes =			function(XPath) {return this.ownerDocument.selectNodes(XPath, this);};
	Element.prototype.selectSingleNode =	function(XPath) {return this.ownerDocument.selectSingleNode(XPath, this);};
	
	Node.prototype.__defineGetter__('scopeName',	function()		{var n = this.nodeName.toString();return (n.indexOf(':') > -1)? n.split(':')[0].toLowerCase() : 'HTML' ;});
	Node.prototype.__defineGetter__('xml',			function()		{return (new XMLSerializer()).serializeToString(this);});
	Node.prototype.__defineGetter__('outerHTML',	function()		{return (new XMLSerializer()).serializeToString(this);});
	Node.prototype.__defineSetter__('outerHTML',	function(s)		{var rng = this.ownerDocument.createRange(); rng.setStartBefore(this); cFrag = rng.createContextualFragment(s); this.parentNode.replaceChild(cFrag, this);});
	Node.prototype.__defineGetter__('text',			function()		{return this.textContent;});
	Node.prototype.__defineSetter__('text',			function(c)		{this.textContent = c;});
	Node.prototype.__defineGetter__('innerText',	function()		{return this.textContent;});
	Node.prototype.__defineSetter__('innerText',	function(c)		{this.textContent = c;});
	Node.prototype.__defineGetter__('currentStyle', function()		{return getComputedStyle(this, null);});
	Node.prototype.__defineSetter__('onreadystatechange', function(b) {this.readyState = 'complete'; this.onload = b;});
	/* Event */
	Event.prototype.__defineGetter__('event',		function()		{return this;});
	Event.prototype.__defineGetter__('clientY',		function()		{return this.pageY;});
	Event.prototype.__defineGetter__('clientX',		function()		{return this.pageX;});
	Event.prototype.__defineGetter__('offsetY',		function()		{return window.pageYOffset + this.pageY - getDim(this.srcElement).t;});
	Event.prototype.__defineGetter__('offsetX',		function()		{return window.pageXOffset + this.pageX - getDim(this.srcElement).l;});
	Event.prototype.__defineGetter__('srcElement',	function()		{var node = this.target; while (node && node.nodeType != 1) node = node.parentNode; return node;});
	Event.prototype.__defineSetter__('cancelBubble',function(b)		{if (b) this.stopPropagation();});
	Event.prototype.__defineSetter__('returnValue',	function(b)		{if (!b) this.preventDefault();});
	
	var e = ['contextmenu', 'click', 'dblclick', 'mouseover', 'mouseout', 'mousedown', 'mouseup', 'mousemove', 'keydown', 'keypress', 'keyup', 'focus', 'blur'];
	for (i=0; i<e.length; i++) document.addEventListener(e[i], function(e) {window.event=e;}, true);
}
/*	DOM EXPLORERS	*/
function $(s) {
	return (typeof(s) == 'string')? document.getElementById(s) : s ;
};
function getScope(el, s) {
	while (el && el.scopeName != s) {
		el = el.parentNode;
	}
	return el;
};
function getEl(el, p) {
	if (!el) return {};
	var o = p || {};
	var e = getChildren(el, '_id');
	for (var i=0, il=e.length; i<il; i++) {
		o[e[i].getAttribute('_id')] = e[i];
		if (e[i].getAttribute('_id') == '_toolbar') {
			var s = (e[i].getAttribute('_tsize') == '16')? 'tool16' : 'tool' ;
			o[e[i].getAttribute('_id')].tool = getChildren(e[i], 'nodeName', s);
		}
	}
	if (!p) return o;
};
function getSrcIndex($el) {
	var i=0;
	while ($el.previousSibling) {
		$el=$el.previousSibling;
		if ($el.nodeType != 3) i++;
	}
	return i;
};
function getChildren(el, a, v) {
	el = $(el);
	if (!el) return;
	var ar = new Array();
	var ac = el.getElementsByTagName('*');
	for (c=0, cl=ac.length; c<cl; c++) {
		if (v && a=='nodeName' && ac[c].nodeName.indexOf(':') > -1 && ac[c].nodeName.split(':')[1].toLowerCase() == v.toLowerCase()) {
			ar.push(ac[c]);
			continue;
		}
		if (v? (ac[c][a] == v || ac[c].getAttribute(a) == v) : (ac[c][a] || ac[c].getAttribute(a))) {
			ar.push(ac[c]);
		}
	}
	return ar;
};
function getChild(el, a, v) {
	el = $(el);
	if (!el) return;
	var ar = new Array();
	var ac = $(el).getElementsByTagName('*');
	for (var c=0, cl=ac.length; c<cl; c++) {
		if (v && a == 'nodeName' && v && ac[c].nodeName.indexOf(':') > -1 && ac[c].nodeName.split(':')[1].toLowerCase() == v.toLowerCase()) {
			return ac[c];
		}
		if (v? (ac[c][a] == v || ac[c].getAttribute(a) == v) : (ac[c][a] || ac[c].getAttribute(a))) {
			return ac[c];
		}
	}
};
function getParent(el, a, v) {
	el = $(el);
	try {
		while ((v && a=='nodeName' && el.nodeName && el.nodeName.indexOf(':') > -1)?
			(el.nodeName.toLowerCase().indexOf(':'+ v.toLowerCase()) == -1) :
			(v? (el && el[a] != v && el.getAttribute(a) != v) : (el && !el[a] && !el.getAttribute(a)))) {
			if (el == document.body.parentNode) return null;
			el = el.parentNode;
		}
	} catch (e) {
		el = null;
	}
	return el;
};
function getNext(el, a, v) {
	el = $(el);
	while (el.nextSibling) {
		el = el.nextSibling;
		if (el.nodeType == 1) {
			if ((v && a=='nodeName' && el.nodeName && el.nodeName.indexOf(':') > -1)?
				(el.nodeName.toLowerCase().indexOf(':'+ v.toLowerCase()) > -1) :
				(v? (el[a] == v || el.getAttribute(a) == v) : (el[a] || el.getAttribute(a)))) return el;
		}
	}
};
function getPrevious(el, a, v) {
	el = $(el);
	while (el.previousSibling) {
		el = el.previousSibling;
		if (el.nodeType == 1) {
			if ((v && a=='nodeName' && el.nodeName && el.nodeName.indexOf(':') > -1)?
				(el.nodeName.toLowerCase().indexOf(':'+ v.toLowerCase()) > -1) :
				(v? (el[a] == v || el.getAttribute(a) == v) : (el[a] || el.getAttribute(a)))) return el;
		}
	}
};
function getSheet(id) {
	if (_env.ie) return document.styleSheets(id);
	for (var s=0, sl=document.styleSheets.length; s<sl; s++) {
		if (document.styleSheets[s].ownerNode.id == id) return document.styleSheets[s];
	}
};
function getDim(el, a, v) {
	if (!el) return {w:0, h:0, t:0, l:0, obj:el};
	a = a || 'nodeName';
	v = v || 'BODY';
	var p = {w:el.offsetWidth, h:el.offsetHeight, t:0, l:0, obj:el};
	while (el && el[a] != v && el.getAttribute(a) != v) {
		if (el == document.firstChild) return null;
		p.t += el.offsetTop - el.scrollTop;
		p.l += el.offsetLeft - el.scrollLeft;
		if (el.scrollWidth > el.offsetWidth) {
			p.w = Math.min(p.w, p.w-(p.w + p.l - el.offsetWidth - el.scrollLeft));
		}
		el = el.offsetParent;
	}
	return p;
};

/*	COCKIE HANDLER	*/
var _cookie = {
	Del : function(cName) {
		var date = new Date();
		date.setYear(date.getFullYear() - 10);
		document.cookie = cName + '=; expires=' + date.toGMTString();
	},
	Get : function(cName) {
		var aCookie = document.cookie.split('; ');
		for (j=0; j<aCookie.length; j++) {
			var bCookie = aCookie[j].split('=');
			if (bCookie[0] == cName) return unescape(bCookie[1]).decrypt();
		}
	},
	Set : function(cName, cValue) {
		if (!cValue) _cookie.Del(cName);
		var cValue = cValue.toString().encrypt();
		var date = new Date();
		date.setYear(date.getFullYear() + 1);
		document.cookie = cName + '=' + escape(cValue) + '; expires=' + date.toGMTString();
	}
};

/*	SHA1	*/
var sha1 = {
	hexcase : 0,
	chrsz : 8,
	sha1_kt : function(t) {return (t<20)? 1518500249 : (t<40)? 1859775393 : (t<60)? -1894007588 : -899497514;},
	rol : function(num,cnt) {return (num<<cnt)|(num>>>(32-cnt));},
	core_sha1 : function(x,len) {x[len>>5]|=0x80<<(24-len%32);x[((len+64>>9)<<4)+15]=len;var w=Array(80),a=1732584193,b=-271733879,c=-1732584194,d=271733878,e=-1009589776;for(var i=0;i<x.length;i+=16){var olda=a,oldb=b,oldc=c,oldd=d,olde=e;for(var j=0;j<80;j++){if(j<16)w[j]=x[i+j];else w[j]=sha1.rol(w[j-3]^w[j-8]^w[j-14]^w[j-16],1);t=sha1.safe_add(sha1.safe_add(sha1.rol(a,5),sha1.sha1_ft(j,b,c,d)),sha1.safe_add(sha1.safe_add(e,w[j]),sha1.sha1_kt(j)));e=d;d=c;c=sha1.rol(b,30);b=a;a=t;}a=sha1.safe_add(a,olda);b=sha1.safe_add(b,oldb);c=sha1.safe_add(c,oldc);d=sha1.safe_add(d,oldd);e=sha1.safe_add(e,olde);}return Array(a, b, c, d, e);},
	sha1_ft : function(t,b,c,d) {if(t<20) return (b&c)|((~b)&d);if(t<40) return b^c^d;if(t<60) return (b&c)|(b&d)|(c&d);return b^c^d;},
	safe_add : function(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return (msw<<16)|(lsw&0xFFFF);},
	str2binb : function(str){var bin=Array();var mask=(1<<sha1.chrsz)-1;for(var i=0;i<str.length*sha1.chrsz;i+=sha1.chrsz)bin[i>>5]|=(str.charCodeAt(i/sha1.chrsz)&mask)<<(24-i%32);return bin;},
	binb2hex : function(binarray){var hex_tab=sha1.hexcase?"0123456789ABCDEF":"0123456789abcdef";var str="";for(var i=0;i<binarray.length*4;i++)str+=hex_tab.charAt((binarray[i>>2]>>((3-i%4)*8+4))&0xF)+hex_tab.charAt((binarray[i>>2]>>((3-i%4)*8))&0xF);return str;}
};
