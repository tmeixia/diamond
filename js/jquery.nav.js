// JavaScript Document
;(function($) {
/*全局性的
$.extend({
	'nav':function(){
		$('.nav').css({
		'list-style':'none',
		'padding':0,
		'display':'none'
		});
	$('.nav').parent().hover(function(){
		$(this).find('.nav').slideDown(1000);
		},function(){
			$(this).find('.nav').stop().slideUp('normal');
		});
		
		}
	
	});
	*/
	//局部性的
	$.fn.extend({
	'nav':function(){
		//在插件里的this，经过了一些封装处理，this就是表示jquery对象
		$(this).find('.nav').css({
		'list-style':'none',
		'padding':0,
		'display':'none'
		});
	$(this).find('.nav').parent().hover(function(){
		//这里是普通的匿名
		$(this).find('.nav').slideDown(1000);
		},function(){
			$(this).find('.nav').stop().slideUp('normal');
		});
		return this;
		}
	
	});
}(jQuery));// JavaScript Document