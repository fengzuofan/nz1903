// // 获取传过来的id
// var url = window.location.search; // 获取当前地址
// var reg = /\?id=(\d+)/;
// var arr = reg.exec(url);
// // 判断一下id是否正确
// // console.log(arr); // 能提取到是一个数组，提取不到是null - 所以能拿来判断
// if(!arr){
//     location.href = 'list.html';
// }else{
//     // 发送ajax请求数据
//     var p = PAjax({
//         method:"post",
//         data:{
//             "id":arr[1]
//         },
//         dataType:"json",
//         url:"../server/detail.php"
//     });
//     p.then(function(res){
//         // console.log(res);
//         document.querySelector(".enlarge").innerHTML = `
//         <img src="${res.imgpath}" width="400" height="500">
//         `
//         document.querySelector(".name").innerText = res.name
//         document.querySelector(".price").innerText = res.price
//         document.querySelector(".introduce").innerText = res.introduce
//     });
// }
// // 判断用户是否登陆
// var username = getCookie("username");
// if(username){
//     document.querySelector(".box").innerHTML = '欢迎尊贵的VIP<font color="red" size="4">'+username+"</font>来到千峰！！！&nbsp;&nbsp;&nbsp;<a class='logout' href='javascript:;'>退出</a>";
//     var btn = document.querySelector(".logout");
//     // console.log(btn);
//     btn.onclick=function(){
//         removeCookie("username");
//         document.querySelector(".box").innerHTML = `
//             <div class="container">
//                 <a href="./login.html">登陆</a>
//                 <a href="./register.html">注册</a>
//             </div>
//         `
//     }
// }



!function ($) {
    let $sid = location.search.substring(1).split('=')[1];
    //默认sid为1
    if(!$sid){
        $sid = 1;
    }
    //渲染
    const $smallspic = $('#smallpic');
    const $bpic = $('#bpic');
    const $title = $('.loadtitle');
    const $price = $('.loadpcp');
    $.ajax({
        url:'http://localhost/project/src/php/getsid.php',
        data:{
            sid: $sid
        },
        dataType: 'json'
    }).done(function(d){
        console.log(d);
        $smallspic.attr('src',d.url);
        $smallspic.attr('sid',d.sid);//给图片添加唯一的sid
        $bpic.attr('src',d.url);
        $title.html(d.title);
        $price.html(d.price);
        let picarr = d.piclisturl.split(',');
        let $strhtml = '';
        $.each(picarr,function (index,value) {
            $strhtml += '<li><img src="'+value+'"/></li>'
        });
        $('.list ul').html($strhtml);
    });


    //放大镜
    const $spic = $('.spic');
    const $sf = $('.sf');//小放
    const $bf = $('.bf');//大放
    const $left = $('.left');
    const $right = $('.right');
    const $list = $('.list');
//$spic 小图  $bpic 大图
console.log($spic.width() , $bf.width() , $bpic.width());
    $sf.width($spic.width() * $bf.width() / $bpic.width());
    
    $sf.height($spic.height() * $bf.height() / $bpic.height());

    let $bili = $bpic.width() / $spic.width();

    $spic.hover(function(){
        $sf.css('visibility','visible');
        $bf.css('visibility','visible');
        $(this).on('mousemove',function(ev){
            let $leftvalue = ev.pageX-$('.intergoods').offset().left-$sf.width();
            let $topvalue = ev.pageY-$('.intergoods').offset().top-$sf.width()/2;
            if($leftvalue<0){
                $leftvalue = 0;
            }else if($leftvalue>=$spic.width()-$sf.width()){
                $leftvalue=$spic.width()-$sf.width();
            }

            if($topvalue<0){
                $topvalue = 0;
            }else if($topvalue>=$spic.height()-$sf.height()){
                $topvalue=$spic.height()-$sf.height();
            }
            $sf.css({
                left: $leftvalue,
                top: $topvalue,
            });

            $bpic.css({
                left: -$leftvalue*$bili,
                top: -$topvalue*$bili,
            })

        });
    },function(){
        $sf.css('visibility','hidden');
        $bf.css('visibility','hidden');
    })

    //小图切换
    $('.list ul').on('click','li',function(){
        let $imgurl = $(this).find('img').attr('src');
        $smallspic.attr('src',$imgurl);
        $bpic.attr('src',$imgurl);
    });


    //左右箭头函数
    let $num = 6;
    $right.on('click',function(){
        // alert($('.list ul li').length);
        
        let $lists = $('.list ul li');
        if($lists.length > $num){//限制点击条件
            $num++;
            $left.css('color','#333');
            if($lists.length == $num){
                $right.css('color','#fff');
            }
            $('.list ul').animate({
                left:-($num-6)*$lists.eq(0).outerWidth(true)
            })
        }

    });

    $left.on('click',function(){
        // alert($('.list ul li').length);
        
        let $lists = $('.list ul li');
        if($num > 6){
            $num--;
            $right.css('color','#333');
            if($num <= 6){
                $left.css('color','#fff');
            }
            $('.list ul').animate({
                left:-($num-6)*$lists.eq(0).outerWidth(true)
            });
        }

    });


    //购物车
    let arrsid = [];//商品编号
    let arrnum = [];//商品数量
    //取出cookie，判断第几次
    function cookietoarray(){
        if(jscookie.get('cookiesid') && jscookie.get('cookienum')){
            arrsid = jscookie.get('cookiesid').split(',')//获取cookie并转换数组
            arrnum = jscookie.get('cookienum').split(',')//获取cookie并转换数组
        }else{
            arrsid = [];
            arrnum = [];
        }
    }    


    
    
    $('.p-btn a').on('click',function(){
        let $sid = $(this).parents('.intergoods').find('#smallpic').attr('sid');
        // alert($num);
        //判断是第一次点击还是多次点击
        cookietoarray();
        if($.inArray($sid,arrsid)!=-1){//数量累加即可
           let $num = parseInt(arrnum[$.inArray($sid,arrsid)])+parseInt($('#count').val());
            arrnum[$.inArray($sid,arrsid)] = $num;
            jscookie.add('cookienum',arrnum,10);
        }else{
            arrsid.push($sid);
            jscookie.add('cookiesid',arrsid,10);
            arrnum.push($('#count').val());
            jscookie.add('cookienum',arrnum,10);
        }
        


    });



}(jQuery);