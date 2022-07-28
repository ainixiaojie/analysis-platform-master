package com.example.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.Dto.ChartDto;
import com.example.entity.UserAlert;
import com.example.mapper.UserAlertMapper;
import com.example.service.UserAlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserAlertServiceImpl extends ServiceImpl<UserAlertMapper, UserAlert> implements UserAlertService {
    @Autowired
    private UserAlertMapper userAlertMapper;




    @Override

    public List<UserAlert> getOnlineAlerts() {

        return userAlertMapper.getOnlineAlerts();
    }

    @Override
    public List<ChartDto> getAlert() {
        return userAlertMapper.getAlert();
    }



}
