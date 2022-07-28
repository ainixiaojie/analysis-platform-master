package com.example.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.entity.DeviceGPS;
import com.example.mapper.DeviceGPSMapper;
import com.example.service.DeviceGPSService;
import org.springframework.stereotype.Service;


@Service
public class DeviceGPSServiceImpl extends ServiceImpl<DeviceGPSMapper, DeviceGPS> implements DeviceGPSService {
}
