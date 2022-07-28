
var setting={
            check:{
                enable:false
            },

            // 异步调用从php 中获得json 数据格式种树
            async: {
                enable: true,//要开启async功能必须设置为true,其他地方同理
                dataType: "json",
                type: "get",
                url: "php/get_devices.php"
            },
            data: {
                simpleData: {
                    enable: true,
                    idKey: "id",//节点id名
                    pIdKey: "pid",//父节点id名
                    rootPId: 0//默认根节点为0
                }
            },
           
            callback:{
                onCheck:zTreeOnCheck
            }
};

var zNodes=[];
function zTreeOnCheck(event, treeId, treeNode) {
     alert(treeNode.name);//弹出城市名字
}
   

var zTree;
$(document).ready(function(){
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    $.fn.zTree.init($("#treeDemo1"), setting, zNodes);
    $.fn.zTree.init($("#treeDemo2"), setting, zNodes);
    
    zTree = $.fn.zTree.getZTreeObj("treeDemo");


});



function init(){
    $(".dataTabUl li").click(function(){
        var ins=$(this).index();
        $(this).find("a").addClass("dataActive").end().siblings().find("a").removeClass("dataActive");
        $(".dataConBox .dataBoxSub").eq(ins).show().siblings().hide();
    })
}
function Tail(){
    layer.open({
        type: 2,
        title: '涉案人员详情',
        shadeClose: true,
        shade: 0.5,
        skin: 'layui-layer-rim',
        closeBtn:1,
        area: ['1100px', '600px'],
        content: 'openPerTail.html'
    });
}
function TailLaw(){
    layer.open({
        type: 2,
        title: '法律文书详情',
        shadeClose: true,
        shade: 0.5,
        skin: 'layui-layer-rim',
        closeBtn:1,
        area: ['1100px', '300px'],
        content: 'lawTail.html'
    });
}
function TailList(){
    layer.open({
        type: 2,
        title: '宗卷详情',
        shadeClose: true,
        shade: 0.5,
        skin: 'layui-layer-rim',
        closeBtn:1,
        area: ['1100px', '300px'],
        content: 'caseListTail.html'
    });
}
