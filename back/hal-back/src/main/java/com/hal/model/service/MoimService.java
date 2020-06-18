package com.hal.model.service;

import java.util.Map;

import com.hal.model.dto.Moim;
import com.hal.model.dto.MoimRequestDto;
import com.hal.model.dto.ParticipateRequestDto;

public interface MoimService {
	// 사용자 위치를 기준으로 거리기반의 모임들을 불러오는 메소드 => 참여 인원 조회 추가
	public Map<String,Object> findMoimByDist(int uid,int dis_filter);
	// 사용자 번호와 form에서 넘어온 모임정보를 통해 모임방 만들기
	public Map<String,Object> addMoim(int uid,MoimRequestDto moim);
	// 모임방 상태 수정 ( front에서 넘어오는 파라미터를 판단해서 매개변수 바꾸어 줄 것 )
	public Map<String,Object> updateMoim(Moim moim);
	// 모임 참여 여부 기능 ( insert )
	public Map<String,Object> addParticipate(ParticipateRequestDto part);
	// 모임 참여 여부 기능 ( delete )
	public Map<String,Object> deleteParticipate(int uid,int mid);
	// 모임에 참여한 유저 목록 전체 조회
	public Map<String,Object> findUsersByMid(int mid);
	// 해당 유저가 참여한 모임 목록 조회
	public Map<String,Object> findPartsByUid(int uid);
	// 사용자 번호로 해당 유저가 생성한 모임 목록 조회
	public Map<String,Object> findMoimByMe(int uid);
	// 사용자 번호로 해당 유저가 참여한 모임 목록 조회
	public Map<String,Object> findMoimByOther(int uid);
}
