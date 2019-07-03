var vm = new Vue({
    el: '#app',
    data: {
        username: '',
        password: '',
        msgname: '',
        msgpwd: ''
    },
    methods: {
        user() {
            if (this.username.length == 0) {
                this.msgname = "用户名不能为空";
                // this.$refs.name.focus();
            } else {
                this.msgname = "";
            }
            return false;
        },
        pwd() {
            var word = this.password.trim();
            if (word.length == 0){
                this.msgpwd = "密码不能为空";
                // this.$refs.pswd.focus();
            }else  {
                this.msgpwd = "";
            }
            return false;
        },
        getLogin() {
            $.ajax({
                url: "json/user.json",
                type: "GET",//请求方式为get
                dataType: "json", //返回数据格式为json
                // jsonp: "callback",
                async: true,
                success: function (r) {
                    console.log(r)
                    var geo = r.data;                    
                    if (vm.username == geo.username && vm.password == geo.password) {
                        window.location.href = "login.html";
                    } else if (vm.username == geo.username && vm.password != geo.password) {
                        alert('密码错误！');
                        // console.log(vm.$refs.name)
                        vm.$refs.pswd.focus();
                    } else if (vm.username != geo.username && vm.password == geo.password) {
                        alert('用户名错误！');
                        vm.$refs.name.focus();
                    } else {
                        alert('账号和密码错误！');
                        // this.$refs.name.focus();
                    }
                }
            });
        }
    }
})