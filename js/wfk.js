//导航栏区域
if($(".header-nav ul li").hasClass("navCur")){
    var psoLeft=$(".navCur").position().left;
    $(".header-nav i").stop();
    $(".header-nav i").animate({left:psoLeft+"px"},300);
    $(".header-nav ul li").mouseover(function(){
        var psoLeft=$(this).position().left;
        $(".header-nav i").stop();
        $(".header-nav i").animate({left:psoLeft+"px"},300);

    });
    $(".header-nav ul li").mouseout(function(){
        var psoLeft=$(".navCur").position().left;
        $(".header-nav i").stop();
        $(".header-nav i").animate({left:psoLeft+"px"},300);
    })
}
<!--支持微信支付商家模块-->
$(".pre").click(function(){
    $(".demo-common ul:first").animate({marginLeft:"-1100px"},500,function(){
        $(this).appendTo(".demo-common");
        $(".demo-common ul").css({marginLeft:"0px"});
    });
});
$(".next").click(function(){
    $(".demo-common ul:last").css({marginLeft:"-1100px"});
    $(".demo-common ul:last").prependTo(".demo-common");
    $('.demo-common ul:first').animate({marginLeft:'0px'},500);
});
//登录
$(".login-btn").click(function(){
    $(".loginMain").slideToggle();
});
$(".yh-zhuce").click(function(){
    $(".loginMain").slideToggle();
    $(".regMain").slideToggle();
});
$(".return-login").click(function(){
    $(".regMain").slideToggle();
    $(".loginMain").slideToggle();
});
$(".loginMain i").click(function(){
    $(".loginMain").slideToggle();
});
$(".regMain i").click(function(){
    $(".regMain").slideToggle();
});
//输入框
    //输入框是否有输入的情况
$("input[myAttr]").each(function(){
   if($(this).val()==""){
       $(this).attr("placeholder",$(this).attr("myAttr"));
   }
    $(this).focus(function(){
        if(!$(this).val()){
            $(this).attr("placeholder","");
            $(this).val("").css("color","#7c7c7c");

        }
    });
    $(this).blur(function(){
       if(!$(this).val()){
           $(this).attr("placeholder",$(this).attr("myAttr"));
           $(this).val("").css("color","#c2c2c2");
       }
    });
});
//登录的判断
$('#login').bind('click',function(){
var email=$.trim($('#email').val());
var password=$.trim($('#password').val());
var pattern = /^[a-z A-Z 0-9 _]+@[a-z A-Z 0-9 _]+(\.[a-z A-Z 0-9 _]+)+(\,[a-z A-Z 0-9 _]+@[a-z A-Z 0-9 _]+(\.[a-z A-Z 0-9 _]+)+)*$/;
    if(email=='' || email=='输入你的邮箱' || password=='') {
        alert("请输入正确的信息！");
        return false;
    } else if(email!='' && !pattern.test(email)) {
        alert('邮箱格式不对');
        return false;
    } else if(pattern.test(email) && password != ""){
        return true;
    }
});
//注册的判断
$("#yhzc").bind('click',function(){
    var email=$.trim($('#zc-email').val());
    var password=$.trim($('#zc-pwd').val());
    var rpwd=$.trim($('#zc-pwd').val());
    var pattern = /^[a-z A-Z 0-9 _]+@[a-z A-Z 0-9 _]+(\.[a-z A-Z 0-9 _]+)+(\,[a-z A-Z 0-9 _]+@[a-z A-Z 0-9 _]+(\.[a-z A-Z 0-9 _]+)+)*$/;
    if(email=='' || email=='输入你的邮箱' || password==''){
        alert("请填写正确的格式信息！");
        return false;
    }else if(password!=rpwd){
        alert("两次密码输入不一致！");
        return false;
    }else if(eamil!=""&&!pattern.test(eamil)){
        alert("请填写正确的邮箱格式！");
        return false;
    }else if(pattern.test(eamil)&&password==rpwd!=""){
        return true;
    }
});
//招聘岗位
$("#zhaopin li em").click(function(){
    $(this).parents("li").toggleClass("chose");
});
//agent页面模块切换
$(".agent-tit a").click(function(){
   $("."+$(this).attr("myChose")).show();
   $("."+$(this).siblings("a").attr("myChose")).hide();
});
//代理区域城市数据
$.ajax({
    type:"get",
    data:"",
    url:"data/jsonCity.json",
    dataType:"json",
    success:function(arr){
        for(var i=0;i<arr.length;i++){
            var option=$("<option>").val(arr[i].province).text(arr[i].province);
            $(".province").append(option);
        }
    }
});
$(".province").change(function(){
   var value=$(this).val() ;
    $(".city option:gt(0)").remove();
    $.ajax({
        type:"get",
        data:"",
        url:"data/jsonCity.json",
        dataType:"json",
        success:function(arr){
            for(var i=0;i<arr.length;i++){
                if(arr[i].province==value){
                    for(var j=0;j<arr[i].cities.length;j++){
                        var option=$("<option>").val(arr[i].cities[j]).text(arr[i].cities[j]);
                        $(".city").append(option);
                    }
                }
            }
        }
    });
});
//代理申请区域表单验证
$(".apply-btn").click(function(){
    var province= $.trim($(".province").val());
    var city= $.trim($(".city").val());
    var companyName= $.trim($("company-name").val());
    var chineseName= $.trim($(".chinese-name").val());
    var phone= $.trim($(".phone").val());
    var personalMail= $.trim($(".personal-mailbox").val());
    var pattern = /^[a-z A-Z 0-9 _]+@[a-z A-Z 0-9 _]+(\.[a-z A-Z 0-9 _]+)+(\,[a-z A-Z 0-9 _]+@[a-z A-Z 0-9 _]+(\.[a-z A-Z 0-9 _]+)+)*$/;
    var zhongwen=/[\u4e00-\u9fa5]/;
    var number=/^(\d{11})$/;
    if(province=="选择省份"||city=="选择城市"||companyName==""||chineseName==""||phone==""||personalMail==""||!pattern.test(personalMail)||!zhongwen.test(chineseName)||!number.test(phone)){
        alert("请填入正确的信息！");
        return false;
    }
});
//banner广告轮播区域
var n=0;
var timer="";
$(".banner-btn ul li").mouseenter(function(){
    clearInterval(timer);
    var k=$(".checked").index();

    var oldLiAttr=$(".banner-bg li").eq(k).attr("class");
    $(this).addClass("checked").siblings("li").removeClass("checked");
    n=$(this).index();
    $(".banner-bg li").eq(n).removeClass("hidden").siblings("li").addClass("hidden");
    var liAttr=$(".banner-bg li").eq(n).attr("class");
    console.log(oldLiAttr);
    $(".banner-con").children("[class^="+oldLiAttr+"]").stop().animate({left:"-99em",opacity: "0"},2000);
    var aaa=$(".banner-con").children("[class^="+liAttr+"]");
    for(var i=0;i<aaa.length;i++){
        var left=$(aaa[i]).attr("myLeft");
        $(aaa[i]).stop().animate({left:left,opacity:"1"},3000);
    }

    n++;
});
$(".banner-btn ul li").mouseleave(function () {
    timer = setInterval(imgMove, 8000);
})

timer = setInterval(imgMove, 8000);

function imgMove(){
    if(n>2){
        n=0;
    }
    $(".banner-bg li").eq(n).removeClass("hidden").siblings("li").addClass("hidden");
    $(".banner-btn li").eq(n).addClass("checked").siblings("li").removeClass("checked");
    var liAttr=$(".banner-bg li").eq(n).attr("class");
    var aaa=$(".banner-con").children("[class^="+liAttr+"]");
    for(var i=0;i<aaa.length;i++){
        var left=$(aaa[i]).attr("myLeft");
        $(aaa[i]).animate({left:left,opacity:"1"},3000);
    }
    $(".banner-con").children(":not([class^="+liAttr+"])").animate({left:"-99em",opacity: "0"},2000);
    n++;
}




