var swiper = new Swiper('.swiper-container', {
    // autoplay: true,
    effect: "fade",
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.btn',
        // prevEl: '.swiper-button-prev',
    },
});
var vm = new Vue({
    el:'#app',
    data:{
        
    },
    methods:{
        loginOut(){
            if(confirm('您确定要退出吗？')){
                alert('退出成功');
                window.location.href = "login.html";
            }else{
                console.log('退出失败');
            }
        },
    }
})