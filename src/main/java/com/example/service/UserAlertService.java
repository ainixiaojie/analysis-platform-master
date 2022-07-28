package com.example.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.Dto.ChartDto;
import com.example.entity.UserAlert;

import java.util.List;


public interface UserAlertService extends IService<UserAlert> {



    List<UserAlert> getOnlineAlerts();

    List<ChartDto> getAlert();
}
