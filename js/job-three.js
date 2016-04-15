// JavaScript Document

	var oDiv=document.getElementById('div1');
	var R=10;
	var C=10;
	var len=C*R;

	for(var r=0;r<R;r++){
		for(var c=0;c<C;c++){
			var oSpan=document.createElement('span');
			oDiv.appendChild(oSpan);
			oSpan.style.left=c*oSpan.offsetWidth+'px';
			oSpan.style.top=r*oSpan.offsetHeight+'px';
			oSpan.style.backgroundPosition=-oSpan.offsetLeft+'px -'+oSpan.offsetTop+'px'
		}
	}

	var iNow=0;
	var aSpan=oDiv.children;
	oDiv.onclick=function(){
		//两张图片都要换
		
		for(var i=0;i<len;i++){
			aSpan[i].style.transition="none";
			aSpan[i].style.opacity='1';
			aSpan[i].style.transform="translate(0,0) rotateX(0deg) rotateY(0deg)"
			aSpan[i].style.backgroundImage="../images/"+iNow%3+".jpg)"

		}
		iNow++;
		oDiv.style.backgroundImage="url(../images/"+(iNow+1)%3+".jpg)"
		//span需要爆炸
		setTimeout(function(){
			for(var i=0;i<len;i++){
				var x=aSpan[i].offsetLeft+aSpan[i].offsetWidth/2-oDiv.offsetWidth/2+'px';
				var y=aSpan[i].offsetTop+aSpan[i].offsetHeight/2-oDiv.offsetHeight/2+'px';
				aSpan[i].style.transform="translate("+x+","+y+") rotateX("+rnd(-180,180)+"deg) rotateY("+rnd(-180,180)+"deg)";
				aSpan[i].style.opacity=0;
				aSpan[i].style.transition='2s all ease';
			}
		},0)
	}

