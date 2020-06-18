package com.hal.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.hal.model.dto.User;

public interface UserRepository extends JpaRepository<User, Integer>{

	List<User> findAll();
	
	@Transactional
	@Modifying
	@Query(value = "Update User set"
					+ " phone = :#{#user.phone}"
					+ ", addr = :#{#user.addr}"
					+ ", profile_img = :#{#user.profileImg}"
					+ ", latitude = :#{#user.latitude}"
					+ ", longitude = :#{#user.longitude}"
					+ ", description = :#{#user.description} "
				+ "where uid = :#{#user.uid}"
			, nativeQuery = false)
	int updateUser(@Param("user") User user);
	
	@Query(value= "Select phone From User", nativeQuery = false)
	List<String> findAllPhone();
	
	User findByPhone(String Phone);
	
	List<User> findByUidNot(int uid);
}
