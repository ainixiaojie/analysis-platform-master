package com.example.common;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

/**
 * 通用返回结果，服务端响应的数据最终都会封装成此对象
 * @param <T>
 */
@Data
public class R<T> {

    private Integer code; //编码：1成功，0和其它数字为失败

    private String msg; //错误信息

    private T data; //数据

    private Map map = new HashMap(); //动态数据

    //请求成功，封装数据。
    public static <T> R<T> success(T object) {
        R<T> r = new R<T>();
        r.data = object;    //数据
        r.code = 1;         //设置成功的状态码
        return r;
    }
    //请求失败，封装数据。
    public static <T> R<T> error(String msg) {
        R r = new R();
        r.msg = msg;    //请求的错误信息
        r.code = 0;     //设置失败的状态码
        return r;
    }

    //添加动态的数据
    public R<T> add(String key, Object value) {
        this.map.put(key, value);
        return this;
    }

}
