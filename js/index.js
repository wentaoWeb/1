// $(function(){
//     $('#nav li').click(function(){
//         var i = $(this).index();
//         // console.log(i);
//         $('#content li').eq(i).show().siblings().hide();
//     });   
// })
var vm = new Vue({
    el: '#app',
    data: {
        plan: [],
        actual: [],
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
        getPlan: function () {
            $.ajax({
                type: "get",
                url: "https://www.easy-mock.com/mock/5cf8b64a67b83b71ab05f007/example/getPlan",
                async: true,
                success: function (r) {
                    vm.plan = r.data.plan;
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
                            formatter: "{a} <br/>{b}月 : {c}"
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
                            min: 60,
                            max: 140,
                            interval: 20,
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
                }
            });
        },
        getUserprofile: function () {
            $.ajax({
                type: "get",
                url: "https://www.easy-mock.com/mock/5d00baabc11e540be09bc03d/predict/userProfile",
                async: true,
                success: function (r) {
                    var data = r.data;
                    for (var i = 0; i < data.length; i++) {
                        var one = data[i];
                        delete one.district;
                    }

                    vm.p.user = [],
                        vm.p.user.push(data[0]);
                    var obj = vm.p.user[0];
                    for (var i in obj) {
                        var val = {
                            'value': Number(obj[i].toString().slice(0, 2)),
                            'name': i
                        };
                        vm.p.user.push(val);
                    }
                    vm.p.user = vm.p.user.slice(1, 4)
                    // console.log(vm.p.user);

                    vm.p1.user = [];
                    vm.p1.user.push(data[0]);
                    var obj = vm.p1.user[0];
                    for (var i in obj) {
                        var val = {
                            'value': Number(obj[i].toString().slice(0, 2)),
                            'name': i
                        };
                        vm.p1.user.push(val);
                    }
                    vm.p1.user = vm.p1.user.slice(1, 4)

                    vm.p2.user = [];
                    vm.p2.user.push(data[1]);
                    var obj = vm.p2.user[1];
                    for (var i in obj) {
                        var val = {
                            'value': Number(obj[i].toString().slice(0, 2)),
                            'name': i
                        };
                        vm.p2.user.push(val);
                    }
                    vm.p2.user = vm.p2.user.slice(1, 4)

                    vm.p3.user = [];
                    vm.p3.user.push(data[2]);
                    var obj = vm.p3.user[2];
                    for (var i in obj) {
                        var val = {
                            'value': Number(obj[i].toString().slice(0, 2)),
                            'name': i
                        };
                        vm.p3.user.push(val);
                    }
                    vm.p3.user = vm.p3.user.slice(1, 4)

                    vm.p4.user = [];
                    vm.p4.user.push(data[3]);
                    var obj = vm.p4.user[3];
                    for (var i in obj) {
                        var val = {
                            'value': Number(obj[i].toString().slice(0, 2)),
                            'name': i
                        };
                        vm.p4.user.push(val);
                    }
                    vm.p4.user = vm.p4.user.slice(1, 4)

                    vm.p5.user = [];
                    vm.p5.user.push(data[4]);
                    var obj = vm.p5.user[4];
                    for (var i in obj) {
                        var val = {
                            'value': Number(obj[i].toString().slice(0, 2)),
                            'name': i
                        };
                        vm.p5.user.push(val);
                    }
                    vm.p5.user = vm.p5.user.slice(1, 4)

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
                    var data = r.data;
                    for (var i = 0; i < data.length; i++) {
                        var one = data[i];
                        delete one.district;
                    }

                    vm.p.assets = [],
                        vm.p.assets.push(data[0]);
                    var obj = vm.p.assets[0];
                    for (var i in obj) {
                        var val = {
                            'value': Number(obj[i].toString().slice(0, 2)),
                            'name': i
                        };
                        vm.p.assets.push(val);
                    }
                    vm.p.assets = vm.p.assets.slice(1, 4)
                    // console.log(vm.p.assets);

                    vm.p1.assets = [];
                    vm.p1.assets.push(data[0]);
                    var obj = vm.p1.assets[0];
                    for (var i in obj) {
                        var val = {
                            'value': Number(obj[i].toString().slice(0, 2)),
                            'name': i
                        };
                        vm.p1.assets.push(val);
                    }
                    vm.p1.assets = vm.p1.assets.slice(1, 4)

                    vm.p2.assets = [];
                    vm.p2.assets.push(data[1]);
                    var obj = vm.p2.assets[1];
                    for (var i in obj) {
                        var val = {
                            'value': Number(obj[i].toString().slice(0, 2)),
                            'name': i
                        };
                        vm.p2.assets.push(val);
                    }
                    vm.p2.assets = vm.p2.assets.slice(1, 4)

                    vm.p3.assets = [];
                    vm.p3.assets.push(data[2]);
                    var obj = vm.p3.assets[2];
                    for (var i in obj) {
                        var val = {
                            'value': Number(obj[i].toString().slice(0, 2)),
                            'name': i
                        };
                        vm.p3.assets.push(val);
                    }
                    vm.p3.assets = vm.p3.assets.slice(1, 4)

                    vm.p4.assets = [];
                    vm.p4.assets.push(data[3]);
                    var obj = vm.p4.assets[3];
                    for (var i in obj) {
                        var val = {
                            'value': Number(obj[i].toString().slice(0, 2)),
                            'name': i
                        };
                        vm.p4.assets.push(val);
                    }
                    vm.p4.assets = vm.p4.assets.slice(1, 4)

                    vm.p5.assets = [];
                    vm.p5.assets.push(data[4]);
                    var obj = vm.p5.assets[4];
                    for (var i in obj) {
                        var val = {
                            'value': Number(obj[i].toString().slice(0, 2)),
                            'name': i
                        };
                        vm.p5.assets.push(val);
                    }
                    vm.p5.assets = vm.p5.assets.slice(1, 4)

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
                    var data = r.data;
                    for (var i = 0; i < data.length; i++) {
                        var one = data[i];
                        delete one.district;
                    }

                    vm.p.loadrate = [],
                        vm.p.loadrate.push(data[0]);
                    var obj = vm.p.loadrate[0];
                    for (var i in obj) {
                        var val = {
                            'value': Number(obj[i].toString().slice(0, 2)),
                            'name': i
                        };
                        vm.p.loadrate.push(val);
                    }
                    vm.p.loadrate = vm.p.loadrate.slice(1, 4)
                    // console.log(vm.p.loadrate);

                    vm.p1.loadrate = [];
                    vm.p1.loadrate.push(data[0]);
                    var obj = vm.p1.loadrate[0];
                    for (var i in obj) {
                        var val = {
                            'value': Number(obj[i].toString().slice(0, 2)),
                            'name': i
                        };
                        vm.p1.loadrate.push(val);
                    }
                    vm.p1.loadrate = vm.p1.loadrate.slice(1, 4)

                    vm.p2.loadrate = [];
                    vm.p2.loadrate.push(data[1]);
                    var obj = vm.p2.loadrate[1];
                    for (var i in obj) {
                        var val = {
                            'value': Number(obj[i].toString().slice(0, 2)),
                            'name': i
                        };
                        vm.p2.loadrate.push(val);
                    }
                    vm.p2.loadrate = vm.p2.loadrate.slice(1, 4)

                    vm.p3.loadrate = [];
                    vm.p3.loadrate.push(data[2]);
                    var obj = vm.p3.loadrate[2];
                    for (var i in obj) {
                        var val = {
                            'value': Number(obj[i].toString().slice(0, 2)),
                            'name': i
                        };
                        vm.p3.loadrate.push(val);
                    }
                    vm.p3.loadrate = vm.p3.loadrate.slice(1, 4)

                    vm.p4.loadrate = [];
                    vm.p4.loadrate.push(data[3]);
                    var obj = vm.p4.loadrate[3];
                    for (var i in obj) {
                        var val = {
                            'value': Number(obj[i].toString().slice(0, 2)),
                            'name': i
                        };
                        vm.p4.loadrate.push(val);
                    }
                    vm.p4.loadrate = vm.p4.loadrate.slice(1, 4)

                    vm.p5.loadrate = [];
                    vm.p5.loadrate.push(data[4]);
                    var obj = vm.p5.loadrate[4];
                    for (var i in obj) {
                        var val = {
                            'value': Number(obj[i].toString().slice(0, 2)),
                            'name': i
                        };
                        vm.p5.loadrate.push(val);
                    }
                    vm.p5.loadrate = vm.p5.loadrate.slice(1, 4)

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
                window.location.href = "login.html";
            } else {
                console.log('退出失败');
            }
        },
        get(val) {
            var val = val.target.value;
            if (val == '嵊州') {
                vm.p1 = vm.p2;
                // this.getGeography();
                // this.getUserprofile();
                // this.getResidueratio();
                // this.getLoad();                 
                return vm.p1;
            } else if (val == '诸暨') {
                vm.p1 = vm.p3;
                // this.getGeography();
                // this.getUserprofile();
                // this.getResidueratio();
                // this.getLoad();  
                return vm.p1;
            } else if (val == '新昌') {
                vm.p1 = vm.p4;
                // this.getGeography();
                // this.getUserprofile();
                // this.getResidueratio();
                // this.getLoad(); 
                return vm.p1;
            } else if (val == '绍兴市') {
                vm.p1 = vm.p;
                // this.getGeography();
                // this.getUserprofile();
                // this.getResidueratio();
                // this.getLoad();  
                return vm.p1;
            } else if (val == '上虞') {
                vm.p1 = vm.p;
                // this.getGeography();
                // this.getUserprofile();
                // this.getResidueratio();
                // this.getLoad();  
                return vm.p1;
            } else if (val == '') {
                vm.p1 = vm.p;
                // this.getGeography();
                // this.getUserprofile();
                // this.getResidueratio();
                // this.getLoad();  
                return vm.p1;
            }
        },
    },
    mounted() {
        this.getPlan();
        this.getActual();
        this.getGeo();
        this.getUserprofile();
        this.getResidueratio();
        this.getLoad();
    },
    watch:{
        selected(){
            this.getGeo();
            // console.log(this.selected);
        }
    }
})