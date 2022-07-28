package com.example.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.Dto.ChartDto;
import com.example.entity.UserAlert;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserAlertMapper extends BaseMapper<UserAlert> {
    List<ChartDto> getAlert();



    List<UserAlert> getOnlineAlerts();



}
