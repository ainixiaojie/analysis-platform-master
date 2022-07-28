/**
 * Created by 30947 on 2018/7/20.
 */
var map = new BMapGL.Map("map_box");    // 创建Map实例


$(function () {
    getHt();
    initMap();
    mapActive();
    char1();
    page();
    mapRestList();
    rightChange();

})


//获取div的高度
function getHt() {
    var all_height = $(window).height();
    var div_height = all_height - 84;
    $("#car_control").css("height", div_height + "px");


}

//加载地图
function initMap() {
    map.centerAndZoom(new BMapGL.Point(117.022, 32.5518), 15);  // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    let size = new BMapGL.Size(10, 50);
    //添加控件
    map.addControl(new BMapGL.CityListControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        offset: size
    }));

//    加载人员坐标点
    getGPS("/getPersonGPS");
//    加载车辆坐标点
    getGPS("/getCarGPS");
//    加载无人机坐标点
    getGPS("/getUAVGPS");
//    加载摄像头坐标点
    getGPS("/getCameraGPS");

//    加载警报
    getAlert();
}


//获取坐标点
function getGPS(url) {

    $.get(url).done((response) => {
        for (let i = 0; i < response.length; i++) {

            map.clearOverlays();
            let point = new BMapGL.Point(response[i].longitude, response[i].latitude);
            let marker = new BMapGL.Marker(point);
            map.addOverlay(marker);


        }
    })

}


function getAlert() {

    $.get("alerts").done((response) => {
        for (let i = 0; i < response.length; i++) {
            map.clearOverlays();
            let point = new BMapGL.Point(response[i].longitude, response[i].latitude);
            let marker = new BMapGL.Marker(point);
            map.addOverlay(marker);
            showAlert(point);
            map.centerAndZoom(point, 15);


        }

    })

}




function showAlert(point) {

    let opts = {
        width: 0,     // 信息窗口宽度
        height: 0,    // 信息窗口高度
        title: '<s style="color:red; font-size:30px "}> <i>警告</i></s>'
    }
    let info = '<div class="col-xs-12" style="margin-left: 5px">\n' +
        '                    <ul class="list-unstyled">\n' +
        '                      <li style="list-style-type:none;">设备名称：设备1</li>\n' +
        '                      <li style="list-style-type:none;">出发地：浙江省杭州市西湖区西湖文化广场</li>\n' +
        '                      <li style="list-style-type:none;">目的地：浙江省杭州市滨江区滨江区政府对面</li>\n' +
        '                      <li style="list-style-type:none;">电池电量：1000毫安</li>\n' +
        '                      <li style="list-style-type:none;float: right "><a href="">定位轨迹</a></li>\n' +
        '                    </ul>\n' +
        '                  </div>';


    let infoWindow = new BMapGL.InfoWindow(info, opts);  // 创建信息窗口对象
    map.openInfoWindow(infoWindow, point); //开启信息窗口

}

function addIcon(map, point, url) {
    //创建图标
    var myIcon = new BMapGL.Icon(url, new BMapGL.Size(52, 26));
    // 设定offset
    BMapGL.Size(52, 26);
    var marker = new BMapGL.Marker(point, {
        icon: myIcon
    });
    // 将标注添加到地图
    map.addOverlay(marker);


}


//工具条点击效果
function mapActive() {
    $(".map_top>ul>li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(this).find("a").addClass("active");
        $(this).find("a").parents("li").siblings().find("a").removeClass("active");
    })
}

//统计分析图
function char1() {

    var myChart = echarts.init($("#char1")[0]);

    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            textStyle: {
                color: '#ffffff',

            },
            data: ['客运车', '危险品车', '网约车', '学生校车']
        },

        calculable: false,
        series: [
            {
                name: '车类型',
                type: 'pie',
                radius: ['40%', '70%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            position: 'center',
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        }
                    }
                },
                data: [
                    {value: 335, name: '客运车'},
                    {value: 310, name: '危险品车'},
                    {value: 234, name: '网约车'},
                    {value: 135, name: '学生校车'}

                ]
            }
        ]
    };

    myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize();
    })

}

function page() {
    $("#page").Page({
        totalPages: 9,//分页总数
        liNums: 1,//分页的数字按钮数(建议取奇数)
        activeClass: 'activP', //active 类样式定义
        callBack: function (page) {
            //console.log(page)
        }
    });
}

//专题图点击
function mapRestList() {
    $(".map_work>ul>li").click(function () {
        $(".map_work>ul").hide();
        $(".map_resList").show();
    })
}

//返回
function back() {
    $(".map_work>ul").show();
    $(".map_resList").hide();
}

//右侧功能界面切换
function rightChange() {
    $(".map_right_top>ul>li").click(function () {
        var ins = $(this).index();
        $(this).addClass("li_active").siblings().removeClass("li_active");
        $(".map_con .map_con_div").eq(ins).show().siblings().hide();
    })
}

function ajax(url) {
    return new Promise((resolve, reject) => {
        var http = new XMLHttpRequest();
        http.open("GET", url);
        http.send();
        http.onload = function () {
            if (this.status == 200) {

                resolve(this.response);
            } else {
                reject("加载失败");
            }
        }
        http.onerror = function () {
            reject("加载失败");
        }
    });
}

function checkboxOnclick(checkbox) {

    switch (checkbox) {
        case 1 :
            console.log("人员");
            getGPS("/getPersonGPS");
            break;  //停止执行，跳出switch
        case 2:
            console.log("车辆");
            getGPS("/getCarGPS");
            break;  //停止执行，跳出switch
        case 3 :
            console.log("无人机");
            getGPS("/getUAVGPS")
            break;  //停止执行，跳出switch
        case 4:
            console.log("摄像头");
            getGPS("/getCameraGPS")


    }
}


function ajax_point(URL) {
    $.ajax({
        url: URL,  // 发送的路径
        type: "get",  // 发送方式
        dataType: 'JSON',  // 反序列化
        success: (res) => {  // 成功获取到后端返回结果的回调函数
            console.log(res);
        },
        error: () => {  // 发送失败的回调函数
            console.log("失败");
        }
    })

}

     