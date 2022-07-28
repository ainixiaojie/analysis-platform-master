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


public class UserAlert {

    @TableId(type= IdType.AUTO)
    private  Long id;
    private  Long  userId;
    private  String  userName;
    private  Long  classificationId;


    private Double longitude;

    private Double latitude;



    private  String detail;

    private String image;

    @TableField(fill=FieldFill.INSERT)
    private LocalDateTime createTime;


    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;


    private  int  isProcessed;

    private Long adminId;






}
