package com.example.Dto;

import com.example.entity.UserAlert;
import lombok.Data;

@Data
public class UserAlertDto extends UserAlert {
    private String classification;
}
