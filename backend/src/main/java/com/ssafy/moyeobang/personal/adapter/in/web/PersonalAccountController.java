package com.ssafy.moyeobang.personal.adapter.in.web;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class PersonalAccountController {

    @PostMapping("/api/auth/account/verify/initiate")
    public ApiResult<?> createPersonalAccount() {

        return success(true);
    }
}
