var str = require('../template/index.string');
var $ = require('./libs/zepto');
var tabbar = require('./utils/tabbar');
$(function () {
	$('body').prepend(str);
	tabbar();
})
