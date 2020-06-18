package com.hal.model.dto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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
public class MoimRequestDto {
	private int mid;
	private String title;
	private String time;
	private String location;
	private boolean state; // true : 모임 있는지, false: 방폭
	private double latitude;
	private double longitude;
	private String coment;
	private String moimImg;
	private int uid; // host 정보
	
	public Moim toEntity(User user, MoimRequestDto request) throws ParseException{
		SimpleDateFormat simple = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = simple.parse(request.getTime());
		System.out.println(date);
		Moim moim = new Moim(request.getMid()
				,request.getTitle()
				,date
				,request.getLocation()
				,request.isState()
				,request.getLatitude()
				,request.getLongitude()
				,request.getComent()
				,request.getMoimImg()
				,user);
		return moim;
	}
	
	public MoimResponseDto toResponse(Moim moim) {
		MoimResponseDto result = MoimResponseDto.builder()
				.mid(moim.getMid())
				.title(moim.getTitle())
				.time(moim.getTime())
				.state(moim.isState())
				.latitude(moim.getLatitude())
				.longitude(moim.getLongitude())
				.coment(moim.getComent())
				.moimImg(moim.getMoimImg())
				.host(moim.getHost())
				.build();
		return result;
	}
}
