        var div = document.getElementsByClassName('run')[0];
        var imgs = div.getElementsByClassName('runimg');//图片
        var index = div.getElementsByClassName('index')[0];
        var indexs = index.getElementsByTagName('a');//索引
        var leftmove = div.getElementsByClassName('left')[0];//左切换
        var rightmove = div.getElementsByClassName('right')[0];//右切换
 
        for(var i = 0 ; i < indexs.length; i ++){
            indexs[i].s = i; 
        }
        
        var count = 0;
        //轮播
        var run = setInterval(start,2500); 
        
        // //鼠标移入移除事件绑定
        div.addEventListener("mouseover",function(){
            clearInterval(run);
        },false);
 
        div.addEventListener("mouseout",function(){
            clearInterval(run);
            run = setInterval(start,2500);
        },false);
        
        // //上一张、下一张按钮事件绑定
        leftmove.addEventListener("click",function(){
            imgs[count].style.opacity= 0;
            indexs[count].style.backgroundColor = "rgba(0,0,0,0.4)";
            count --;
            if(count == -1){
                count = 4;
            }
            imgs[count].style.opacity = 1;
            indexs[count].style.backgroundColor = "rgba(255,255,255,0.4)";
        },false);
 
        rightmove.addEventListener("click",start,false);
 
        // //点击索引小圆点事件绑定
        index.addEventListener('click',function(e){
            var event = e || window.event;
            var target = event.target || event.srcElement;
            indexs[count].style.backgroundColor = "rgba(0,0,0,0.4)";
            imgs[count].style.opacity = 0;
            count = target.s;
            imgs[count].style.opacity = 1;
            indexs[count].style.backgroundColor = "rgba(255,255,255,0.4)";
        },false);
 
        //轮播函数
        function start (){
            imgs[count].style.opacity= 0;
            indexs[count].style.backgroundColor = "rgba(0,0,0,0.4)";
            count ++;
            if(count == 5){
                count = 0;
            }
            imgs[count].style.opacity = 1;
            indexs[count].style.backgroundColor = "rgba(255,255,255,0.4)";
        }