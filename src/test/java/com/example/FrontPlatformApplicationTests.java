package com.example;

import com.example.mapper.DeviceMapper;
import com.example.service.DeviceDetailService;
import com.example.service.DeviceService;
import com.example.service.DeviceTypeService;
import com.example.service.UserAlertService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class FrontPlatformApplicationTests {

	@Autowired
	private DeviceTypeService deviceTypeService;

	@Autowired
	private UserAlertService userAlertService;

	@Autowired
	private DeviceDetailService deviceDetailService;

	@Autowired
	private DeviceService deviceService;

	@Autowired
	private DeviceMapper deviceMapper;

	@Test
	void contextLoads() {
//		userAlertService.getOnlineAlerts();
//		deviceTypeService.getDeviceType();
//		System.out.println(deviceDetailService.getProblemTotal());
//		System.out.println(userAlertService.getOnlineAlerts());
		System.out.println(deviceService.getDeviceByType("…„œÒÕ∑"));
		System.out.println(deviceService.getDeviceByType("…„œÒÕ∑"));
	}


}
