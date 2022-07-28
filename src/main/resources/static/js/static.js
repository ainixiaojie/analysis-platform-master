/**
 * Created by 30947 on 2018/7/18.
 */
$(function () {


    char5();
})

function char5() {






    var chartDom = document.getElementById('char5');
    var myChart = echarts.init(chartDom);
    var option;

    myChart.showLoading();
    $.get('/json/Nation.json', function (geoJson) {
        myChart.hideLoading();
        echarts.registerMap("Nation", geoJson);
        myChart.setOption(
            (option = {
                title: {
                    text: 'Population Density of Hong Kong （2011）',
                    subtext: 'Data from Wikipedia',
                    sublink:
                        'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}<br/>{c} (p / km2)'
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        dataView: { readOnly: false },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                visualMap: {
                    min: 800,
                    max: 50000,
                    text: ['High', 'Low'],
                    realtime: false,
                    calculable: true,
                    inRange: {
                        color: ['lightskyblue', 'yellow', 'orangered']
                    }
                },
                series: [
                    {
                        name: '香港18区人口密度',
                        type: 'map',
                        map: 'Nation',
                        label: {
                            show: true
                        },
                        data: [

                        ],
                        // 自定义名称映射
                        nameMap: {

                        }
                    }
                ]
            })
        );
    });

    option && myChart.setOption(option);
}

