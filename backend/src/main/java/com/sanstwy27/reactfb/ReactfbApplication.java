package com.sanstwy27.reactfb;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @CrossOrigin
@MapperScan(value = "com.sanstwy27.reactfb.dao")
@SpringBootApplication
public class ReactfbApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReactfbApplication.class, args);
    }

}
