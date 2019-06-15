var vm = new Vue({
    el: '#app',
    data: {
        investment: [],
        amount: [],
        plan: [],
        stock: [],
        geo: [],
        selected: '绍兴市',
        city: ['绍兴市', '上虞', '嵊州', '新昌', '诸暨'],
        p: {
            user: [],
            assets: [],
            loadrate: []
        },
        p1: {
            user: [{
                value: 100,
                name: '平原'
            }],
            assets: [{
                value: 100,
                name: '平原'
            }],
            loadrate: [{
                value: 100,
                name: '平原'
            }]
        },
        p2: {
            user: [{
                value: 100,
                name: '平原'
            }],
            assets: [{
                value: 100,
                name: '平原'
            }],
            loadrate: [{
                value: 100,
                name: '平原'
            }]
        },
        p3: {
            user: [{
                value: 100,
                name: '平原'
            }],
            assets: [{
                value: 100,
                name: '平原'
            }],
            loadrate: [{
                value: 100,
                name: '平原'
            }]
        },
        p4: {
            user: [{
                value: 100,
                name: '平原'
            }],
            assets: [{
                value: 100,
                name: '平原'
            }],
            loadrate: [{
                value: 100,
                name: '平原'
            }]
        },
        p5: {
            user: [{
                value: 100,
                name: '平原'
            }],
            assets: [{
                value: 100,
                name: '平原'
            }],
            loadrate: [{
                value: 100,
                name: '平原'
            }]
        },
    },
    computed: {

    },
    methods: {
        getInvestment: function () {
            $.ajax({
                type: "get",
                url: "https://www.easy-mock.com/mock/5d00baabc11e540be09bc03d/predict/investment",
                async: true,
                success: function (r) {
                    vm.investment = r.data;
                    // console.log(vm.investment);
                }
            });
        },
        getamount: function () {
            $.ajax({
                type: "get",
                url: "https://www.easy-mock.com/mock/5d00baabc11e540be09bc03d/predict/amount",
                async: true,
                success: function (r) {
                    vm.amount = r.data;
                    // console.log(r.data);
                }
            });
        },
        getStock: function () {
            $.ajax({
                type: "get",
                url: "https://www.easy-mock.com/mock/5d00baabc11e540be09bc03d/predict/stock",
                async: true,
                success: function (r) {
                    vm.stock = r.data;
                    // console.log(r.data);
                }
            });
        },
        getActual: function () {
            $.ajax({
                type: "get",
                url: "https://www.easy-mock.com/mock/5d00baabc11e540be09bc03d/predict/pickAmount",
                async: true,
                success: function (r) {
                    var data = r.data;
                    vm.actual = [];
                    for (var i = 0; i < data.length; i++) {
                        vm.actual.push(Number(data[i].amount));
                    }
                    var mychart = echarts.init(document.getElementById('contTwo'));
                    var option = {
                        title: {
                            text: '绍兴市',
                            textStyle: {
                                // color: '#f5f7f6',
                                fontSize: '14',
                                fontWeight: 'bolder'
                            },
                            x: 'left',
                            left: '10%'
                        },
                        tooltip: {
                            trigger: 'axis',
                            formatter: "{a} <br/>{b}月 : {c}万元"
                        },
                        grid: {
                            left: '10%',
                            right: '10%',
                            bottom: '15%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'category',
                            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                            axisLabel: {
                                // textStyle: {
                                //     color: '#fff'
                                // },
                                formatter: '{value}月'
                            },
                            axisTick: {
                                show: false
                            },
                        },
                        yAxis: {
                            type: 'value',
                            // min: 60,
                            // max: 140,
                            // interval: 20,
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                        },
                        series: [{
                            name: '实际领用金额',
                            data: vm.actual,
                            type: 'line',
                            lineStyle: {
                                color: '#FB52B1'
                            },
                            smooth: true
                        }]
                    };
                    mychart.setOption(option);

                }
            });
        },
        getGeo() {
            $.ajax({
                type: "get",
                url: "https://www.easy-mock.com/mock/5d00baabc11e540be09bc03d/predict/district",
                async: true,
                success: function (r) {
                    var geo = r.data;
                    vm.geo = geo.filter((item) => {
                        // console.log(vm.selected)
                        return item.district == vm.selected;
                    })[0].environment
                    // console.log(vm.geo);
                }
            });
        },
        getUserprofile: function () {
            $.ajax({
                type: "get",
                url: "https://www.easy-mock.com/mock/5d00baabc11e540be09bc03d/predict/userProfile",
                async: true,
                success: function (r) {
                    var data = r.data.filter((item) =>{
                        return item.district == vm.selected;
                    });
                    //获取p的值
                    vm.p.user = [],
                    vm.p.user.push(data[0]);
                    for (var i = 0; i < data.length; i++) {
                        var one = data[i];
                        delete one.district;
                    }
                    var obj = vm.p.user[0];                                        
                    for (var i in obj) {
                        var val = {
                            'value': parseInt(obj[i]),
                            'name': i
                        };                        
                        vm.p.user.push(val);                        
                    }
                    var thr = vm.p.user.filter(function(ele,idx,arr){
                        return idx != 0;
                    })
                    vm.p.user = thr;
                    // console.log(thr)

                    //获取p1的值
                    vm.p1.user = [];
                    vm.p1.user.push(data[0]);
                    for (var i = 0; i < data.length; i++) {
                        var one = data[i];
                        delete one.district;
                    }
                    var obj = vm.p1.user[0];
                    for (var i in obj) {
                        var val = {
                            'value': parseInt(obj[i]),
                            'name': i
                        };
                        vm.p1.user.push(val);
                    }
                    var fo = vm.p.user.filter(function(ele,idx,arr){
                        return idx !== 0;
                    })
                    vm.p1.user = fo
                    //获取p2的值
                    vm.p2.user = [];
                    vm.p2.user.push(data[1]);
                    for (var i = 0; i < data.length; i++) {
                        var one = data[i];
                        delete one.district;
                    }
                    var obj = vm.p2.user[1];
                    for (var i in obj) {
                        var val = {
                            'value': parseInt(obj[i]),
                            'name': i
                        };
                        vm.p2.user.push(val);
                    }
                    var fi = vm.p.user.filter(function(ele,idx,arr){
                        return idx !== 0;
                    })
                    vm.p2.user = fi
                    //获取p3的值
                    vm.p3.user = [];
                    vm.p3.user.push(data[2]);
                    for (var i = 0; i < data.length; i++) {
                        var one = data[i];
                        delete one.district;
                    }
                    var obj = vm.p3.user[2];
                    for (var i in obj) {
                        var val = {
                            'value': parseInt(obj[i]),
                            'name': i
                        };
                        vm.p3.user.push(val);
                    }
                    var si = vm.p.user.filter(function(ele,idx,arr){
                        return idx !== 0;
                    })
                    vm.p3.user = si
                    //获取p4的值
                    vm.p4.user = [];
                    vm.p4.user.push(data[3]);
                    for (var i = 0; i < data.length; i++) {
                        var one = data[i];
                        delete one.district;
                    }
                    var obj = vm.p4.user[3];
                    for (var i in obj) {
                        var val = {
                            'value': parseInt(obj[i]),
                            'name': i
                        };
                        vm.p4.user.push(val);
                    }
                    var se = vm.p.user.filter(function(ele,idx,arr){
                        return idx !== 0;
                    })
                    vm.p4.user = se
                    //获取p5的值
                    vm.p5.user = [];
                    vm.p5.user.push(data[4]);
                    for (var i = 0; i < data.length; i++) {
                        var one = data[i];
                        delete one.district;
                    }
                    var obj = vm.p5.user[4];
                    for (var i in obj) {
                        var val = {
                            'value': parseInt(obj[i]),
                            'name': i
                        };
                        vm.p5.user.push(val);
                    }
                    var ei = vm.p.user.filter(function(ele,idx,arr){
                        return idx !== 0;
                    })
                    vm.p5.user = ei

                    var mychart = echarts.init(document.getElementById('user'));
                    var option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} :  {d}%"
                        },
                        calculable: true,
                        series: [{
                            name: '地区用户情况',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: vm.p.user
                        }, ]
                    }
                    mychart.setOption(option, true);
                }
            });
        },
        getResidueratio: function () {
            $.ajax({
                type: "get",
                url: "https://www.easy-mock.com/mock/5d00baabc11e540be09bc03d/predict/residueRatio",
                async: true,
                success: function (r) {
                    var data = r.data.filter((item) =>{
                        return item.district == vm.selected;
                    });
                    vm.p.assets = [],
                    vm.p.assets.push(data[0]);
                    for (var i = 0; i < data.length; i++) {
                        var one = data[i];
                        delete one.district;
                    }
                    var obj = vm.p.assets[0];
                    for (var i in obj) {
                        var val = {
                            'value': parseInt(obj[i]),
                            'name': i
                        };
                        vm.p.assets.push(val);
                    }
                    vm.p.assets = vm.p.assets
                    // console.log(vm.p.assets);

                    vm.p1.assets = [];
                    vm.p1.assets.push(data[0]);
                    for (var i = 0; i < data.length; i++) {
                        var one = data[i];
                        delete one.district;
                    }
                    var obj = vm.p1.assets[0];
                    for (var i in obj) {
                        var val = {
                            'value': parseInt(obj[i]),
                            'name': i
                        };
                        vm.p1.assets.push(val);
                    }
                    vm.p1.assets = vm.p1.assets

                    vm.p2.assets = [];
                    vm.p2.assets.push(data[1]);
                    for (var i = 0; i < data.length; i++) {
                        var one = data[i];
                        delete one.district;
                    }
                    var obj = vm.p2.assets[1];
                    for (var i in obj) {
                        var val = {
                            'value': parseInt(obj[i]),
                            'name': i
                        };
                        vm.p2.assets.push(val);
                    }
                    vm.p2.assets = vm.p2.assets

                    vm.p3.assets = [];
                    vm.p3.assets.push(data[2]);
                    for (var i = 0; i < data.length; i++) {
                        var one = data[i];
                        delete one.district;
                    }
                    var obj = vm.p3.assets[2];
                    for (var i in obj) {
                        var val = {
                            'value': parseInt(obj[i]),
                            'name': i
                        };
                        vm.p3.assets.push(val);
                    }
                    vm.p3.assets = vm.p3.assets

                    vm.p4.assets = [];
                    vm.p4.assets.push(data[3]);
                    for (var i = 0; i < data.length; i++) {
                        var one = data[i];
                        delete one.district;
                    }
                    var obj = vm.p4.assets[3];
                    for (var i in obj) {
                        var val = {
                            'value': parseInt(obj[i]),
                            'name': i
                        };
                        vm.p4.assets.push(val);
                    }
                    vm.p4.assets = vm.p4.assets

                    vm.p5.assets = [];
                    vm.p5.assets.push(data[4]);
                    for (var i = 0; i < data.length; i++) {
                        var one = data[i];
                        delete one.district;
                    }
                    var obj = vm.p5.assets[4];
                    for (var i in obj) {
                        var val = {
                            'value': parseInt(obj[i]),
                            'name': i
                        };
                        vm.p5.assets.push(val);
                    }
                    vm.p5.assets = vm.p5.assets

                    var mychart = echarts.init(document.getElementById('assets'));
                    var option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} :  {d}%"
                        },
                        calculable: true,
                        series: [{
                            name: '资产成新率',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: vm.p.assets
                        }, ]
                    }
                    mychart.setOption(option, true);
                }
            });
        },
        getLoad: function () {
            $.ajax({
                type: "get",
                url: "https://www.easy-mock.com/mock/5d00baabc11e540be09bc03d/predict/load",
                async: true,
                success: function (r) {
                    var data = r.data.filter((item) =>{
                        return item.district == vm.selected;
                    });
                    // console.log(data)
                    vm.p.loadrate = [];
                    var two = data[0];
                    vm.p.loadrate.push(two); 
                    var obj = vm.p.loadrate[0];
                    for (var i in obj) {
                        var val = {
                            'value': parseInt(obj[i]),
                            'name': i
                        };                        
                        vm.p.loadrate.push(val);
                    }
                    // console.log(vm.p.loadrate);

                    vm.p1.loadrate = [];
                    vm.p1.loadrate.push(data[0]);
                    var obj = vm.p1.loadrate[0];
                    for (var i in obj) {
                        var val = {
                            'value': parseInt(obj[i]),
                            'name': i
                        };
                        vm.p1.loadrate.push(val);
                    }

                    vm.p2.loadrate = [];
                    vm.p2.loadrate.push(data[1]);
                    var obj = vm.p2.loadrate[1];
                    for (var i in obj) {
                        var val = {
                            'value': parseInt(obj[i]),
                            'name': i
                        };
                        vm.p2.loadrate.push(val);
                    }

                    vm.p3.loadrate = [];
                    vm.p3.loadrate.push(data[2]);
                    var obj = vm.p3.loadrate[2];
                    for (var i in obj) {
                        var val = {
                            'value': parseInt(obj[i]),
                            'name': i
                        };
                        vm.p3.loadrate.push(val);
                    }

                    vm.p4.loadrate = [];
                    vm.p4.loadrate.push(data[3]);
                    var obj = vm.p4.loadrate[3];
                    for (var i in obj) {
                        var val = {
                            'value': parseInt(obj[i]),
                            'name': i
                        };
                        vm.p4.loadrate.push(val);
                    }

                    vm.p5.loadrate = [];
                    vm.p5.loadrate.push(data[4]);
                    var obj = vm.p5.loadrate[4];
                    for (var i in obj) {
                        var val = {
                            'value': parseInt(obj[i]),
                            'name': i
                        };
                        vm.p5.loadrate.push(val);
                    }

                    var mychart = echarts.init(document.getElementById('loadRate'));
                    var option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} :  {d}%"
                        },
                        calculable: true,
                        series: [{
                            name: '资产成新率',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: vm.p.loadrate
                        }, ]
                    }
                    mychart.setOption(option, true);
                }
            });
        },

        loginOut() {
            if (confirm('您确定要退出吗？')) {
                alert('退出成功');
                window.location.href = "index.html";
            } else {
                console.log('退出失败');
            }
        },
        
    },
    mounted() {
        this.getInvestment();
        this.getamount();
        this.getStock();
        this.getActual();
        this.getGeo();
        this.getUserprofile();
        this.getResidueratio();
        this.getLoad();
    },
    watch:{
        selected(){
            this.getGeo();
            this.getUserprofile();
            this.getResidueratio();
            this.getLoad();
            // console.log(this.selected);
        }
    }
})