package com.example.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.entity.DeviceDetail;

public interface DeviceDetailService  extends IService<DeviceDetail> {
    Long getProblemTotal();
}
