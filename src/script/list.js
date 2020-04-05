
!function ($) {

    let array_default = [];//默认数组
    let array = [];//排序中的数组
    let prev = null;
    let next = null;

    const $list = $('.list');
    //jQuery下面的ajax
    $.ajax({
        url: 'http://localhost/project/src/php/listdata.php',
        dataType: 'json'
    }).done(function (data) {
        let $strhtml = '<ul>'
        $.each(data, function (index, value) {
            $strhtml += `
                <li>
                    <a href="detail.html?sid=${value.sid}" target = "_blank">
                        <img calss="lazy" data-original="${value.url}" width="200" height="200"/>
                        <p>${value.sid}${value.title}</p>
                        <span class="price">￥${value.price}</span>
                        <span>${value.salenumber}</span>
                    </a> 
                </li>  
            `;
        });

        $strhtml += '</ul>';
        $list.html($strhtml);
            
        $(function(){
            $("img.lazy").lazyload({effect:"fadeIn"});
        });

        array_default = [];//默认数组
        array = [];//排序中的数组
        prev = null;
        next = null;

        $('.list li').each(function (index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
    });

    //事件委托  on(事件类型，委托内容，回调函数)


    //分页思路
    //告知后端当前请求的是第几页，将当前的页面的页码传递给后端

    $('.page').pagination({
        pageCount: 4,
        jump: true,//是否开启跳转到指定页数，布尔值
        prevContent: '上一页',
        nextContent: '下一页',
        callback: function (api) {
            console.log(api.getCurrent());//获取的页码
            $.ajax({
                url: 'http://localhost/project/src/php/listdata.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function (data) {
                let $strhtml = '<ul>'
                $.each(data, function (index, value) {
                    $strhtml += `
                <li>
                    <a href="detail.html?sid=${value.sid}" target="_blank">
                        <img src="${value.url}"/>
                        <p>${value.sid}${value.title}</p>
                        <span class="price">￥${value.price}</span>
                        <span>${value.salenumber}</span>
                    </a> 
                </li>  
            `;
                });
                $strhtml += '</ul>';
                $list.html($strhtml);

                array_default = [];//默认数组
                array = [];//排序中的数组
                prev = null;
                next = null;


                //讲页面中的li元素追加到两个数组中
                $('.list li').each(function (index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            })
        }
    });

    //排序
    $('button').eq(0).on('click', function () {
        $.each(array_default, function (index, value) {
            $('.list ul').append(value);
        });
        return;
    });
    $('button').eq(1).on('click', function () {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price').html().substring(1));
                next = parseFloat(array[j + 1].find('.price').html().substring(1));
                if (prev > next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        //清空原来的列表，将排序后的渲染上去
        $('.list ul').empty();
        $.each(array, function (index, value) {
            $('.list ul').append(value);
        });
    });
    $('button').eq(2).on('click', function () {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price').html().substring(1));
                next = parseFloat(array[j + 1].find('.price').html().substring(1));
                if (prev < next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        //清空原来的列表，将排序后的渲染上去
        $('.list ul').empty();
        $.each(array, function (index, value) {
            $('.list ul').append(value);
        });
    });



}(jQuery);