package com.hal.model.service;

import java.util.List;

import com.hal.model.dto.User;
import com.hal.model.dto.UserResponseDto;

public interface UserService {

	public List<User> userSearchAllList();
	
	// 회원가입
	public User addUser(User user);
	
	// 프로필 수정
	public int updateUser(User user);
	
	// 모든 사용자 폰번호 조회
	public List<String> findAllPhone();
	
	// 사용자 조회
	public User findUserById(int uid);
	
	// 로그인
	public User userLogin(String phone);
	
	// 사용자 위치 기반으로 거리 기반 User를 불러오는 메소드
	public List<UserResponseDto> findFriendByDistance(int uid, int dis_filter);
}
