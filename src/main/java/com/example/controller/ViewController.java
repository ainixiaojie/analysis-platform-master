package com.example.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.Dto.ChartDto;
import com.example.Dto.DeviceDto;
import com.example.entity.*;
import com.example.service.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.function.ObjIntConsumer;


@Controller
@Slf4j
public class ViewController {
    @Autowired
    private DeviceService deviceService;

    @Autowired
    private DeviceDetailService deviceDetailService;


    @Autowired
    private UserAlertService userAlertService;


    @Autowired
    private DeviceTypeService deviceTypeService;

    @Autowired
    private DeviceNotificationService deviceNotificationService;


    @Autowired
    private AlertClassificationService alertClassificationService;





    @RequestMapping("/index")
    public String index(Model model){
//        数据库查询数据
//        将数据绑定之model
        //1.deviceTotal  设备总的数量
        Long deviceTotal=deviceService.count(null);
        model.addAttribute("deviceTotal", deviceTotal);

        //2.deviceOnlineTotal 设备在线的数量
        Long deviceOnlineTotal = deviceService.count(new QueryWrapper<Device>().eq("status", 1));
        model.addAttribute("deviceOnlineTotal", deviceOnlineTotal);

        //3.alertTotal  警告总数
        Long alertTotal = userAlertService.count(null);
        model.addAttribute("alertTotal", alertTotal);


        //4.alertProcessedTotal  已经处理的警告总数
        Long alertProcessedTotal= userAlertService.count(new QueryWrapper<UserAlert>().eq("is_processed", 1));
        model.addAttribute("alertProcessedTotal", alertProcessedTotal);


        //5.onlineAlerts   正在警告的
        List<UserAlert> OnlineAlerts=userAlertService.getOnlineAlerts();
        model.addAttribute("onlineAlerts",OnlineAlerts);


        //6.airplanes 无人机
        List<DeviceDto> airplanes=deviceService.getDeviceByType("摄像头");
        model.addAttribute("airplanes",airplanes);


        //7.cameras 相机摄像头
        List<DeviceDto> cameras=deviceService.getDeviceByType("摄像头");
        model.addAttribute("cameras",cameras);

        return "index";   //返回index.html


    }
    @RequestMapping("/map")
    public  String map(){
        return "map";
    }
    @RequestMapping("/carContrl")
    public String carControl(){
        return "carContrl";
    }
    @RequestMapping("/useful")
    public String useful(){
        return "useful";
    }
    @RequestMapping("/transform")
    public String transform(){
        return "transform";
    }
    @GetMapping("/static")
    public String stic(Model model){
        //1.deviceTotal
        Long deviceTotal=deviceService.count(null);
        model.addAttribute("deviceTotal", deviceTotal);
        //2.deviceOnlineTotal
        Long deviceOnlineTotal = deviceService.count(new QueryWrapper<Device>().eq("status", 1));
        model.addAttribute("deviceOnlineTotal", deviceOnlineTotal);

        //3.deviceProblemTotal
        Long deviceProblemTotal = deviceDetailService.getProblemTotal();
        model.addAttribute("deviceProblemTotal", deviceProblemTotal);
        log.info("deviceOnlineTotal{}",deviceProblemTotal);



        //4.alertTotal
        Long alertTotal=userAlertService.count();
        model.addAttribute("alertTotal", alertTotal);


        //5.alertProcessedTotal
        Long alertProcessedTotal= userAlertService.count(new QueryWrapper<UserAlert>().eq("is_processed", 1));
        model.addAttribute("alertProcessedTotal", alertProcessedTotal);

        //表格

        //1.deviceTypes
        List<ChartDto> deviceTypes=deviceTypeService.getDeviceType();
        model.addAttribute("deviceTypes",deviceTypes);

        //2.notifications
        List<ChartDto> notifications=deviceNotificationService.getDeviceNotification();
        model.addAttribute("notifications",notifications);

        //3.alerts
        List<ChartDto> alerts=userAlertService.getAlert();
        model.addAttribute("alerts",alerts);

        //4.alertClassifications
        List<ChartDto> classifications=alertClassificationService.getAlertClassification();
        model.addAttribute("alertClassifications",classifications);




        return "static";
    }
    @RequestMapping("/message")
    public  String  message(){
        return  "message";
    }



    @RequestMapping("/table1")
    public  String table(Model model){
        return  "/table1";

    }
    @RequestMapping("/webrtc")
    public  String webrtc(Model model){
        return  "/webrtc";

    }
    @RequestMapping("/srsOutputStream")
    public  String srsOutputStream(Model model){
        return  "/srsOutputStream";

    }









}
