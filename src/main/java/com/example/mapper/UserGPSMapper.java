package com.example.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.entity.UserGPS;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserGPSMapper extends BaseMapper<UserGPS> {
//    得到人员的GPS
    List<UserGPS> getPersonGPS();





}
