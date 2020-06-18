package com.hal.model.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hal.model.dto.Moim;
import com.hal.model.dto.User;

public interface MoimRepository extends JpaRepository<Moim, Integer> {
	// 거리기반에 사용되는 모임들을 조회  ( 내가 생성한 모임 제외 )
	List<Moim> findByHostNotAndTimeAfterOrderByTimeDesc(User user,Date now);
	// 해당 모임을 가져오기
	Moim findById(int mid);
	// 내가 생성한 모임 조회
	List<Moim> findByHostUidAndTimeAfterOrderByTimeDesc(int uid, Date now);
}
