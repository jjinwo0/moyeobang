package com.ssafy.van.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ApiResult {
    private String status;
    private Object data;
    private String error;
}
