package com.example.Dto;

import com.example.entity.Device;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DeviceDto extends Device {
    private String type;                    //设备类型
    private String name;                    //设备名称
    private Integer status;                  //设备状态
    private LocalDateTime createTime;        //创建时间


}
