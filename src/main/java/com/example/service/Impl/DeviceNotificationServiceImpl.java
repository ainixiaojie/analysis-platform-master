package com.example.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.Dto.ChartDto;
import com.example.entity.DeviceNotification;
import com.example.mapper.DeviceNotificationMapper;
import com.example.service.DeviceNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceNotificationServiceImpl extends ServiceImpl<DeviceNotificationMapper,DeviceNotification> implements DeviceNotificationService {
    @Autowired
    private DeviceNotificationMapper deviceNotificationMapper;


    @Override
    public List<ChartDto> getDeviceNotification() {
        return deviceNotificationMapper.getDeviceNotification();
    }
}
