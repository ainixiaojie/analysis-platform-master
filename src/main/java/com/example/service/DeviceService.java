package com.example.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.example.Dto.DeviceDto;
import com.example.entity.Device;

import java.util.List;

public interface DeviceService extends IService<Device> {


    List<DeviceDto> getDeviceByType(String name);
}
