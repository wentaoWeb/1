// @ts-ignore
var vm = new Vue({
    el: '#app',
    data: {
        year: [],
        type: [],
        selectYear: 2019,
        selectType: '10kV变压器,400kVA,普通,硅钢片,油浸',
        month: [],
        selected:[],
        predict :[],//预测值
        adjustment :[],//调整值
        acture :[],
        error :[],
},
    computed:{
        sumPredict(){
            var predict =  this.predict;
            var sum = 0;
            for(var i=predict.length-1; i>=0; i--){
                sum += predict[i];                 
            }
            return sum;          
        },
        sumAdjustment(){
            var adjustment =  this.adjustment;
            var sum = 0;
            for(var i=adjustment.length-1; i>=0; i--){
                sum += adjustment[i];                 
            }
            return sum;          
        },
        sumActure(){
            var acture =  this.acture;
            var sum = 0;
            for(var i=acture.length-1; i>=0; i--){
                sum += acture[i];                 
            }
            return sum;          
        },
        // sumError(){
              
        // },
    },
    methods: {
        loginOut() {
            if (confirm('您确定要退出吗？')) {
                alert('退出成功');
                self.location.href = "index.html";
            } else {
                console.log('退出失败');
            }
        },
        getBar() {
            // @ts-ignore
            $.ajax({
                type: "get",
                dataType: "json",
                url: "json/predict.json",
                async: true,
                success: function (r) {
                    // @ts-ignore
                    var data = r.data;
                    // console.log(data);
                    
                }
            })
        },
        getyear() {
            // @ts-ignore
            $.ajax({
                type: "get",
                url: "json/predict.json",
                dataType: "json",
                async: true,
                success: function (r) {
                    // 获取年份
                    var data = r.data;
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
                    //获取默认选中的种类)
                    var select = sele.filter((item)=>{
                        return item.type == vm.selectType;
                    })
                    vm.selected = select;
                    
                    //获取月份
                   var month = select;
                   var mon = [];
                   for (var c = 0; c < month.length; c++) {
                       mon.push(month[c].month);
                   }
                   var mo = [];
                   for (var d = 0; d < mon.length; d++) {
                       mo.push(Number(mon[d]));
                   }
                   var mont = [];
                   for (var e = 0; e < mo.length; e++) {
                       if (mo.indexOf(mo[e]) == e) {
                           mont.push(mo[e]);
                       }
                   }
                   vm.month = mont;
                //    console.log(mo)

                    //获取表格里的值
                    var predict = [];//预测值
                    var adjustment = [];//调整值
                    var acture = [];
                    var error = [];
                    for(var f=0;f<select.length;f++){
                        predict.push(parseInt(select[f].predict));
                        adjustment.push(parseInt(select[f].adjustment));
                        acture.push(parseInt(select[f].actureValue));
                        error.push(parseInt(select[f].error));                        
                    }
                    vm.predict = predict;
                    vm.adjustment = adjustment;
                    vm.acture = acture;
                    vm.error = error;

                    // @ts-ignore
                    var mychart = echarts.init(document.getElementById('bar'));
                    mychart.resize();
                    var option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}月 : {c}",
                        },
                        legend: {
                            data: [
                                '预测值',
                                '实际值',
                            ],
                            orient: 'vertical',
                            x: '90%',
                            top: '20%'
                        },

                        // calculable: true,
                        // grid: { y: 70, y2: 30, x2: 20 },
                        xAxis: [{
                                type: 'category',
                                data: vm.month,
                                axisLabel: {
                                    formatter: '{value}月'
                                },
                                axisLine: {
                                    show: false
                                },
                                axisTick: {
                                    show: false
                                },
                                splitArea: {
                                    show: false
                                },
                                splitLine: {
                                    show: false
                                },

                            },
                            {
                                type: 'category',
                                // axisLine: { show: false },
                                axisTick: {
                                    show: false
                                },
                                axisLabel: {
                                    show: false
                                },
                                splitArea: {
                                    show: false
                                },
                                splitLine: {
                                    show: false
                                },
                                data: vm.month,

                            }
                        ],
                        yAxis: [{
                            type: 'value',
                            // axisLine: { show: false },
                            axisTick: {
                                show: false
                            },
                            // axisLabel: { show: false },
                            splitArea: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                        }],
                        series: [
                            {
                                name: '预测值',
                                type: 'bar',                                
                                itemStyle: {
                                    normal: {
                                        color: 'rgba(1,147,64)',
                                        // label: { show: true }
                                    }
                                },
                                data: vm.predict
                            },
                            {
                                name: '实际值',
                                type: 'bar',
                                xAxisIndex: 1,
                                itemStyle: {
                                    normal: {
                                        color: '#0492da',
                                        label: {
                                            // show: true,
                                            formatter: function (p) {
                                                return p.value > 0 ? (p.value + '\n') : '';
                                            }
                                        }
                                    }
                                },
                                data: vm.acture
                            },
                            
                           
                        ]
                    };
                    mychart.setOption(option,true);
                    
                }
                
            })
        },
    },
    mounted() {
        this.getBar();
        this.getyear();
    },
    watch:{
        selectYear:function(){
            this.getyear();
        },
        selectType:function(){
            this.getyear(); 
            // console.log(vm.selected)
        },        
    }
})