package com.example.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.entity.UserGPS;
import com.example.mapper.UserGPSMapper;
import com.example.service.UserGPSService;
import org.springframework.stereotype.Service;

@Service
public class UserGPSServiceImpl extends ServiceImpl<UserGPSMapper, UserGPS> implements UserGPSService {
}
