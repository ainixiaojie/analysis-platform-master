package com.example.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.Dto.ChartDto;
import com.example.entity.AlertClassification;
import com.example.mapper.AlertClassificationMapper;
import com.example.service.AlertClassificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertClassificationServiceImpl extends ServiceImpl<AlertClassificationMapper, AlertClassification> implements AlertClassificationService {
    @Autowired
    private AlertClassificationMapper alertClassificationMapper;

    @Override
    public List<ChartDto> getAlertClassification() {
        return alertClassificationMapper.getAlertClassification();
    }
}
