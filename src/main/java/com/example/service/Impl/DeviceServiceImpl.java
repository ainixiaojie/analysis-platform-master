package com.example.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.Dto.DeviceDto;
import com.example.entity.Device;
import com.example.mapper.DeviceMapper;
import com.example.service.DeviceService;
import com.example.service.DeviceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DeviceServiceImpl  extends ServiceImpl<DeviceMapper, Device> implements DeviceService {
    @Autowired
    private DeviceMapper deviceMapper;
    @Override
    public List<DeviceDto> getDeviceByType(String name) {
        return deviceMapper.getDeviceByType(name);
    }
}
