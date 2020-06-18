package com.hal.model.dto;

import java.util.Date;

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
public class MoimResponseDto {
	private int mid;
	private String title;
	private Date time;
	private String location;
	private boolean state; // true : 모임 있는지, false: 방폭
	private double latitude;
	private double longitude;
	private User host; // host 정보
	private double distance;
	private int count;
	private String coment;
	private String moimImg;

}
