module.exports = function () {
	var url = location.pathname.substr(1);
	$('.m-index footer li a[href="'+url+'"]').parent().addClass('active');
	$('.m-index footer li a[href="'+url+'"]').parent().siblings().removeClass('active');
}