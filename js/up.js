// JavaScript Document


function readyBaiduDate(str,fn){
	
	var fnName=('jsonp'+Math.random()).replace('.','');
	window[fnName]=function(json){
		fn&&fn(json);
		document.body.removeChild(oScript);
		window[fnName]=null;	
	};
	
	var oScript=document.createElement('script');
	
	
	oScript.src='https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+str+'&cb='+fnName;
	document.body.appendChild(oScript);
}

//V
function writeLi(json){
	var oUl=document.getElementById('ul1');
	oUl.innerHTML='';
	var arr=json.s;
	
	var str='';
	for(var i=0;i<arr.length;i++){
		//var oLi=document.createElement('li');
		//<li>数据</li>
		str+='<li>';
		//oLi.innerHTML=arr[i];
		str+=arr[i];
		str+='</li>';
		//oUl.appendChild(oLi);
	}
	oUl.innerHTML=str;
}

//C
window.onload=function(){
	var oIpt=document.getElementById('search');
	oIpt.onkeyup=function(){
		readyBaiduDate(oIpt.value,function(json){//M
			writeLi(json);	//V
		});	
	};
	
	var aOl=document.getElementById('pic-move');
	var aPicMove=aOl.children;
	
	for(var i=0;i<aPicMove.length;i++){
		addWall(aPicMove[i]);
	}
};

