var vm = new Vue({
    el:'#app',
    data:{
        
    },
    methods:{
        loginOut(){
            if(confirm('您确定要退出吗？')){
                alert('退出成功');
                self.location.href = "index.html";
            }else{
                console.log('退出失败');
            }
        },
    }
})