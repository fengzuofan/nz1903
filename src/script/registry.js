!function($){
    let $user = $('.username');
    let $usernameflag = true;
    $user.on('blur',function(){
        $.ajax({
            type:'post',
            url:http://localhost/project/src/php/registry.php,
            data:{
                username:$user.val()
            }
        }),done(function(result){
            if(!result){//不存在
                $('span').html('').css('color','green');
                $usernameflag = true;
            }else{
                $('span').html('该用户名已经存在').css('color','red');
            }
        })
    });
}(jQuery);