package com.example.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.util.Date;


@Data

public class Admin {
    @TableId(type = IdType.AUTO)    //Mybatis-plus,设置id为主键，自增
    private Integer id;

    private String nickName;

    private  String name;

    private  String password;

    private Integer sex;

    private Long phone;



    @TableField(fill = FieldFill.INSERT)
    private Date create_time;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private  Date update_time;


    private Integer status;
}
