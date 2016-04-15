// JavaScript Document
	var oOneUl=document.getElementById('oneul');
	var o3Dhuan=document.getElementById('3Dhuan');
	var o3DhuanLi=oOneUl.children;
	var len=o3DhuanLi.length;
	console.log(o3DhuanLi.length)
	
	o3Dhuan.onclick=function(){
		for(var i=0;i<len;i++){
		o3DhuanLi[i].style.transition="1s all ease "+(len-i)*200+"ms" ;  
		o3DhuanLi[i].style.transform="rotateY("+360/len*i+"deg) translateZ(400px)"; 
		}
	}
	
	var y=0;
	var x=150;
	var speedX=0;
	var speedY=0;
	var lastX=0;
	var lastY=0;
	var timer=null;
	oOneUl.onmousedown=function(ev){
		clearInterval(timer)
		disX=ev.clientX-y;
		disY=ev.clientY-x;
		document.onmousemove=function(ev){
			y=ev.clientX-disX;
			x=ev.clientY-disY;
			speedX=x-lastX;
			speedY=y-lastY;
			lastX=x;
			lastY=y;
			if(x>400) x=400;
			if(x<-400) x=-400;
			oOneUl.style.transform="perspective(1000px) rotateX("+-x/10+"deg) rotateY("+y/10+"deg)"
		}
		document.onmouseup=function(){
			document.onmousemove=document.onmouseup=null;
			clearInterval(timer);
			timer=setInterval(function(){
				x += speedX;
				y += speedY;				
				speedX *= 0.95;
				speedY *= 0.95;
				if(Math.abs(speedX)<1) speedX=0;
				if(Math.abs(speedY)<1) speedY=0;
				if(speedX==0 && speedY==0 ){
					clearInterval(timer);
				}
				oOneUl.style.transform="perspective(1000px) rotateX("+-x/10+"deg) rotateY("+y/10+"deg)"
			},30)
		}
		return false;
	}
	
	
