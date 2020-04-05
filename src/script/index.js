!function($){
    //1.二级侧栏
    let $leftli = $('.leftBar li');
    // $leftli.on('mouseover',function(){
    //     $(this).addClass('active').siblings('li').removeClass('active');
    // });
    // $leftli.on('mouseout',function(){
    //     $leftli.removeClass('active');
    // });
    let $cartlist = $('.cartlist');
    let $items = $('.cartlist .item');

    $leftli.on('mouseover',function(){
        $cartlist.show();
        if($(window).scrollTop()>$('.main').offset().top){
            $cartlist.css({
                top:$(window).scrollTop() - $('.main').offset().top
            })
            
        } else {
            $cartlist.css({
                top:0
            })
        }
        $items.eq($(this).index()).show().siblings('.item').hide();
    });
    $leftli.on('mouseout',function(){
        $cartlist.hide();
    });
    $cartlist.on('mouseover',function(){
        $cartlist.show();
    });
    $cartlist.on('mouseout',function(){
        $cartlist.hide();
    });

}(jQuery);