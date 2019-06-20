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
                type: "get",
                url: "https://www.easy-mock.com/mock/5d00baabc11e540be09bc03d/predict/user",
                async: true,
                dataType: "json",
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8', //防止乱码
                success: function (r) {
                    var geo = r.data;
                    if (vm.username == geo.username && vm.password == geo.password) {
                        self.location.href = "login.html";
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