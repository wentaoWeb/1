var vm = new Vue({
    el:'#app',
    data:{
        username:'',
        password:''
    },
    methods:{
        user(){
            if(this.username == ""){       //验证用户名是否为空
                alert("请输入用户名！");
                this.$refs.name.focus();
                return false;
            }
        },
        pwd(){
            if(this.password == ""){       //验证密码是否为空
                alert("请输入密码！");
                this.$refs.pswd.focus();
                return false;
            }
        },
        getLogin(){  
            $.ajax({
                type: "get",
                url: "https://www.easy-mock.com/mock/5d00baabc11e540be09bc03d/predict/user",
                async: true,
                dataType:"json",
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',//防止乱码
                success: function (r) {
                    var geo = r.data;                            
                    if(vm.username == geo.username && vm.password == geo.password){
                        window.location.href = "index.html";                                
                    }else if(vm.username == geo.username && vm.password != geo.password){
                        alert('密码错误！');
                        this.$refs.pswd.focus();
                    }else if(vm.username != geo.username && vm.password == geo.password){
                        alert('用户名错误！');
                        this.$refs.name.focus();
                    }else{
                        alert('账号和密码错误！');
                        this.$refs.name.focus();
                    }                            
                }
            });
        }
    }
})