package com.example.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.entity.DeviceDetail;
import com.example.mapper.DeviceDetailMapper;
import com.example.service.DeviceDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeviceDetailServiceImpl extends ServiceImpl<DeviceDetailMapper,DeviceDetail> implements DeviceDetailService {

   @Autowired
   private DeviceDetailMapper deviceDetailMapper;

    @Override
    public Long getProblemTotal() {
        return deviceDetailMapper.getProblemTotal();
    }
}
