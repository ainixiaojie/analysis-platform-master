package com.example.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.Dto.DeviceDto;
import com.example.entity.Device;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface DeviceMapper extends BaseMapper<Device> {
    List<DeviceDto> getDeviceByType( String name);



}
