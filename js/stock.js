// @ts-nocheck
var vm = new Vue({
    el: '#app',
    data: {
        year: [],
        type: [],
        selectYear: 2019,
        selectType: '10kV变压器,400kVA,普通,硅钢片,油浸',
        month: [],
        selected: [],
        rate: [],
        city: ['绍兴', '上虞区', '嵊州市', '诸暨市', '新昌县']
    },
    methods: {
        getAll() {
            $.ajax({
                type: "get",
                dataType: "json",
                url: "json/stockStructure.json",
                // async: true,
                success: function (r) {
                    var data = vm.rate = r.data;
                    // console.log(data)
                    // 获取年份
                    var year = [];
                    for (var i = 0; i < data.length; i++) {
                        year.push(data[i].year.slice(0, 4));
                    }
                    var years = [];
                    for (var j = 0; j < year.length; j++) {
                        years.push(Number(year[j]));
                    }

                    var that = [];
                    for (var k = 0; k < years.length; k++) {
                        if (years.indexOf(years[k]) == k) {
                            that.unshift(years[k]);
                        }
                    }
                    vm.year = that;
                    //获取下拉框拿到的数据
                    var sel = r.data;
                    var sele = sel.filter((item) => {
                        return item.year == vm.selectYear;
                    });
                    //获取类别
                    var ty = sele;
                    var type = [];
                    for (var a = 0; a < ty.length; a++) {
                        type.push(ty[a].type);
                    }
                    var typ = [];
                    for (var b = 0; b < type.length; b++) {
                        if (type.indexOf(type[b]) == b) {
                            typ.push(type[b]);
                        }
                    }
                    vm.type = typ;
                    //获取默认选中的种类
                    var select = sele.filter((item) => {
                        return item.type == vm.selectType;
                    })
                    vm.selected = select;
                }
            })
        },

        loginOut() {
            if (confirm('您确定要退出吗？')) {
                alert('退出成功');
                window.location.href = "login.html";
            } else {
                console.log('退出失败');
            }
        },
    },
    computed: {
        Data() {
            var result = []
            for (var i = 0; i < this.city.length; i++) {
                var data = this.rate.filter(res => {
                    return res.district === this.city[i] && res.year == this.selectYear && res.type == this.selectType;
                });
                var months = Array(12);
                for (var j = 0; j < data.length; j++) {
                    months[data[j].month - 1] = data[j].rate;                    
                }                
                result.push({
                    city: this.city[i],
                    months: months
                });                
            }
            return result;
        },
    },
    created() {
        this.getAll();
    },
    watch: {
        selectYear: function () {
            this.getAll();
        },
        selectType: function () {
            this.getAll();
        },
    },
})