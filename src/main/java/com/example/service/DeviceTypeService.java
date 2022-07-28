package com.example.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.Dto.ChartDto;
import com.example.entity.DeviceType;

import java.util.List;


public interface DeviceTypeService  extends IService<DeviceType> {

    List<ChartDto> getDeviceType();



}
