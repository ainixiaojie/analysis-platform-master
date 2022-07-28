package com.example.entity;


import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor

public class Device {
    @TableId(type = IdType.AUTO)
    private Long  id;

    private String name;

    private  String description;

    private Long  typeId;

    private String image;

    private String ip;


    private  String detail;


    @TableField(fill= FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill =FieldFill.INSERT_UPDATE)
    private  LocalDateTime updateTime;

}
