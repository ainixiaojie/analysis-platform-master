package com.example.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("user_gps")
public class DeviceGPS {
    @TableId(type = IdType.AUTO)
    private  Long id;

    private  Long  deviceId;
    private  Double latitude;
    private  Double longitude;

    @TableField(fill = FieldFill.INSERT)
    private  Date createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;




}
