// JavaScript Document


window.onload=function(){
	var widowWidth=window.screen.width;
	var widowHeight=window.screen.height;
	var oLeftWrap=document.getElementById('left-wrap');
	var oRightWrap=document.getElementById('right-wrap')
	oLeftWrap.style.width=widowWidth*0.4+'px';
	oRightWrap.style.width=widowWidth*0.5+'px';
	/*oRightWrap.style.left=widowWidth*0.6+'px';*/
	oLeftWrap.style.heigth=widowHeight+'px';
	oRightWrap.style.height=widowHeight;
	
	
	//drag
/*	var oPicDrag=document.getElementById('pic-drag');
	var aDragImg=oPicDrag.children;
	var zIndex=2;
	
	//布局转换
	var aPos=[];
	for(var i=0;i<aDragImg.length;i++){
		aPos.push({left:aDragImg[i].offsetLeft,top:aDragImg[i].offsetTop});	
		aDragImg[i].style.left=aPos[i].left+'px';
		aDragImg[i].style.top=aPos[i].top+'px';
	}
	for(var i=0;i<aDragImg.length;i++){
		aDragImg[i].style.position='absolute';	
		aDragImg[i].style.margin=0;
		aDragImg[i].index=i;
	}
	
	//添加拖拽
	for(var i=0;i<aDragImg.length;i++){
		drag(aDragImg[i]);
	}	
*/	
	//拖拽封装
	function drag(obj){
		obj.onmousedown=function(ev){
			obj.style.zIndex=zIndex++;
			clearInterval(obj.timer);//防止运动过程中按下
			
			var oEvt=ev||event;
			var disX=oEvt.clientX-obj.offsetLeft;
			var disY=oEvt.clientY-obj.offsetTop;
			document.onmousemove=function(ev){
				var oEvt=ev||event;
				obj.style.left=oEvt.clientX-disX+'px';
				obj.style.top=oEvt.clientY-disY+'px';
				obj.style.opacity=1;	
				
				//交换位置
				var nearObj=findNearest(obj);//碰撞检测+找最近
				if(nearObj && nearObj!=obj){
					
					var n=obj.index;//拿着的obj索引
					var m=nearObj.index;//被撞的索引
					
					for(var i=0;i<aDragImg.length;i++){
						//←	li.index>n && li.index<=m	n到m不含n
						if(aDragImg[i].index>n && aDragImg[i].index<=m){
							aDragImg[i].index--;
							move(aDragImg[i],aPos[aDragImg[i].index]);	
						}else if(aDragImg[i].index<n && aDragImg[i].index>=m){
							//→ li.index<n && li.index>=m n到m不含n
							aDragImg[i].index++;
							move(aDragImg[i],aPos[aDragImg[i].index]);
						}
						
					}
					obj.index=m;//obj的索引等于被撞到的 near(m)
				}
				
			};
			document.onmouseup=function(){
				document.onmousemove=document.onmouseup=null;
				obj.style.opacity=0.7;	

				
				move(obj,aPos[obj.index]);//回自个位置
				
				obj.releaseCapture&&obj.releaseCapture();
			};
			obj.setCapture&&obj.setCapture();
			return false;	
		};	
	}
	
	function findNearest(obj){
		var minDis=99999999999999;//距离
		var minDisIndex=-1;//下标
		for(var i=0;i<aDragImg.length;i++){
			//if(obj==aDragImg[i]) continue;//放过自己
			if(collTest(obj,aDragImg[i])){//撞到了
				//找最近
				var dis=getDis(obj,aDragImg[i]);//求obj到被撞的房子距离
				if(dis<minDis){
					minDis=dis;
					minDisIndex=i;	
				}
			}
		}
		if(minDisIndex==-1){//没撞到
			return null;
		}else{
			return aDragImg[minDisIndex]	//丢出去最近的li	
		}
	}
	
	function getDis(obj1,obj2){//obj1到obj2的房子的距离
		var a=aPos[obj2.index].top-obj1.offsetTop;
		var b=aPos[obj2.index].left-obj1.offsetLeft;
		return Math.sqrt(a*a+b*b);
	}
	
	function collTest(obj1,obj2){//要和obj2的房子
		var l1=obj1.offsetLeft;
		var t1=obj1.offsetTop;
		var r1=obj1.offsetLeft+obj1.offsetWidth;
		var b1=obj1.offsetTop+obj1.offsetHeight;
		
		var l2=aPos[obj2.index].left//obj2的房子位置
		var t2=aPos[obj2.index].top;
		var r2=aPos[obj2.index].left+obj2.offsetWidth;
		var b2=aPos[obj2.index].top+obj2.offsetHeight;
		
		if(l1>r2 || t1>b2 || r1<l2 || b1<t2){//obj1和obj2的房子
			//没撞到	
			return false;
		}else{
			//撞到
			return true;
		}
	}
	//ImageSwitcher
	
	var aImageSwitcher=document.getElementById('bg-img');
	var oBgBox=document.getElementById('bg-box');
	
	var timer=null;
	var oImgClone=aImageSwitcher.cloneNode(true);
	oImgClone.removeAttribute('id');
	oImgClone.src='images/b2.png';
	oBgBox.appendChild(oImgClone);
	
	var now=1;
	setInterval(function(){
		now++;
		aImageSwitcher.src = "images/b"+now%4+".png";
		oImgClone.src = "images/b"+(now+1)%4+".png";
		console.log(now);
		move(oImgClone,{opacity:0},{duration:4000,complete:function(){
			move(oImgClone,{opacity:1},{duration:30});
				
		}});
		
		},4000);
	
	
/*	timer=setInterval(function(){
			move(aImageSwitcher,{opacity:0},{duration:2000,complete:function(){
				move(aImageSwitcher,{opacity:0.5},{duration:2000})
			}})
			move(oImgClone,{opacity:0.5},{duration:2000,complete:function(){
				move(oImgClone,{opacity:0},{duration:2000})
			}})
	},4000)
*/
	
	
	//title hover
	var oSiteTitle=document.getElementById('site-title');
	var oFx1=oSiteTitle.querySelector('.fx1');
	var oFx2=oSiteTitle.querySelector('.fx2');
	var oSiteA=oSiteTitle.getElementsByTagName('a');
	console.log(typeof(oFx1));
	oSiteTitle.onmouseover=function(){
		oFx1.style.transform='rotate(25deg)';
		oFx2.style.transform='rotate(-20deg)';
		oFx1.style.color='#fff';
		oFx2.style.color='#fff';
	};
	oSiteTitle.onmouseout=function(){
		oFx1.style.transform='rotate(-25deg)';
		oFx2.style.transform='rotate(30deg)';
		oFx1.style.color='#de347b';
		oFx2.style.color='#488db7';
	};
	
	//换肤
	var oFace=document.getElementById('face');
	var oBody=document.getElementById('body');
	oFace.onclick=function(){
		oBody.style.background='#515c6b';
	}
/*	oFace.ondblclick(function(){
		oBody.style.background='#515c6b';	
	},function(){
		oBody.style.background='#515c6b';	
	})
*/		
	//我的作品 点击
	var oPicDrag=document.getElementById('pic-drag');
	var aDragImg=oPicDrag.children;
	var oWorkBorder=document.getElementById('work-border');
	for(var i=0; i<aDragImg.length;i++){
		(function(index){
			aDragImg[i].onclick=function(){
				oWorkBorder.style.display='block'
			}
				
		})(i)	
	}
	//作品关闭
	var oClose=document.getElementById('close');
	oClose.onclick=function(){
		oWorkBorder.style.display='none';	
	}		

	

		
		
		
		
	
	//suiij
	function rnd(m,n){
		return parseInt(n+Math.random()*(m-n));
	}


	

};
