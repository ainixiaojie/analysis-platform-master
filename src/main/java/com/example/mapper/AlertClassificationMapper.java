package com.example.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.Dto.ChartDto;
import com.example.entity.AlertClassification;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface AlertClassificationMapper extends BaseMapper<AlertClassification> {

    List<ChartDto> getAlertClassification();
}
