package com.example.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.Dto.ChartDto;
import com.example.entity.AlertClassification;

import java.util.List;

public interface AlertClassificationService extends IService<AlertClassification>  {
    List<ChartDto> getAlertClassification();
}
