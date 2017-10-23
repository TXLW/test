var scroll = require('../libs/iscroll-probe');
var template = require('../libs/template-web');
var listTpl = require('../../template/pos-tpl.string');
module.exports = {
	doscroll: function () {
		new scroll('.m-index section', {

    	})
	},
	renderTpl: function (cb) {
		$.ajax({
			type:"get",
			url:"/vip/list.php",
			async:true,
			data: {
				pageNo: 1,
				pageSize: 15
			},
			success: function (data) {
				cb(template.render(listTpl,data.content.data.page))
			}
		});
	}	
}
