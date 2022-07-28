/**
 * Created by 30947 on 2018/7/18.
 */
$(function () {

    char1();
    char2();
    char3();
    char4();

})

//统计分析图
function char1() {

    let option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: '设备类型',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: []
            }
        ]
    };
    let myChart = echarts.init(document.getElementById('char1'), 'customed');

    $.get("/chart/getDeviceType").done(res => {
        res=res.data
        res.forEach(item => {
            option.series[0].data.push({name: item.name, value: item.value})
        })
        console.log(option);
        myChart.setOption(option)
    })

}

function char2() {
   let  option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: []
        },
        series: [
            {

                type: 'bar',
                data: []
            },

        ]
    };
    let myChart = echarts.init(document.getElementById('char2'), 'customed');

    $.get("/chart/getDeviceNotification").done(res => {
        res=res.data
        let name = res.map(v => v.name)
        let value = res.map(v => v.value)


        option.yAxis.data = name;
        option.series[0].data = value;
        // option.series[0].data.push({name: item.name, value: item.count})

        console.log(option);
        myChart.setOption(option)
    })

}

function char3() {
    let option = {
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'line'
            }
        ]
    };
    let myChart = echarts.init(document.getElementById('char3'), 'customed');
    $.get("/chart/getAlert").done(res => {

        res=res.data
        let name = res.map(v => v.name)
        let value = res.map(v => v.value)


        option.xAxis.data = name;
        option.series[0].data = value;
        console.log(option);
        myChart.setOption(option)
    })

}


function char4() {
    let option = {
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:"月份",
                data: [],
                type: 'bar'
            }
        ]
    };
    let myChart = echarts.init(document.getElementById('char4'), 'customed');
    $.get("/chart/getAlertClassification").done(res => {
        res=res.data
        let name = res.map(v => v.name)
        let value = res.map(v => v.value)

        option.xAxis.data = name;
        option.series[0].data = value;
        console.log(option);
        myChart.setOption(option)
    })

}

