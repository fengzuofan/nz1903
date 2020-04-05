!function($){
    //获取所有接口数据，判断取值
    //封装函数
    function showlist(sid,num){
        $.ajax({
            url:'http://localhost/project/src/php/alldata.php',
            dataType:'json'
        }).done(function(data){
            $.each(data,function(index,value){
                if(sid == value.sid){
                    //获取cookie渲染对应的商品列表
                    let $clonebox = $('.cart-middle-list:hidden').clone(true,true);
                    $clonebox.find('.cart-col-select-img').find('img').attr('src',value.url);
                    $clonebox.find('.cart-col-select-img').find('img').attr('sid',value.sid);
                    $clonebox.find('.cart-col-select-description').html(value.title);
                    $clonebox.find('.cart-col-price').find('span').html(value.price);
                    $clonebox.find('.mz-adder-num').find('input').val(num);
                    //计算单个小计
                    $clonebox.find('.cart-col-total').find('span').html((value.price * num).toFixed(2));
                    $clonebox.css('display','block');
                    $('.cart-middle').append($clonebox);
                    calcprice();
                }
            })
            
        })
    }
    //获取cookie并渲染
    if(jscookie.get('cookiesid') && jscookie.get('cookienum')){
        let s = jscookie.get('cookiesid').split(',')//获取cookie并转换数组
        let n = jscookie.get('cookienum').split(',')//获取cookie并转换数组
        $.each(s,function(index,value){
            showlist(s[index],n[index])
        })
    }

    $(".check").prop("checked", true);
    //计算总价
    function calcprice(){
        let $sum = 0;//商品件数
        let $count = 0;//商品的总价
        $('.cart-middle-list:visible').each(function(ixdex,ele){
            if($(ele).find('.cart-col-select').find('input').prop('checked')){
                // alert($(ele).find('.cart-col-select').find('input').prop('checked'));
                
                $sum+=parseInt($(ele).find('.mz-adder-num input').val());
                $count+=parseFloat($(ele).find('.cart-col-total span').html());
            }
        });
        $('.cart-footer-count').find('span').html($sum);
        $('.cart-footer-total').html($count.toFixed(2));
    }
    //全选
    $('.allsell').on('change',function(){
        $('.cart-middle-list:visible').find(':checkbox').prop('checked',$(this).prop('checked'));
        $('.allsell').prop('checked',$(this).prop('checked'))
        calcprice();
    });
    //内部事件委托
    let $inputs = $('.cart-middle-list:visible').find(':checkbox');
    $('.cart-middle').on('change',$inputs,function(){
        if($('.cart-middle-list:visible').find(':checkbox').length === $('.cart-middle-list:visible').find('input:checked').length){
            $('.allsell').prop('checked',true);
        }else{
            $('.allsell').prop('checked',false);
        }
        calcprice();
    })

    //数量的改变

    $('.mz-adder-right').on('click',function(){
        let $num = $(this).parents('.cart-middle-list').find('.mz-adder-num input').val();
        $num++;
        $(this).parents('.cart-middle-list').find('.mz-adder-num input').val($num);
        $(this).parents('.cart-middle-list').find('.cart-col-total span').html(calcsingleprice($(this)));
        calcprice();
        setcookie($(this));
    });
    $('.mz-adder-left').on('click',function(){
        let $num = $(this).parents('.cart-middle-list').find('.mz-adder-num input').val();
        $num--;
        if($num<1){
            $num = 1;
        }
        $(this).parents('.cart-middle-list').find('.mz-adder-num input').val($num);
        $(this).parents('.cart-middle-list').find('.cart-col-total span').html(calcsingleprice($(this)));
        calcprice();
        setcookie($(this));
        
    });
    $('.mz-adder-input').on('input',function(){
        let $reg = /^\d+$/g;//只能输入数字
        let $value = $(this).val();
        if($reg.test($value)){
            if($value<1){
                $(this).val(1);
            }
        }else{
            $(this).val(1);
        };
        $(this).parents('.cart-middle-list').find('.cart-col-total span').html(calcsingleprice($(this)));
        calcprice();
        setcookie($(this));
    });


    //计算单价
    function calcsingleprice(obj){
        let $dj = parseFloat(obj.parents('.cart-middle-list').find('.cart-col-price span').html());
        let $num = obj.parents('.cart-middle-list').find('.mz-adder-num input').val();
        return ($dj*$num).toFixed(2)
    }

    //将改变后的数量放入cookie
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
    
    function setcookie(obj){
        cookietoarray();
        let $sid = obj.parents('.cart-middle-list').find('img').attr('sid');
        arrnum[$.inArray($sid,arrsid)]=obj.parents('.cart-middle-list').find('.mz-adder-num input').val();
        jscookie.add('cookienum',arrnum,10);
    }

    //删除
    function delcookie(sid,arrsid){
        let $index = -1;//删除的索引位置
        $.each(arrsid,function(index,value){
            if(sid === value){
                $index = index;
            }
        });
        arrsid.splice($index,1);
        arrnum.splice($index,1);
        jscookie.add('cookiesid',arrsid,10);
        jscookie.add('cookienum',arrnum,10);
    }
    $('.cart-col-ctrl').find('.cart-product-remove').on('click',function(){
        cookietoarray();
        if(window.confirm('你确定要删除吗？')){
            $(this).parents('.cart-middle-list').remove();
            delcookie($(this).parents('.cart-middle-list').find('img').attr('sid'),arrsid)
            calcprice();
        }

    });
    $('.cart-footer-left').find('.cart-remove-selected').on('click',function(){
        // alert(1)
        cookietoarray();
        if(window.confirm('你确定要全部删除吗？')){
            $('.cart-middle-list:visible').each(function(){
                if($(this).find(':checkbox').is(':checked')){//判断复选框是否选中
                    $(this).remove();
                    delcookie($(this).find('img').attr('sid'),arrsid);
                }
            });
            calcprice();
            
        }
    });
}(jQuery);