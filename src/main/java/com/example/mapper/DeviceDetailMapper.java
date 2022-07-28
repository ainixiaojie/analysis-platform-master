package com.example.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.entity.DeviceDetail;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DeviceDetailMapper extends BaseMapper<DeviceDetail> {

    Long getProblemTotal();
}
