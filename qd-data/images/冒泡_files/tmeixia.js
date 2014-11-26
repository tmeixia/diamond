// JavaScript Document
$(function(){
	$('input').bind("click",function(){
		//alert(1);
		e.stopPropagation();
		alert(1);
		});
		
		
	/*$('a').bind('click',function(e){
		e.preventDefault();
		alert("www.baidu.com");
			
		})
		*/	
		
	$('form').submit(function(e){
		e.preventDefault();
		alert("sub");
		
		});		
	
	})