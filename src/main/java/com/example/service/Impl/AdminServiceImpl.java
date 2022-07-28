package com.example.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.entity.Admin;
import com.example.mapper.AdminMapper;
import com.example.service.AdminService;
import org.springframework.stereotype.Service;


@Service
public class AdminServiceImpl  extends ServiceImpl<AdminMapper, Admin> implements AdminService {
}
