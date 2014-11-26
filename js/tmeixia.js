// JavaScript Document
$(function(){
	$('input').bind("click",function(e){
		alert("input");
		//e.stopPropagation();//阻止冒泡行为
		
		});
		
		
	/*$('a').bind('click',function(e){
		e.preventDefault();
		alert("www.baidu.com");
			
		})
			
		
	$('form').submit(function(e){
		e.preventDefault();
		alert("sub");
		
		});		
	*/	
	$('a').bind('click',function(e){
		//e.preventDefault();
		//e.stopPropagation();
		//preventDefault()和stopPropagation()一起时，既阻止了冒泡又阻止了默认行为。但是可以用return false来代替。
		//return false; 
		alert("www.baidu.com");
		alert(e.isDefaultPrevented());
        alert(e.isPropagationStopped());

		e.stopImmediatePropagation();//取消时间冒泡并取消后续时间的处理函数
		alert(e.isImmediatePropagationStopped());
		});
		
	$('a').bind('click',function(e){
	    
			alert('ddd');//由于上面用了stopImmediatePropagation，所以这里不会弹出
		})
		
		
	$('div').bind('click',function(){
		alert("div");
		});	
		
	$(document).bind('click',function(){
		alert("document");
		});
	
		
	})