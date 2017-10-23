var str = require('../template/index.string');
var sectionstr = require('../template/section.string');
//var footerstr = require('../template/footer.string');
var $ = require('./libs/zepto');
var tabbar = require('./utils/tabbar');
var position = require('./modules/position')
window.onload = function () {
	var body = document.body;
	body.innerHTML = str + body.innerHTML;
	var section = document.querySelector('.m-index section');
	section.innerHTML = sectionstr;
	document.body.addEventListener('swipeRight',function () {
		console.log(1);
	})
}
$(function () {
	console.log($.os.phone);
	position.renderTpl(function (data) {
		$(".m-index section .list").html(data);
		position.doscroll();
		tabbar();
	})

})	
