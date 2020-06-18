package com.hal.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hal.model.dto.Room;

public interface RoomRepository extends JpaRepository<Room, Integer>{

	//내가 참여한 채팅방 리스트
	List<Room> findByUser1Uid(int uid);
	List<Room> findByUser2Uid(int uid);
	
	//존재하는 채팅방인지 확인
	@Query(value="select count(*) from room where (uid1 = ?1 and uid2 = ?2) or (uid1 = ?2 and uid2 = ?1)"
			,nativeQuery = true)
	int numOfRoom(int senderId, int receiverId);
	
	//존재하는 채팅방인지 확인
	@Query(value="select rid from room where (uid1 = ?1 and uid2 = ?2) or (uid1 = ?2 and uid2 = ?1)"
			,nativeQuery = true)
	String isRoomExisted(int senderId, int receiverId);

}
