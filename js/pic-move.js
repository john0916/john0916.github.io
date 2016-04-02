// JavaScript Document
function d2a(n){
	return n*Math.PI/180;
}
function a2d(n){
	return n*180/Math.PI;
}

var lastX,lastY;	//前一次的鼠标坐标

document.onmousemove=function (ev){
	var oEvent=ev||event;
	
	lastX=oEvent.clientX;
	lastY=oEvent.clientY;
};

function addWall(oDiv){
	var oS=oDiv.children[0];
	
	//移入之前的，最后一次的坐标
	oDiv.onmouseenter=function (){
		//找方向
		var cx=oDiv.offsetLeft+oDiv.offsetWidth/2;
		var cy=oDiv.offsetTop+oDiv.offsetHeight/2;
		
		var a=lastX-cx;
		var b=cy-lastY;	//y反着
		
		var ang=90-a2d(Math.atan2(b, a));
		console.log(oDiv.offsetTop)
		if(ang>=-45 && ang<=45){
			//上
			oS.style.left=0;
			oS.style.top='-150px';
			
			move(oS, {left: 0, top: 0});
		}else if(ang>=45 && ang<=135){
			//右
			oS.style.left='150px';
			oS.style.top=0;
			
			move(oS, {left: 0, top: 0});
		}else if(ang>=135 && ang<=225){
			//下
			oS.style.left=0;
			oS.style.top='150px';
			
			move(oS, {left: 0, top: 0});
		}else{
			//左
			oS.style.left='-150px';
			oS.style.top=0;
			
			move(oS, {left: 0, top: 0});
		}
	};
	
	oDiv.onmouseleave=function (){
		//找方向
		var cx=oDiv.offsetLeft+oDiv.offsetWidth/2;
		var cy=oDiv.offsetTop+oDiv.offsetHeight/2;
		
		var a=lastX-cx;
		var b=cy-lastY;	//y反着
		
		var ang=90-a2d(Math.atan2(b, a));
		
		if(ang>=-45 && ang<=45){
			//上
			move(oS, {left: 0, top: -150});
		}else if(ang>=45 && ang<=135){
			//右
			move(oS, {left: 150, top: 0});
		}else if(ang>=135 && ang<=225){
			//下
			move(oS, {left: 0, top: 150});
		}else{
			//左
			move(oS, {left: -150, top: 0});
		}
	};
}
    


