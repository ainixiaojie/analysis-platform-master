package com.example.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.Dto.ChartDto;
import com.example.entity.DeviceNotification;

import java.util.List;

public interface DeviceNotificationService extends IService<DeviceNotification> {
    List<ChartDto> getDeviceNotification();
}
