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
	
		
		
	//job-two
	var oJobTwo=document.getElementById('job-two');
	var oJobTwoUl=oJobTwo.children[0];
	var aJobTwoLi=oJobTwoUl.children;
	var aImg=oJobTwoUl.getElementsByTagName('img');
	var aSpan=oJobTwoUl.getElementsByTagName('span');
	//1.设定ul的宽
	oJobTwoUl.style.width=oJobTwoUl.children.length*aJobTwoLi[0].offsetWidth+'px';
	//2.添加拖0
	oJobTwoUl.onmousedown=function(ev){
		var oEvt=ev||event;
		var disX=oEvt.clientX-oJobTwoUl.offsetLeft;
		document.onmousemove=function(ev){
			var oEvt=ev||event;
			var l=oEvt.clientX-disX;
			//div.w/2 - (0+0.5)*li.w
			if(l>oJobTwo.offsetWidth/2-(0+0.5)*aJobTwoLi[0].offsetWidth)
				l=oJobTwo.offsetWidth/2-(0+0.5)*aJobTwoLi[0].offsetWidth;
			if(l<oJobTwo.offsetWidth/2-(aJobTwoLi.length-1+0.5)*aJobTwoLi[0].offsetWidth)
				l=oJobTwo.offsetWidth/2-(aJobTwoLi.length-1+0.5)*aJobTwoLi[0].offsetWidth;
			oJobTwoUl.style.left=l+'px';
			
			setSize();//控制大小
		};	
		document.onmouseup=function(){
			document.onmousemove=document.onmouseup=null;	
		};
		return false;
	};
	
	function setSize(){
		//计算每个图到div1中线的距离，控制图片大小	
		for(var i=0;i<aImg.length;i++){
			//div1.w/2-(ul.left+li.left+li.w/2)
			var dis=Math.abs(oJobTwo.offsetWidth/2-(oJobTwoUl.offsetLeft+aJobTwoLi[i].offsetLeft+aJobTwoLi[i].offsetWidth/2))
			var scale=1-dis/800	//	800假设的感应距离	
			//aSpan[i].innerHTML=scale.toFixed(2);
			
			if(scale<0.5) scale=0.5;
			
			//控制所有的图片
			aImg[i].style.width=520*scale+'px';
			aImg[i].style.height=358*scale+'px';
			aImg[i].style.marginLeft=-(aImg[i].offsetWidth-aJobTwoLi[i].offsetWidth)/2+'px';
			aImg[i].style.marginTop=-(aImg[i].offsetHeight-aJobTwoLi[i].offsetHeight)/2+'px';
			aImg[i].style.zIndex=parseInt(scale*10000);
			aImg[i].style.opacity=scale;
		}	
	}
	
	//3.设置中心点
	setCenter(parseInt(aJobTwoLi.length/2));
	
	function setCenter(n){
		//div.w/2 - (n+0.5)*li.w
		oJobTwoUl.style.left=	oJobTwo.offsetWidth/2-(n+0.5)*aJobTwoLi[0].offsetWidth+'px';
		setSize();
	}
	
	//4.响应式
	window.onresize=setSize;

	
	
	//job-one
	
	//job-three
	var oDiv=document.getElementById('div1');
	var R=10;
	var C=10;
	var Threelen=C*R;

	for(var r=0;r<R;r++){
		for(var c=0;c<C;c++){
			var oThreeSpan=document.createElement('span');
			oDiv.appendChild(oThreeSpan);
			oThreeSpan.style.left=c*oThreeSpan.offsetWidth+'px';
			oThreeSpan.style.top=r*oThreeSpan.offsetHeight+'px';
			oThreeSpan.style.backgroundPosition=-oThreeSpan.offsetLeft+'px -'+oThreeSpan.offsetTop+'px'
		}
	}

	var iNow=0;
	var aThreeSpan=oDiv.children;
	oDiv.onclick=function(){
		//两张图片都要换
		
		for(var i=0;i<Threelen;i++){
			aThreeSpan[i].style.transition="none";
			aThreeSpan[i].style.opacity='1';
			aThreeSpan[i].style.transform="translate(0,0) rotateX(0deg) rotateY(0deg)"
			aThreeSpan[i].style.backgroundImage="url(images/"+iNow%3+".jpg)"

		}
		iNow++;
		oDiv.style.backgroundImage="url(images/"+(iNow+1)%3+".jpg)"
		//span需要爆炸
		setTimeout(function(){
			for(var i=0;i<Threelen;i++){
				var x=aThreeSpan[i].offsetLeft+aThreeSpan[i].offsetWidth/2-oDiv.offsetWidth/2+'px';
				var y=aThreeSpan[i].offsetTop+aThreeSpan[i].offsetHeight/2-oDiv.offsetHeight/2+'px';
				aThreeSpan[i].style.transform="translate("+x+","+y+") rotateX("+rnd(-180,180)+"deg) rotateY("+rnd(-180,180)+"deg)";
				aThreeSpan[i].style.opacity=0;
				aThreeSpan[i].style.transition='2s all ease';
			}
		},0)
	}

	
	//job-four
	var oJobFiveBtnPrev = document.getElementById("btn_prev");
	var oJobFiveBtnNext = document.getElementById("btn_next");
	var oJobFourUl = document.getElementById("jobfourul");
	var aJobFourLi = oJobFourUl.children;
	var len = aJobFourLi.length;
	
	//存class
	var aClass = [];
	for(var i = 0; i < len; i++){
		aClass.push(aJobFourLi[i].className);
	}
	
	
	var bReady = true;//准备好了 
	oJobFiveBtnNext.onclick = function(){
		if(!bReady) return ;
		bReady = false;
		aClass.unshift(aClass.pop());
	 	tab();
	};
	
	oJobFiveBtnPrev.onclick = function(){
		if(!bReady) return ;
		bReady = false;
	 	aClass.push(aClass.shift());
		tab();	
	};
	
	function tab(){
		for(var i = 0; i < len; i++){
			aJobFourLi[i].className = aClass[i];
		}
		
		var oCur = oJobFourUl.querySelector(".cur");
		oCur.addEventListener("transitionend",function(){
			bReady = true;
		},false);	
	}
	
	
	//job-five
	var oJobFiveClock=document.getElementById('clock');
	var oH=oJobFiveClock.querySelector('#hour');
	var oM=oJobFiveClock.querySelector('#min');
	var oS=oJobFiveClock.querySelector('#sec');
	var oJobFiveBtn=document.getElementById('jobfivebtn');

	oJobFiveBtn.onclick=function(){
		oJobFiveClock.style.transform="rotate(360deg)"
	}

	function clock(){
		var oDate=new Date();
		var iH=oDate.getHours();
		var iM=oDate.getMinutes();
		var iS=oDate.getSeconds();
		var iMs=oDate.getMilliseconds();

		oH.style.transform='rotate('+(iH*30+iM/60*30)+'deg)';
		oM.style.transform='rotate('+(iM*6+iS/60*6)+'deg)';
		oS.style.transform='rotate('+(iS*6+iMs/1000*6)+'deg)';

	}
	clock();
	setInterval(clock,30)

	for(var i=0;i<60;i++){
		var oSpan=document.createElement('span');
		oSpan.style.transform="rotate("+i*6+"deg)";

		if(i%5==0){
			oSpan.classList.add('on');
			if(i==0){
				oSpan.innerHTML="<strong>12</strong>";
			}else{
				oSpan.innerHTML="<strong>"+i/5+"</strong>"//"
				oSpan.children[0].style.transform="rotate(-"+i*6+"deg)"
			}	
		}
		oJobFiveClock.appendChild(oSpan);
	}

	//job-six
	ballmove();
	function ballmove(){
			move();
	var oJobSixBall = document.getElementById("jobsixball");
	var speedX = 0;
	var speedY = 0;
	var lastX = 0;
	var lastY = 0;
	var timer = null;
	
	oJobSixBall.onmousedown = function(ev){
		clearInterval(timer);
		var oEvent = ev || event;
		var disX = oEvent.clientX - oJobSixBall.offsetLeft;
		var disY = oEvent.clientY - oJobSixBall.offsetTop;
		document.onmousemove = function(ev){
			var oEvent = ev || event;
			oJobSixBall.style.left = oEvent.clientX - disX + "px";
			oJobSixBall.style.top  = oEvent.clientY - disY + "px";		
			speedX = oJobSixBall.offsetLeft - lastX;
			speedY = oJobSixBall.offsetTop - lastY;
			
			lastX = oJobSixBall.offsetLeft;
			lastY = oJobSixBall.offsetTop;
		};
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
			oJobSixBall.releaseCapture && oJobSixBall.releaseCapture();
			
			move();
		 
		};	
		oJobSixBall.setCapture && oJobSixBall.setCapture();
		return false;
	};
	
	function move(){
		clearInterval(timer);
		timer = setInterval(function(){
			speedY += 3;
			var t = oJobSixBall.offsetTop + speedY;
			var l = oJobSixBall.offsetLeft + speedX;
			if(t > document.documentElement.clientHeight - oJobSixBall.offsetHeight){
				t = document.documentElement.clientHeight - oJobSixBall.offsetHeight;
				speedY *= -0.8;
				speedX *= 0.8;
				
			} else if(t < 0){
				t = 0;
				speedY *= -0.8;
				speedX *= 0.8;
			}
			
			if(l > document.documentElement.clientWidth - oJobSixBall.offsetWidth){
				l = document.documentElement.clientWidth - oJobSixBall.offsetWidth;
				speedX *= -0.8;
				speedY *= 0.8;
				
			} else if(l < 0){
				l = 0;
				speedX *= -0.8;
				speedY *= 0.8;
			}
			oJobSixBall.style.left = l + "px";
			oJobSixBall.style.top  = t + "px";
			
			if(Math.abs(speedX) < 1){
				speedX = 0;
			}
			if(Math.abs(speedY) < 1){
				speedY = 0;
			}
			
			if(speedX == 0 && speedY == 0 && t == document.documentElement.clientHeight - oJobSixBall.offsetHeight){
				clearInterval(timer);
			}
		},30);	
	}		
	}

	
	//job-seven
	var oJobSeven=document.getElementById('job-seven');
	var aJobSeven=oJobSeven.children;
	move(aJobSeven[1],{left:-200},{time:2000})
	for(var i=1;i<aJobSeven.length;i++){
		aJobSeven[i].style.left=aJobSeven[i].offsetWidth+20*(i-1)+'px';
			
	}
	//onmouseover,遍历所有div,拿i和this.index,<=this.index的←
	for(var i=0;i<aJobSeven.length;i++){
		(function(index){
			aJobSeven[i].onmouseover=function(){
				for(var i=0;i<aJobSeven.length;i++){
					if(i<=index){
						//←	
						//aJobSeven[i].style.left=i*20+'px';
						move(aJobSeven[i],{left:i*20},{time:1000});
					}else{
						//→	
						//aJobSeven[i].style.left=aJobSeven[i].offsetWidth+20*(i-1)+'px';
						move(aJobSeven[i],{left:aJobSeven[i].offsetWidth+20*(i-1)},{time:1000});
					}
				}
			};	
		})(i);
	}

	//job-eight
	var oJobEightUl = document.getElementById("jobeightul");
	var oJobEightLi = oJobEightUl.children;
	
	for(var i = 0; i < oJobEightLi.length; i++){
		lagou(oJobEightLi[i]);
	}
	
	
	function lagou(oJobTwo){
		oJobTwo.onmouseover = function(ev){
			
			var oFrom = ev.fromElement || ev.releatedTarget;
			
			if(oJobTwo.contains(oFrom)){
				return ;
			}
			
			var n = getDir(this,ev);
			var oSpan = this.children[0];
			switch(n){
				case 0:
					oSpan.style.left = "-150px";
					oSpan.style.top = "0";
					break;
				case 1:
					oSpan.style.left = "0";
					oSpan.style.top = "150px";
					break;
				case 2:
					oSpan.style.left = "150px";
					oSpan.style.top = "0";
					break;
				case 3:
					oSpan.style.left = "0";
					oSpan.style.top = "-150px";
					break;
			}	
			
			$(oSpan).stop().animate({left:0,top:0});
		};
	
		oJobTwo.onmouseout = function(ev){
			
			var oTo = ev.toElement || ev.releatedTarget;
			
			if(oJobTwo.contains(oTo)){
				return ;
			}
			
			var n = getDir(this,ev);
			var oSpan = this.children[0];
			switch(n){
				case 0:
					$(oSpan).stop().animate({left:"-150px",top:0});
					break;
				case 1:
					$(oSpan).stop().animate({left:0,top:"150px"});
					break;
				case 2:
					$(oSpan).stop().animate({left:"150px",top:0});
					break;
				case 3:
					$(oSpan).stop().animate({left:0,top:"-150px"});
					break;
			}	
			
			
		};	
	
	}

	//job-nine
	var oJobNineJpg1=document.getElementById('jobninejpg1');
	var oJobNineJpg2=document.getElementById('jobninejpg2');
	var oBigImg=document.getElementById('bigImg');
	var oMark=document.getElementById('mark');
	oJobNineJpg1.onmouseover=function(){
		oMark.style.display='block';
		oJobNineJpg2.style.display='block';	
	};	
	oJobNineJpg1.onmouseout=function(){
		oMark.style.display='none';
		oJobNineJpg2.style.display='none';	
	};	
	oJobNineJpg1.onmousemove=function(ev){
		var oEvt=ev||event;
		var l=oEvt.clientX-oMark.offsetWidth/2;
		var t=oEvt.clientY-oMark.offsetHeight/2;
		if(l<0) l=0;
		if(l>oJobNineJpg1.offsetWidth-oMark.offsetWidth)
			l=oJobNineJpg1.offsetWidth-oMark.offsetWidth;
		if(t<0) t=0;
		if(t>oJobNineJpg1.offsetHeight-oMark.offsetHeight)
			t=oJobNineJpg1.offsetHeight-oMark.offsetHeight;		
		oMark.style.left=l+'px';//使用
		oMark.style.top=t+'px';		
		oBigImg.style.left=-oMark.offsetLeft/(oJobNineJpg1.offsetWidth-oMark.offsetWidth)*(oBigImg.offsetWidth-oJobNineJpg2.offsetWidth)+'px';
		oBigImg.style.top=-oMark.offsetTop/(oJobNineJpg1.offsetHeight-oMark.offsetHeight)*(oBigImg.offsetHeight-oJobNineJpg2.offsetHeight)+'px';
	};
	
	//job-ten
	var oJobTen=document.getElementById('jobten');
	var gd=oJobTen.getContext('2d');
	 
	var winW=window.innerWidth;
	var winH=window.innerHeight;
	oJobTen.width=winW;
	oJobTen.height=winH;
	
	var N=5;
	var aPoint=[];
	for(var i=0;i<N;i++){
		aPoint[i]={
			w:1,
			h:1,
			x:rnd(0,winW),
			y:rnd(0,winH),
			speedX:rnd(-10,10),
			speedY:rnd(-10,10)	
		};
	}	
	
	var oldPoint=[];
	setInterval(function(){
		gd.clearRect(0,0,oJobTen.width,oJobTen.height);
		for(var i=0;i<N;i++){
			drawPoint(aPoint[i]);
			
			aPoint[i].x +=aPoint[i].speedX;
			aPoint[i].y +=aPoint[i].speedY;
			
			if(aPoint[i].x<0){
				aPoint[i].speedX *=-1;	
			}
			if(aPoint[i].x>winW){
				aPoint[i].speedX *=-1;	
			}
			if(aPoint[i].y<0){
				aPoint[i].speedY *=-1;	
			}
			if(aPoint[i].y>winH){
				aPoint[i].speedY *=-1;	
			}	
		}
		gd.beginPath();
		gd.moveTo(aPoint[0].x,aPoint[0].y);
		for(var i=1;i<N;i++){
			gd.lineTo(aPoint[i].x,aPoint[i].y);	
		}
		gd.closePath();
		gd.strokeStyle='red';
		gd.stroke();
		
		var arr=[];
		for(var i=0;i<N;i++){
			arr.push({x:aPoint[i].x,y:aPoint[i].y});	
		}
		oldPoint.push(arr);
		while(oldPoint.length>10){
			oldPoint.shift();
		}	
		for(var i=0;i<oldPoint.length;i++){
			gd.beginPath();
			gd.moveTo(oldPoint[i][0].x,oldPoint[i][0].y);
			for(var j=1;j<N;j++){
				gd.lineTo(oldPoint[i][j].x,oldPoint[i][j].y);	
			}	
			gd.closePath();
			var opacity=i/oldPoint.length;
			gd.strokeStyle='rgba(255,0,0,'+opacity+')';
			gd.stroke();
		}
	},16);
	function drawPoint(p){
		gd.fillStyle='#fff';
		gd.fillRect(p.x,p.y,p.w,p.h);
		gd.strokeRect(p.x,p.y,p.w,p.h);	
	};

	
			
	
	//suiij
	function rnd(m,n){
		return parseInt(n+Math.random()*(m-n));
	}

	
	
		//我的作品 点击
	$('#job-two').css('display','none');
	$('#div1').css('display','none');
	$('#pic-drag').click(function(){
		$('#work-border').fadeIn();	
		$('#close').fadeIn();
		$('.mode').slideDown();
	});
	$('#close').click(function(ev){
		$('#work-border').fadeOut();
		$('#close').fadeOut();	
		$('#job-one').fadeOut();
		$('#job-two').fadeOut();
		$('#div1').fadeOut();
		$('#job-four').fadeOut();
		$('#job-five').fadeOut();
		$('#job-six').fadeOut();
		$('#job-seven').fadeOut();
		$('#job-eight').fadeOut();
		$('#job-nine').fadeOut();
		$('#job-ten').fadeOut();
		$('.mode').slideUp();
		ev.stopPropagation();//阻止冒泡	
	});	

	
	$('.skill-title').click(function(){
		$('.skill').fadeIn();
		$('.main').fadeOut();
		$('.callme').fadeOut();		
	})
	$('.word').click(function(){
		$('.main').fadeIn();
		$('.skill').fadeOut();	
		$('.callme').fadeOut();	
	})
	$('.call-me').click(function(){
		$('.callme').fadeIn();
		$('.skill').fadeOut();	
		$('.main').fadeOut();	
	})
	
	$('#3Dhuan').click(function(){
	$('#job-one').fadeIn();	
	//$('#mask').show('fast');	
	//$('#layer').show('fast');
	//$('#layer').show(800);
	$('.mode').slideDown();
	});
	
	$('#tuozhuai').click(function(){
	$('#job-two').fadeIn();	
	//$('#mask').show('fast');	
	//$('#layer').show('fast');
	//$('#layer').show(800);
	$('.mode').slideDown();
	});
	$('#baozha').click(function(){
	$('#div1').fadeIn();	
	//$('#mask').show('fast');	
	//$('#layer').show('fast');
	//$('#layer').show(800);
	$('.mode').slideDown();
	});
	
	
	$('#fanye').click(function(){
	$('#job-four').fadeIn();	
	//$('#mask').show('fast');	
	//$('#layer').show('fast');
	//$('#layer').show(800);
	$('.mode').slideDown();
	});
	
	$('#shizhong').click(function(){
	$('#job-five').fadeIn();	
	//$('#mask').show('fast');	
	//$('#layer').show('fast');
	//$('#layer').show(800);
	$('.mode').slideDown();
	});
	
	$('#lanqiu').click(function(){
	$('#job-six').fadeIn();	
	//$('#mask').show('fast');	
	//$('#layer').show('fast');
	//$('#layer').show(800);
	$('.mode').slideDown();
	});
	$('#shoufengqin').click(function(){
	$('#job-seven').fadeIn();	
	//$('#mask').show('fast');	
	//$('#layer').show('fast');
	//$('#layer').show(800);
	$('.mode').slideDown();
	});
	$('#chuanqiang').click(function(){
	$('#job-eight').fadeIn();	
	//$('#mask').show('fast');	
	//$('#layer').show('fast');
	//$('#layer').show(800);
	$('.mode').slideDown();
	});
	
	$('#fangdajing').click(function(){
	$('#job-nine').fadeIn();	
	//$('#mask').show('fast');	
	//$('#layer').show('fast');
	//$('#layer').show(800);
	$('.mode').slideDown();
	});
	
	$('#pingbao').click(function(){
	$('#job-ten').fadeIn();	
	//$('#mask').show('fast');	
	//$('#layer').show('fast');
	//$('#layer').show(800);
	$('.mode').slideDown();
	});
		
		


	alert('网站还在继续建设当中--敬请期待！（- _ -）')

};

function a2d(n){
	return n*180/Math.PI;	
}
function getDir(obj,ev){
	var x = ev.clientX - (obj.offsetLeft + obj.offsetWidth/2);
	var y = obj.offsetTop + obj.offsetHeight/2 - ev.clientY;
	
	//0 左边  1 下边 2 右边 3上边
	return Math.round((a2d(Math.atan2(y,x))+180)/90)%4;
}

