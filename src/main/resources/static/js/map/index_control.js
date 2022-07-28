
$(function(){


    initMap();





})
//地图界面高度设置



//加载地图
function initMap(){
    
// 百度地图API功能
    // 按住鼠标右键，修改倾斜角和角度
    var map = new BMapGL.Map("map_div");    // 创建Map实例
    map.centerAndZoom(new BMapGL.Point (117.022,32.5518  ), 15);  // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

  // ajax 请求坐标点并描绘
   ajax("php/get_gpses.php").then(
          response=>{
               response=JSON.parse(response);
              for(var i=0;i<response.length;i++)
               {
                
                  let latitude =response[i].latitude;
                  let longitude=response[i].longitude;
                  var marker1 = new BMapGL.Marker(new BMapGL.Point(longitude,latitude));
                  console.log(response[0]);
                  map.addOverlay(marker1);
              }    
          },
          error=>{
              console.log(error);
          }
      )
   var size = new BMapGL.Size(10, 50);
   map.addControl(new BMapGL.CityListControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      offset: size,


  }));
}
function ajax(url){
    return new Promise((resolve,reject)=>{
        var http=new XMLHttpRequest();
        http.open("GET",url);
        http.send();
        http.onload=function(){
            if(this.status==200)
            {
                
                resolve(this.response);
            }else{
                reject("加载失败");
            }
        }
        http.onerror=function(){
            reject("加载失败");
        }
    });
}


