package com.example.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.Dto.ChartDto;
import com.example.entity.DeviceType;
import com.example.mapper.DeviceTypeMapper;
import com.example.service.DeviceTypeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class DeviceTypeServiceImpl extends ServiceImpl< DeviceTypeMapper,DeviceType> implements DeviceTypeService {

    @Autowired
    private DeviceTypeMapper deviceTypeMapper;

    @Override
    public List<ChartDto> getDeviceType() {
       List<ChartDto> list=deviceTypeMapper.getDeviceType();
       return list;
    }


}
