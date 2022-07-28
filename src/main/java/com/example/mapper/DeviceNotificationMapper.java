package com.example.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.Dto.ChartDto;
import com.example.entity.DeviceNotification;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DeviceNotificationMapper extends BaseMapper<DeviceNotification> {


    List<ChartDto> getDeviceNotification();


}
