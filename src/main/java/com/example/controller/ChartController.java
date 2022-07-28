package com.example.controller;


import com.example.Dto.ChartDto;
import com.example.common.R;


import com.example.service.AlertClassificationService;
import com.example.service.DeviceNotificationService;
import com.example.service.DeviceTypeService;
import com.example.service.UserAlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/chart")
public class ChartController {

  @Autowired
  private DeviceTypeService deviceTypeService;
  @Autowired
  private DeviceNotificationService deviceNotificationService;

  @Autowired
  private UserAlertService userAlertService;

  @Autowired
  private AlertClassificationService alertClassificationService;



    @GetMapping("/getDeviceType")
    public R<List<ChartDto>>  getDeviceType(){
        List<ChartDto> list = deviceTypeService.getDeviceType();
        return R.success(list);
    }


    @GetMapping("/getDeviceNotification")
    public R<List<ChartDto>> getDeviceNotification() {
        List<ChartDto> list = deviceNotificationService.getDeviceNotification();
        return R.success(list);
    }


    @GetMapping("/getAlert")
    public R<List<ChartDto>> getAlert(){
        List<ChartDto> list=userAlertService.getAlert();
        return R.success(list);
    }


    @GetMapping("/getAlertClassification")
    public R<List<ChartDto>> getAlertClassification(){
        List<ChartDto> list=alertClassificationService.getAlertClassification();
        return  R.success(list);
    }


}
