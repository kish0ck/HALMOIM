package com.hal.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class UserRequestDto {
	private int uid;
	private String name;
	private String birth;
	private int gender;
	private String phone;
	private String addr;
	private String profileImg;
	private String loginImg;
	private double latitude;
	private double longitude;
	private String description;
}
