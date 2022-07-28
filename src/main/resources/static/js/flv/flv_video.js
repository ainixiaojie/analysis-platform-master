
var videoList;
var videoElement = document.getElementById('videoElement');;
var url='http://127.0.0.1:8080/live/stream.flv';
getVideo();
createPlayers();





function getVideo(){
    this.videoList=document.getElementsByClassName('video')
    console.log("video标签数量："+this.videoList.length)
}


function createPlayers(){
    for(i=0;i<videoList.length;i++){
    createSinglePlayer(videoList[i],this.url);
    }
}




function createSinglePlayer(videoElement,url){
    if (flvjs.isSupported())
    {
            var flvPlayer = flvjs.createPlayer(
            {
                type: 'flv',
                isLive:true,
                hasAudio: true, 			//音频开启
                hasVideo: true,				//视频开启
                url:url
            },
            {
                enableWorker: true, //不启用分离线程
                enableStashBuffer: false, //关闭IO隐藏缓冲区
                reuseRedirectedURL: true, //重用301/302重定向url，用于随后的请求，如查找、重新连接等。
                autoCleanupSourceBuffer: true //自动清除缓存
            });
            flvPlayer.attachMediaElement(videoElement);
            flvPlayer.load();
            flvPlayer.play();
            console.log("start play");
    }
 }